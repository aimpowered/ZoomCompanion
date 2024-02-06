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

  const youtube1ID = 'SD6dPo98dWw'
  const youtube2ID = '90mqR3A9Pno'
  const youtube1Label = 'youtube-video-1';
  const youtube2Label = 'youtube-video-2';

  return (
      <div style={{ marginLeft: '20px', marginRight: '20px' }}>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold', display: 'inline-block' }}>Mindfulness</h2>
          <div className="flex flex-col items-center mt-4">
            {generateVideoPlayer({ videoId: youtube1ID, Label: youtube1Label })}
            {generateVideoPlayer({ videoId: youtube2ID, Label: youtube2Label })}
          </div>
      </div>
  );
}

export default Mindfullness;
