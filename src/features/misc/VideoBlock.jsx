import React from "react";

function VideoBlock({ videoSRC }) {
  return (
    <video
      src={videoSRC}
      autoPlay
      loop
      muted
      playsInline
      className="w-full max-w-2xl rounded-md"
    >
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoBlock;
