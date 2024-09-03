import React from "react";

function VideoBlock({ videoSRC }) {
  return (
    <video
      src={videoSRC}
      autoPlay // Automatically plays the video when the component is rendered
      loop // Replays the video automatically when it ends
      muted // Mutes the video by default
      playsInline // Ensures the video plays inline on mobile devices
      className="w-full max-w-2xl rounded-md"
    >
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoBlock;
