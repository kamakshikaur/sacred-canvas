import { Play, Pause, VolumeX, Volume2 } from "lucide-react";
import { useSound } from "@/context/SoundContext";

interface VoiceoverPlayerProps {
  src?: string;
}

const formatTime = (time: number) => {
  if (isNaN(time) || !isFinite(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const VoiceoverPlayer = ({ src }: VoiceoverPlayerProps) => {
  const { 
    playVoiceover, pauseVoiceover, resumeVoiceover,
    activeVoiceover, isVoiceoverPlaying, 
    voiceoverTime, voiceoverDuration,
    isMuted, toggleMute
  } = useSound();

  if (!src) return null;

  const isActive = activeVoiceover === src;
  const isPlaying = isActive && isVoiceoverPlaying;

  const togglePlayState = () => {
    if (isActive) {
      if (isPlaying) {
        pauseVoiceover();
      } else {
        resumeVoiceover();
      }
    } else {
      playVoiceover(src);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[105] flex items-center gap-5 bg-background/70 backdrop-blur-xl px-6 py-3 md:px-8 md:py-4 rounded-full border border-foreground/10 shadow-2xl transition-all duration-500 hover:bg-background/90 hover:border-foreground/30">
      <button 
        onClick={togglePlayState}
        className="flex items-center gap-3 md:gap-4 text-foreground/80 hover:text-foreground transition-colors duration-300 pointer-events-auto"
        aria-label={isPlaying ? "Pause Artist Audio" : "Play Artist Audio"}
      >
        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
        <span className="text-xs md:text-sm font-heading tracking-[0.2em] uppercase">
          {isPlaying ? "Pause" : "Listen to Artist"}
        </span>
      </button>

      {(isActive && voiceoverDuration > 0) && (
        <div className="text-xs md:text-sm font-mono tracking-widest text-foreground/60 w-20 md:w-24 text-center pointer-events-none select-none">
          {formatTime(voiceoverTime)} / {formatTime(voiceoverDuration)}
        </div>
      )}

      <button
        onClick={toggleMute}
        className="text-foreground/60 hover:text-foreground transition-colors duration-300 pointer-events-auto ml-2 md:ml-4"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-5 h-5 md:w-6 md:h-6" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6" />}
      </button>
    </div>
  );
};

export default VoiceoverPlayer;
