import type { ImgHTMLAttributes } from "react";

interface ProtectedImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const ProtectedImage = ({ className, style, ...props }: ProtectedImageProps) => (
  <img
    {...props}
    className={className}
    style={{ ...style, WebkitUserSelect: "none", userSelect: "none" }}
    onContextMenu={(e) => e.preventDefault()}
    onDragStart={(e) => e.preventDefault()}
    draggable={false}
  />
);

export default ProtectedImage;
