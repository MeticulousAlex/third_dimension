import React from 'react';
import Assistant from './AssistantBlob/AssistantBlob';
import './App.css';

function App() {

//AssistantBlob temp
const [speedSlider, setSpeedSlider] = React.useState(13);
const [spikesSlider, setSpikesSlider] = React.useState(0.6);
const [processingSlider, setProcessingSlider] = React.useState(1);





  return (
    <div className="App">
      <Assistant speedSlider={speedSlider} setSpeedSlider={setSpeedSlider} spikesSlider={spikesSlider} setSpikesSlider={setSpikesSlider} processingSlider={processingSlider} setProcessingSlider={setProcessingSlider}/>
    </div>
  );
}

export default App;
