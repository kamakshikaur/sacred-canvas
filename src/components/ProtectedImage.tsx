import type { ImgHTMLAttributes } from "react";

interface ProtectedImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const ProtectedImage = ({ className, style, ...props }: ProtectedImageProps) => (
  <div className="relative inline-block group/protected">
    <img
      {...props}
      className={className}
      style={{ ...style, WebkitUserSelect: "none", userSelect: "none" }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      draggable={false}
    />
    {/* Transparent overlay to block direct saving/dragging */}
    <div 
      className="absolute inset-0 z-10 select-none bg-transparent" 
      onContextMenu={(e) => e.preventDefault()}
    />
  </div>
);

export default ProtectedImage;
