"use client";

import React from 'react';
import Tabs from "./Tabs";

function App() {
  return (
    <div>
      <h1>Tabs Demo</h1>
      <div>
      Some other things
      </div>
      {/*<footer className="footer">*/}
        <Tabs>
          <div label="affirmation">
            See ya later, <em>Alligator</em>!
          </div>
          <div label="nametag">
            After 'while, <em>Crocodile</em>!
          </div>
          <div label="mindfulness">
            Nothing to see here, this tab is <em>extinct</em>!
          </div>

          <div label="wave-hands">
            wave-hands here! this tab is also <em>extinct</em>!
          </div>
        </Tabs>
      {/*</footer>*/}
    </div>
  );
}

export default App;
