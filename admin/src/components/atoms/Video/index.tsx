import React from "react";

interface Props {
    src: string;
    width?: string
    height?: string
}

const Video = ({src, width="240", height="240"}: Props) => {
  return (
    <video width={width} height={height} controls preload="none">
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
