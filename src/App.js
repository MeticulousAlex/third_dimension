import React from 'react';
import Spline from '@splinetool/react-spline';
import Assistant from './AssistantBlob/AssistantBlob';
import './App.css';
import AssistantBlobReact from './AssistantBlobReact/AssistantBlobReact';
import PrimitiveCarousel from './PrimitiveCarousel/PrimitiveCarousel';

function App() {

//AssistantBlob temp
const [speedSlider, setSpeedSlider] = React.useState(13);
const [spikesSlider, setSpikesSlider] = React.useState(0.6);
const [processingSlider, setProcessingSlider] = React.useState(1);
const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);





  return (
    <div className="App"> 
        <Spline scene="https://prod.spline.design/239lUyk40vUKDJCy/scene.splinecode" />
      {/* <Assistant speedSlider={speedSlider} setSpeedSlider={setSpeedSlider} spikesSlider={spikesSlider} setSpikesSlider={setSpikesSlider} processingSlider={processingSlider} setProcessingSlider={setProcessingSlider} type='simplex' screenWidth={screenWidth} setScreenWidth={setScreenWidth}/> */}
      <AssistantBlobReact speedSlider={speedSlider} setSpeedSlider={setSpeedSlider} spikesSlider={spikesSlider} setSpikesSlider={setSpikesSlider} processingSlider={processingSlider} setProcessingSlider={setProcessingSlider} type='simplex' screenWidth={screenWidth} setScreenWidth={setScreenWidth}/>
      <PrimitiveCarousel/>
      <Spline scene="https://prod.spline.design/pC37xQZlb9pMWC5W/scene.splinecode"/>
    </div>
    
  );
}
export default App;
