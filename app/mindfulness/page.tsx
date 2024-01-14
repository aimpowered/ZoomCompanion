"use client";
import Header from '../header';
import Footer from '../footer';

function Home() {

  const youtube1ID = 'SD6dPo98dWw'
  const youtube2ID = '90mqR3A9Pno'

  return (
    <div className="bg-white w-screen h-screen">
      <div className="flex w-full justify-between">
        <Header />
      </div>

      <div style={{ marginLeft: '20px', marginRight: '20px' }}>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold', display: 'inline-block' }}>Mindfulness</h2>
          <div className="flex flex-col items-center mt-4">
            <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '56.25%', marginBottom: '20px' }}>
              <iframe
                className='video'
                title='Youtube player'
                data-testid="youtube1-iframe"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/${youtube1ID}`}
              ></iframe>
            </div>

            <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '56.25%' }}>
              <iframe
                className='video'
                title='Youtube player'
                data-testid="youtube2-iframe"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/${youtube2ID}`}
              ></iframe>
            </div>
          </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
