"use client";
import Header from '../header';
import Footer from '../footer';

function Home() {

  const video1Path = 'affirmation_videos/1_Minute_Breathing_Exercise_Mini_Meditation_Simple_Breathing_Exercise_One_Minute_Breathe_Bubble.mp4'; // Replace with the actual path to your video1
  const video2Path = 'affirmation_videos/Standing_Upper_Body_Stretches.mp4';

  return (
    <div className="bg-white w-screen h-screen">
      <div className="flex w-full justify-between">
        <Header />
      </div>

      <div style={{ marginLeft: '20px', marginRight: '20px' }}>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold', display: 'inline-block' }}>Mindfulness</h2>
          <div className="flex flex-col items-center mt-4">
            <div style={{ width: '100%', marginBottom: '20px' }}>
              <video controls width="100%" height="100%">
                <source src={video1Path} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div style={{ width: '100%' }}>
              <video controls width="100%" height="100%">
                <source src={video2Path} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
