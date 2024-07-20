import './AssistantBlobReact.css';
import { Canvas, useThree, useFrame} from '@react-three/fiber';
import { MathUtils } from "three";
import React, { useRef, useMemo } from 'react';
//import Controls from '../Controls/Controls';
import vertexShaderSimplex from "./vertexShaderSimplex";
import vertexShaderPerlin from "./vertexShaderPerlin";
import vertexShaderVoronoi from './vertexShaderVoronoi';
import fragmentShader from "./fragmentShader";
import { OrbitControls } from "@react-three/drei";


import arrow from '../images/right-chevron-svgrepo-com.svg';
import * as THREE from 'three';
import Roundy from 'roundy';




const SimplexBlob = (props) => {
    
    const meshSimplex = useRef();
    const hover = useRef(false);
    const clicked = useRef(false);

    // const [currentPosition,setCurrentPosition] = React.useState([3 * Math.sin(2*Math.PI), 0, 3 * Math.cos(2*Math.PI)]);
    const [currentShader, setCurrentShader] = React.useState(1);
    const [isShaderChanged, setIsShaderChanged] = React.useState(false);

    async function changeValues(sign){
      props.setAdditionalAngle(props.additionalAngle+ (3*Math.PI/180).toFixed(15) * sign );
      await props.setRotation(props.rotation + 1 * sign);
    }

    function changeShader(){
      setTimeout(()=>{
        switch (currentShader){
          case 1:
            setCurrentShader(2);
            break;
          case 2:
            setCurrentShader(3);
            break;
          default:
            setCurrentShader(1);
        }
        setIsShaderChanged(true);
      }, 200);
    }


    const uniforms = useMemo(
      () => ({
        u_intensity: {
          value: 0.3,
        },
        u_time: {
          value: 0.0,
        },
        u_shader_type:{
          value:1,
        },
      }),
      []
    );
  
    useFrame((state) => {
      const { clock } = state;
      console.log(props.rotation);
      if (props.rotation < 0){
        // setCurrentPosition([3 * Math.sin(2*Math.PI + additionalAngle + Math.PI/180), 0, 3 * Math.cos(2*Math.PI + additionalAngle + Math.PI/180)]);
        // setAdditionalAngle(additionalAngle+Math.PI/180);
        // props.setRotation(props.rotation + 1);
        // setAdditionalAngle(additionalAngle+Math.PI/180);
        // props.setRotation(props.rotation + 1);
        changeValues(1);
      }
      if (props.rotation > 0){
        // setCurrentPosition([3 * Math.sin(2*Math.PI + additionalAngle - Math.PI/180), 0, 3 * Math.cos(2*Math.PI + additionalAngle - Math.PI/180)]);
        // setAdditionalAngle(additionalAngle-Math.PI/180);
        // props.setRotation(props.rotation - 1);
        changeValues(-1);
      }

      meshSimplex.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
      if (!clicked.current){
        meshSimplex.current.material.uniforms.u_intensity.value = MathUtils.lerp(
          meshSimplex.current.material.uniforms.u_intensity.value,
          hover.current ? 0.85 : 0.15,
          0.05
        );
      } else {
        meshSimplex.current.material.uniforms.u_shader_type.value = currentShader;
        if (isShaderChanged){
          clicked.current = false;
          setIsShaderChanged(false);
        }
        
        meshSimplex.current.material.uniforms.u_intensity.value = MathUtils.lerp(
          meshSimplex.current.material.uniforms.u_intensity.value,
          0.0,
          0.15
        );
      }
    });
  
    return (
      <mesh
        ref={meshSimplex}
        // position={[3 * Math.sin(2*Math.PI + props.additionalAngle), 0, 3 * Math.cos(2*Math.PI + props.additionalAngle)]}
        position={[0,0,0]}
        scale={0.73}
        onPointerOver={() => (hover.current = true)}
        onPointerOut={() => (hover.current = false)}
        onClick={() =>{
          changeShader();
          clicked.current = true
        }}
        // onPointerDown={()=> (clicked.current = true)}
        // onPointerDown{}
      >
        <sphereGeometry args={[2.3, 256,256]}/>
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShaderSimplex}
          uniforms={uniforms}
          wireframe={false}
        />
      </mesh>
    );
  };

  // const PerlinBlob = (props) => {
    
  //   const mesh = useRef();
  //   const hover = useRef(false);

  //   const [currentPosition,setCurrentPosition] = React.useState([3 * Math.sin(4 * Math.PI/3), 0, 3 * Math.cos(4 * Math.PI/3)]);
  
  //   const uniforms = useMemo(
  //     () => ({
  //       u_intensity: {
  //         value: 0.3,
  //       },
  //       u_time: {
  //         value: 0.0,
  //       },
  //     }),
  //     []
  //   );
  
  //   useFrame((state) => {
  //     const { clock } = state;
  //     // if (props.rotation < 0){
  //     //   //setCurrentPosition([3 * Math.sin(4 * Math.PI/3 + additionalAngle + Math.PI/180), 0, 3 * Math.cos(4 * Math.PI/3 + additionalAngle + Math.PI/180)]);
  //     //   props.setAdditionalAngle(additionalAngle+Math.PI/180);
  //     // }
  //     // if (props.rotation > 0){
  //     //  // setCurrentPosition([3 * Math.sin(4 * Math.PI/3 + additionalAngle - Math.PI/180), 0, 3 * Math.cos(4 * Math.PI/3 + additionalAngle - Math.PI/180)]);
  //     //   setAdditionalAngle(additionalAngle-Math.PI/180);
  //     // }
  //     mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
  //     mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
  //       mesh.current.material.uniforms.u_intensity.value,
  //       hover.current ? 0.85 : 0.15,
  //       0.02
  //     );
  //   });
  
  //   return (
  //     <mesh
  //       ref={mesh}
  //       position={[3 * Math.sin(4 * Math.PI/3 + props.additionalAngle), 0, 3 * Math.cos(4 * Math.PI/3 + props.additionalAngle)]}
  //       scale={0.2}
  //       onPointerOver={() => (hover.current = true)}
  //       onPointerOut={() => (hover.current = false)}
  //     >
  //       <sphereGeometry args={[2.3, 128,128]} />
  //       <shaderMaterial
  //         fragmentShader={fragmentShader}
  //         vertexShader={vertexShaderPerlin}
  //         uniforms={uniforms}
  //         wireframe={false}
  //       />
  //     </mesh>
  //   );
  // };

  // const VoronoiBlob = (props) => {
    
  //   const mesh = useRef();
  //   const hover = useRef(false);

  //   const [currentPosition,setCurrentPosition] = React.useState([3 * Math.sin(2 * Math.PI/3), 0, 3 * Math.cos(2 * Math.PI/3)]);
  //   const [additionalAngle, setAdditionalAngle] = React.useState(0);
  
  //   const uniforms = useMemo(
  //     () => ({
  //       u_intensity: {
  //         value: 0.3,
  //       },
  //       u_time: {
  //         value: 0.0,
  //       },
  //     }),
  //     []
  //   );
  
  //   useFrame((state) => {
  //     const { clock } = state;
  //     // if (props.rotation < 0){
  //     //  // setCurrentPosition([3 * Math.sin(2 * Math.PI/3 + additionalAngle + Math.PI/180), 0, 3 * Math.cos(2 * Math.PI/3 + additionalAngle + Math.PI/180)]);
  //     //   setAdditionalAngle(additionalAngle+Math.PI/180);
  //     // }
  //     // if (props.rotation > 0){
  //     //  // setCurrentPosition([3 * Math.sin(2 * Math.PI/3 + additionalAngle - Math.PI/180), 0, 3 * Math.cos(2 * Math.PI/3 + additionalAngle - Math.PI/180)]);
  //     //   setAdditionalAngle(additionalAngle-Math.PI/180);
  //     // }
  //     mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
  //     mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
  //       mesh.current.material.uniforms.u_intensity.value,
  //       hover.current ? 0.85 : 0.15,
  //       0.02
  //     );
  //   });
  
  //   return (
  //     <mesh
  //       ref={mesh}
  //       position={[3 * Math.sin(2 * Math.PI/3 + props.additionalAngle), 0, 3 * Math.cos(2 * Math.PI/3 + props.additionalAngle)]}
  //       rotation={[Math.PI/6,2.5,0]}
  //       scale={0.2}
  //       onPointerOver={() => (hover.current = true)}
  //       onPointerOut={() => (hover.current = false)}
  //     >
  //       <sphereGeometry args={[2.3, 256,256]} />
  //       <shaderMaterial
  //         fragmentShader={fragmentShader}
  //         vertexShader={vertexShaderVoronoi}
  //         uniforms={uniforms}
  //         wireframe={false}
  //       />
  //     </mesh>
  //   );
  // };











export default function AssistantBlobReact(props){
    const [rotation,setRotation] = React.useState(0);
    const [additionalAngle, setAdditionalAngle] = React.useState(0);
    // const [additionalAngle, setAdditionalAngle] = React.useState(0);

    // if (rotation > 0){
    //   setRotation(rotation - 0.01);
    //   setAdditionalAngle(additionalAngle - 0.01);
    // } else if (rotation <  0){
    //   setRotation(rotation + 0.01);
    //   setAdditionalAngle(additionalAngle + 0.01);
    // }

    const fixedAngle = 40;
    function handleSpeedChange(newSpeed){
        props.setSpeedSlider(newSpeed);
        document.querySelector('.round-slider').speedvalue = newSpeed;
    }

    function handleProcessingChange(newProcessing){
        props.setProcessingSlider(newProcessing/100);
        document.querySelector('.round-slider').processingvalue = newProcessing/100;
    }

    function handleLeft(){
        if (rotation < 0){
            setRotation(rotation-fixedAngle);
        } else if (rotation > 0){
            setRotation(-(fixedAngle - (rotation % fixedAngle)));
        } else {
            setRotation(-fixedAngle);
        }
    }

    function handleRight(){
        if (rotation > 0){
            setRotation(rotation + fixedAngle);
        } else if (rotation < 0){
            setRotation(fixedAngle + (rotation % (-fixedAngle)));
        } else {
            setRotation(fixedAngle);
        }
    }

    return(
        <div className='blob-orbit'>
            <Canvas camera={{position: [0, 0, 5]}}>
                <SimplexBlob rotation={rotation} setRotation={setRotation} additionalAngle={additionalAngle} setAdditionalAngle={setAdditionalAngle}/>
                {/* <PerlinBlob rotation={rotation} additionalAngle={additionalAngle}/>
                <VoronoiBlob rotation={rotation} additionalAngle={additionalAngle}/> */}
                <ambientLight args={[0xff0000]} intensity={0.1} />
                <directionalLight position={[0, 0, 5]} intensity={0.5} />
                <OrbitControls minPolarAngle={Math.PI/2} maxPolarAngle={Math.PI/2}/>
            </Canvas>
            




             <div className='round-slider' speedvalue={props.speedSlider} spikesvalue={props.spikesSlider} processingvalue={props.processingSlider}>
                    <Roundy className='round-slider_speed' value={props.speedSlider} min={10} max={120} color={'orange'} radius={300} arcSize={110} rotationOffset={33} sliced={false} step={1} strokeWidth={2} thumbSize={0.5} overrideStyle={'position:absolute; .sliderHandle::after{ width:10px; height:10px; right: -5px;}'}  onChange={handleSpeedChange}/>
                    <Roundy className='round-slider_processing' value={props.processingSlider * 100 || 0.05} min={60} max={240} color={'orange'} radius={300} arcSize={110} rotationOffset={-87}sliced={false} step={1} strokeWidth={2} thumbSize={0.5} overrideStyle={'position:absolute; .sliderHandle::after{ width:10px; height:10px; right: -5px;}'} onChange={handleProcessingChange}/>  
                    <Roundy className='round-slider_processing' value={props.processingSlider * 100 || 0.05} min={60} max={240} color={'orange'} radius={300} arcSize={110} rotationOffset={-87}sliced={false} step={1} strokeWidth={2} thumbSize={0.5} overrideStyle={'position:absolute; .sliderHandle::after{ width:10px; height:10px; right: -5px;}'} onChange={handleProcessingChange}/>  
                </div>
                <svg className='slider-caption' width="600" height="600" viewBox="0 0 600 600">
                    <path id="curve1" d="M 0, 300 a 300,300 0 1,0 600,0 300,300 0 1,1 -600,0" />
                    <text width="52">
                        <textPath alignment-baseline="hanging" color="white"href="#curve1">
                        Processing
                        </textPath>
                    </text>
                </svg>
                <svg className='slider-caption' width="600" height="600" viewBox="0 0 600 600">
                    <path id="curve2" d="M 0, 300 a 300,300 0 1,0 600,0 300,300 0 1,1 -600,0" />
                    <text >
                        <textPath alignment-baseline="hanging" color="white"href="#curve2">
                        Spikes
                        </textPath>
                    </text>
                </svg>
                <svg className='slider-caption' width="600" height="600" viewBox="0 0 600 600">
                    <path id="curve3" d="M 0, 300 a 300,300 0 1,1 600,0 300,300 0 1,1 -600,0" />
                    <text>
                        <textPath alignment-baseline="top" color="white"href="#curve3" side="right">
                        Speed
                        </textPath>
                    </text>
                </svg>
                <div className='controls' rotate={props.toRotate}>
                    <button className='controls__button controls__button_left' onClick={handleLeft}><img src={arrow} alt='arrow-left'/></button>
                    <button className='controls__button controls__button_right'onClick={handleRight}><img src={arrow} alt='arrow-right'/></button>
                </div>
        </div>
    );
}
         {/* <div className='round-slider' speedvalue={props.speedSlider} spikesvalue={props.spikesSlider} processingvalue={props.processingSlider}>
                    <Roundy className='round-slider_speed' value={props.speedSlider} min={10} max={120} color={'orange'} radius={300} arcSize={110} rotationOffset={33} sliced={false} step={1} strokeWidth={2} thumbSize={0.5} overrideStyle={'position:absolute; .sliderHandle::after{ width:10px; height:10px; right: -5px;}'}  onChange={handleSpeedChange}/>
                    <Roundy className='round-slider_spikes' value={props.spikesSlider * 100} min={5} max={200} color={'orange'} radius={300} arcSize={110} rotationOffset={153} sliced={false} step={5} strokeWidth={2} thumbSize={0.5} overrideStyle={'position:absolute; .sliderHandle::after{ width:10px; height:10px; right: -5px;}'} onChange={handleSpikesChange}/>
                    <Roundy className='round-slider_processing' value={props.processingSlider * 100 || 0.05} min={60} max={240} color={'orange'} radius={300} arcSize={110} rotationOffset={-87}sliced={false} step={1} strokeWidth={2} thumbSize={0.5} overrideStyle={'position:absolute; .sliderHandle::after{ width:10px; height:10px; right: -5px;}'} onChange={handleProcessingChange}/>  
                </div>
                <svg className='slider-caption' width="600" height="600" viewBox="0 0 600 600">
                    <path id="curve1" d="M 0, 300 a 300,300 0 1,0 600,0 300,300 0 1,1 -600,0" />
                    <text width="52">
                        <textPath alignment-baseline="hanging" color="white"href="#curve1">
                        Processing
                        </textPath>
                    </text>
                </svg>
                <svg className='slider-caption' width="600" height="600" viewBox="0 0 600 600">
                    <path id="curve2" d="M 0, 300 a 300,300 0 1,0 600,0 300,300 0 1,1 -600,0" />
                    <text >
                        <textPath alignment-baseline="hanging" color="white"href="#curve2">
                        Spikes
                        </textPath>
                    </text>
                </svg>
                <svg className='slider-caption' width="600" height="600" viewBox="0 0 600 600">
                    <path id="curve3" d="M 0, 300 a 300,300 0 1,1 600,0 300,300 0 1,1 -600,0" />
                    <text>
                        <textPath alignment-baseline="top" color="white"href="#curve3" side="right">
                        Speed
                        </textPath>
                    </text>
                </svg>
                <div className='controls' rotate={props.toRotate}>
                    <button className='controls__button controls__button_left' onClick={handleLeft}><img src={arrow} alt='arrow-left'/></button>
                    <button className='controls__button controls__button_right'onClick={handleRight}><img src={arrow} alt='arrow-right'/></button>
                </div>
            </div> */}
            

            {/* <div class="controls">
                <div className='slider'>
                    <label>Speed</label>
                    <Slider className='slider_speed' aria-label="Speed" value={props.speedSlider} onChange={handleSpeedChange} step={1} min={10} max={120}/>
                </div>
                <div className='slider'>
                    <label>Spikes</label>
                    <Slider className='slider_spikes' aria-label="Spikes" value={props.spikesSlider} onChange={handleSpikesChange} step={0.05} min={0.05} max={2}/>
                </div>
                <div className='slider'>
                    <label>Processing</label>
                    <Slider className='slider_processing' aria-label="Spikes" value={props.processingSlider} onChange={handleProcessingChange} step={0.01} min={0.6} max={2.4}/>
                </div>
            </div> */}