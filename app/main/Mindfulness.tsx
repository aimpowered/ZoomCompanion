// Under Review

"use client";

interface VideoPlayerProps {
  videoId: string;
  Label: string;
}

const generateVideoPlayer = ({ videoId, Label }: VideoPlayerProps) => (
  <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '56.25%', marginBottom: '20px' }}>
    <iframe
      className='video'
      title='Youtube player'
      aria-label={Label}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      src={`https://www.youtube.com/embed/${videoId}`}
    ></iframe>
  </div>
);

function Mindfullness() {

  const youtube1ID = 'AKN_gbj8UtU'
  const youtube2ID = 'c7IkEhKtUwI'
  const youtube3ID = 'sG69_omRCyo'
  const youtube1Label = 'youtube-video-1';
  const youtube2Label = 'youtube-video-2';
  const youtube3Label = 'youtube-video-3';

  return (
    <div className="mindfulness-container">
      <h2 className="title">Mindfulness</h2>
      <div className="video-container">
        {generateVideoPlayer({ videoId: youtube1ID, Label: youtube1Label })}
        {generateVideoPlayer({ videoId: youtube2ID, Label: youtube2Label })}
        {generateVideoPlayer({ videoId: youtube3ID, Label: youtube3Label })}
      </div>
    </div>
  );
}

export default Mindfullness;
