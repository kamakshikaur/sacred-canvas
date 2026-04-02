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
  const [isMuted, setIsMuted] = useState(true);
  const [activeVoiceover, setActiveVoiceover] = useState<string | null>(null);
  const [isVoiceoverPlaying, setIsVoiceoverPlaying] = useState(false);
  const [voiceoverTime, setVoiceoverTime] = useState(0);
  const [voiceoverDuration, setVoiceoverDuration] = useState(0);
  
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const voiceoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number>();

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

  useEffect(() => {
    ambientAudioRef.current = new Audio(ambientMusicUrl);
    ambientAudioRef.current.loop = true;
    ambientAudioRef.current.volume = 0.2;
    
    return () => {
      ambientAudioRef.current?.pause();
      voiceoverAudioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (ambientAudioRef.current) ambientAudioRef.current.muted = isMuted;
    if (voiceoverAudioRef.current) voiceoverAudioRef.current.muted = isMuted;

    if (isMuted) {
      // Muting logic is strictly handled by updating the hardware mute parameter above
    } else {
      if (!isVoiceoverPlaying) {
        ambientAudioRef.current?.play().catch(() => setIsMuted(true));
      } else {
        voiceoverAudioRef.current?.play().catch(() => setIsVoiceoverPlaying(false));
      }
    }
  }, [isMuted, isVoiceoverPlaying]);

  const handleAmbientDucking = (shouldDuck: boolean) => {
    if (shouldDuck) {
      ambientAudioRef.current?.pause();
    } else {
      if (!isMuted) {
        ambientAudioRef.current?.play().catch(console.error);
      }
    }
  };

  const playVoiceover = (src: string) => {
    if (isMuted) {
      setIsMuted(false);
    }

    if (activeVoiceover === src && voiceoverAudioRef.current) {
       resumeVoiceover();
       return;
    }

    if (voiceoverAudioRef.current) {
      voiceoverAudioRef.current.pause();
    }
    
    setActiveVoiceover(src);
    setVoiceoverTime(0);

    const audio = new Audio(src);
    voiceoverAudioRef.current = audio;
    audio.volume = 0.8;
    audio.muted = false; // Ensure it plays unmuted

    handleAmbientDucking(true);
    
    audio.play().then(() => {
      setIsVoiceoverPlaying(true);
      setVoiceoverDuration(audio.duration);
    }).catch(console.error);
    
    audio.onended = () => {
      setIsVoiceoverPlaying(false);
      setActiveVoiceover(null);
      handleAmbientDucking(false);
    };
  };

  const pauseVoiceover = () => {
    voiceoverAudioRef.current?.pause();
    setIsVoiceoverPlaying(false);
    handleAmbientDucking(false); 
  };

  const resumeVoiceover = () => {
    if (voiceoverAudioRef.current) {
      if (isMuted) setIsMuted(false);
      handleAmbientDucking(true);
      voiceoverAudioRef.current.muted = false;
      voiceoverAudioRef.current.play().then(() => {
        setIsVoiceoverPlaying(true);
      }).catch(console.error);
    }
  };

  const stopVoiceover = () => {
    if (voiceoverAudioRef.current) {
      voiceoverAudioRef.current.pause();
      voiceoverAudioRef.current.currentTime = 0;
    }
    setIsVoiceoverPlaying(false);
    setActiveVoiceover(null);
    setVoiceoverTime(0);
    handleAmbientDucking(false);
  };

  const toggleMute = () => setIsMuted(!isMuted);

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
