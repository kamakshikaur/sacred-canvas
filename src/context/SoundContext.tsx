import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import ambientMusicUrl from '@/assets/ambient-piano-v2.mp3';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  
  playVoiceover: (src: string) => void;
  stopVoiceover: () => void;
  pauseVoiceover: () => void;
  resumeVoiceover: () => void;
  
  activeVoiceover: string | null;
  isVoiceoverPlaying: boolean;
  
  voiceoverTime: number;
  voiceoverDuration: number;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  // We want the ambient music to play by default (unmuted).
  const [isMuted, setIsMuted] = useState(false);
  const [activeVoiceover, setActiveVoiceover] = useState<string | null>(null);
  const [isVoiceoverPlaying, setIsVoiceoverPlaying] = useState(false);
  
  const [voiceoverTime, setVoiceoverTime] = useState(0);
  const [voiceoverDuration, setVoiceoverDuration] = useState(0);
  
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const voiceoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const duckingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number>();

  // --- AMBIENT VOLUME CONSTANTS ---
  const NORMAL_VOL = 0.08; 
  const DUCKED_VOL = 0.02; // Slightly higher for better balance
  const FADE_STEP = 0.005;

  // Track time
  useEffect(() => {
    const updateTime = () => {
      if (voiceoverAudioRef.current && isVoiceoverPlaying) {
        setVoiceoverTime(voiceoverAudioRef.current.currentTime);
        setVoiceoverDuration(voiceoverAudioRef.current.duration || 0);
      }
      animationFrameRef.current = requestAnimationFrame(updateTime);
    };
    
    if (isVoiceoverPlaying) {
       animationFrameRef.current = requestAnimationFrame(updateTime);
    }
    
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isVoiceoverPlaying]);

  // Handle cross-fading ambient music smoothly
  const fadeAmbientTo = (targetVolume: number) => {
    if (!ambientAudioRef.current || isMuted) return;
    
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    fadeIntervalRef.current = setInterval(() => {
      if (!ambientAudioRef.current) return;
      
      const current = ambientAudioRef.current.volume;
      if (Math.abs(current - targetVolume) < FADE_STEP) {
        ambientAudioRef.current.volume = targetVolume;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      } else {
        if (current < targetVolume) {
          ambientAudioRef.current.volume = Math.min(current + FADE_STEP, targetVolume);
        } else {
          ambientAudioRef.current.volume = Math.max(current - FADE_STEP, targetVolume);
        }
      }
    }, 50); // Small interval for smooth fade
  };

  // Mount logic - setup ambient auto-play
  useEffect(() => {
    const ambient = new Audio(ambientMusicUrl);
    ambient.loop = true;
    ambient.volume = NORMAL_VOL;
    ambientAudioRef.current = ambient;
    
    const tryAutoplay = () => {
      if (!isMuted && ambientAudioRef.current) {
        ambientAudioRef.current.play().catch((e) => {
          // Browser autoplay policy blocked it; we just wait for the user to interact
          console.log("Autoplay blocked, waiting for interaction", e);
        });
      }
    };

    tryAutoplay();

    // Attach to first interaction to bypass autoplay restrictions if needed
    const unlockAudio = () => {
      if (!isMuted && ambientAudioRef.current && ambientAudioRef.current.paused) {
        ambientAudioRef.current.play().catch(() => {});
      }
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };

    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);

    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      ambientAudioRef.current?.pause();
      voiceoverAudioRef.current?.pause();
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (duckingTimeoutRef.current) clearTimeout(duckingTimeoutRef.current);
    };
  }, []);

  // Handle Global Mute Toggling
  useEffect(() => {
    if (ambientAudioRef.current) {
      if (isMuted) {
        ambientAudioRef.current.pause();
      } else {
        // If unmuted, play ambient but respect ducking if voiceover is playing
        ambientAudioRef.current.volume = isVoiceoverPlaying ? DUCKED_VOL : NORMAL_VOL;
        ambientAudioRef.current.play().catch(() => {});
      }
    }

    if (voiceoverAudioRef.current) {
      if (isMuted) {
        voiceoverAudioRef.current.pause();
        setIsVoiceoverPlaying(false);
      } else {
        // We do NOT auto-resume voiceover if unmuted because it's abrupt, but the user requested `simple` controls. 
        // We will just let the user click play again. Or we can auto-continue it.
      }
    }
  }, [isMuted]);

  // Handle ducking reactively based on Voiceover Playing state
  useEffect(() => {
    if (isVoiceoverPlaying && !isMuted) {
      if (duckingTimeoutRef.current) clearTimeout(duckingTimeoutRef.current);
      fadeAmbientTo(DUCKED_VOL);
    } else if (!isVoiceoverPlaying && !isMuted) {
      // Add a small delay for unducking to prevent volume "bounce" during navigation
      // or between consecutive voiceovers that might trigger stop/start cycles.
      if (duckingTimeoutRef.current) clearTimeout(duckingTimeoutRef.current);
      duckingTimeoutRef.current = setTimeout(() => {
        fadeAmbientTo(NORMAL_VOL);
      }, 400); // 400ms is enough to bridge the navigation gap
    }
    
    return () => {
      if (duckingTimeoutRef.current) clearTimeout(duckingTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVoiceoverPlaying, isMuted]);

  const playVoiceover = (src: string) => {
    // If the same voice is paused, just resume
    if (activeVoiceover === src && voiceoverAudioRef.current) {
       resumeVoiceover();
       return;
    }

    // Clean up previous audio instance
    if (voiceoverAudioRef.current) {
      voiceoverAudioRef.current.pause();
      voiceoverAudioRef.current.src = "";
    }
    
    // Create new audio
    setActiveVoiceover(src);
    setVoiceoverTime(0);

    const audio = new Audio(src);
    voiceoverAudioRef.current = audio;
    audio.volume = 0.9;
    
    // Auto-unmute globally if they explicitly play a voiceover while muted
    if (isMuted) {
      setIsMuted(false);
    }
    
    audio.play().then(() => {
      setIsVoiceoverPlaying(true);
      setVoiceoverDuration(audio.duration);
    }).catch(console.error);
    
    audio.onended = () => {
      setIsVoiceoverPlaying(false);
      setActiveVoiceover(null); // Clear active so the UI goes away
    };
  };

  const pauseVoiceover = () => {
    voiceoverAudioRef.current?.pause();
    setIsVoiceoverPlaying(false);
  };

  const resumeVoiceover = () => {
    if (voiceoverAudioRef.current) {
      if (isMuted) setIsMuted(false);
      voiceoverAudioRef.current.play().then(() => {
        setIsVoiceoverPlaying(true);
      }).catch(console.error);
    }
  };

  const stopVoiceover = () => {
    if (voiceoverAudioRef.current) {
      voiceoverAudioRef.current.pause();
      voiceoverAudioRef.current.src = ""; // Flush buffer
    }
    setIsVoiceoverPlaying(false);
    setActiveVoiceover(null);
    setVoiceoverTime(0);
  };

  const toggleMute = () => setIsMuted(prev => !prev);

  return (
    <SoundContext.Provider value={{
      isMuted, toggleMute, 
      playVoiceover, stopVoiceover, pauseVoiceover, resumeVoiceover,
      activeVoiceover, isVoiceoverPlaying, 
      voiceoverTime, voiceoverDuration 
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSound must be used within SoundProvider");
  return context;
};
