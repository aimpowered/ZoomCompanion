"use client";

import '../css/Mindfulness.css';
import videos from '@/data/videos.json'; // Import video meta data

interface VideoPlayerProps {
  name: string;
  videoId: string;
  label: string;
  alt: string;
}

const generateVideoPlayer = (
    { name, videoId, label, alt }: VideoPlayerProps
    ) => (
  <div className="video-wrapper" key={label}>
    <iframe
      className='video'
      title={name}
      aria-label={alt}
      src={`https://www.youtube.com/embed/${videoId}`}
    ></iframe>
  </div>
);

function Mindfullness() {
  return (
    <div className="mindfulness-container">
      <h2 className="title">Mindfulness</h2>
      <div className="video-container">
        {videos.map((video, index) => 
            generateVideoPlayer({
                name: video.name,
                videoId: video.youtubeId,
                label: video.label,
                alt: video.alt
            })
        )}
      </div>
    </div>
  );
}

export default Mindfullness;
