import React from "react";

interface Props {
    src: string;
    onClick?: () => void;
    className?: string;
}

const Video = ({ src, onClick, className = "" }: Props) => {
  return (
    <video
      className={`w-full h-full object-cover rounded-xl ${className}`}
      autoPlay={true}
      muted={true}
      loop={true}
      playsInline={true}
      onClick={onClick}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
