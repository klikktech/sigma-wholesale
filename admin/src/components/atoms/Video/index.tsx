import React from "react";

interface Props {
    src: string;
    width?: string
    height?: string
}

const Video = ({src}: Props) => {
  return (
    <video
    className={`rounded-sm w-full h-full object-cover`}
    autoPlay={true}
    muted={true}
    loop={true}
>
    <source src={src} type="video/mp4" />
    Your browser does not support the video tag.
</video>
  );
};

export default Video;
