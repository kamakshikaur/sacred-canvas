import { Play, Pause, VolumeX, Volume2 } from "lucide-react";
import { useSound } from "@/context/SoundContext";

const formatTime = (time: number) => {
  if (isNaN(time) || !isFinite(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const VoiceoverPlayer = () => {
  const { 
    pauseVoiceover, resumeVoiceover,
    activeVoiceover, isVoiceoverPlaying, 
    voiceoverTime, voiceoverDuration,
    isMuted, toggleMute
  } = useSound();

  return (
    <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[105] flex items-center gap-4 bg-background/70 backdrop-blur-xl px-5 py-3 md:px-6 md:py-4 rounded-full border border-foreground/10 shadow-2xl transition-all duration-500 hover:bg-background/90 hover:border-foreground/30">
      
      {/* Voiceover Controls (Only shown if an artwork is currently active) */}
      {activeVoiceover && (
        <div className="flex items-center gap-4 border-r border-foreground/10 pr-4">
          <button 
            onClick={isVoiceoverPlaying ? pauseVoiceover : resumeVoiceover}
            className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors duration-300 pointer-events-auto"
            aria-label={isVoiceoverPlaying ? "Pause Artist Audio" : "Play Artist Audio"}
          >
            {isVoiceoverPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" /> : <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />}
            <span className="text-[10px] md:text-xs font-heading tracking-[0.2em] uppercase shrink-0">
              {isVoiceoverPlaying ? "Pause Voice" : "Artist Voice"}
            </span>
          </button>

          {voiceoverDuration > 0 && (
            <div className="text-[10px] md:text-xs font-mono tracking-wider text-foreground/60 w-16 md:w-20 text-center pointer-events-none select-none">
              {formatTime(voiceoverTime)} / {formatTime(voiceoverDuration)}
            </div>
          )}
        </div>
      )}

      {/* Global Mute Toggle (Always shown) */}
      <button
        onClick={toggleMute}
        className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors duration-300 pointer-events-auto pl-1"
        aria-label={isMuted ? "Unmute Ambient" : "Mute Ambient"}
      >
        {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
        {!activeVoiceover && (
          <span className="text-[10px] md:text-xs font-heading tracking-[0.2em] uppercase">
            {isMuted ? "Unmuted" : "Mute"}
          </span>
        )}
      </button>

    </div>
  );
};

export default VoiceoverPlayer;
