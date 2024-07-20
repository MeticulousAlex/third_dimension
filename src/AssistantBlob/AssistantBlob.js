import './AssistantBlob.css';
// import arrow from '../images/right-chevron-svgrepo-com.svg';

// import { Slider } from '@mui/material';
// import * as THREE from 'three';
// import React from 'react';
// import {createNoise3D} from 'simplex-noise';
// import perlinNoise3d from 'perlin-noise-3d'
// import { OrbitControls } from 'three/examples/jsm/Addons.js';
// import Roundy from 'roundy';


// export default function Assistant(props){

//     const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

//     const fixedAngle = Number(((4 *Math.PI)/3).toFixed(1));
//     const handleSpeedChange = (newSpeed) => {
//         props.setSpeedSlider(newSpeed);
//         document.querySelector('.round-slider').speedvalue = newSpeed;
//     }

//     const handleSpikesChange = (newSpikes) =>{
//         props.setSpikesSlider(newSpikes/100);
//         document.querySelector('.round-slider').spikesvalue = newSpikes/100;
//     }
//     const handleProcessingChange = (newProcessing) => {
//         props.setProcessingSlider(newProcessing/100);
//         document.querySelector('.round-slider').processingvalue = newProcessing/100;
//     }

//     const handleLeft = () =>{
//         let rotor = document.querySelector('.controls');
//         if (rotor.rotate < 0){
//             rotor.rotate -= fixedAngle;
//         } else if (rotor.rotate > 0){
//             rotor.rotate -= rotor.rotate + (fixedAngle - rotor.rotate % (fixedAngle));
//         } else {
//             rotor.rotate = -fixedAngle;
//         }
//     }

//     const handleRight = () =>{
        
//         let rotor = document.querySelector('.controls');console.log(rotor);
//         if (rotor.rotate > 0){
//             rotor.rotate += fixedAngle;
//         } else if (rotor.rotate < 0){
//             rotor.rotate += -rotor.rotate + (fixedAngle + rotor.rotate % (-fixedAngle));
//         } else {
//             rotor.rotate = fixedAngle;
//         }

//     }

//     const handleCompensate = (element,value) =>{
//         element.rotate = Number(element.rotate.toFixed(1)) + value;
        
//     }

//     React.useEffect(() => {
//         const handleResize = () => {
//             props.setScreenWidth(window.innerWidth);
//         };
 
//         window.addEventListener("resize", handleResize);
 
//         // Cleanup: Remove event listener on component unmount
//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, []);

//     React.useEffect(()=>{
//         while (document.querySelector('.canvas') === null){
//         }

//         let canvas = document.querySelector(`.canvas`)

//         let renderer = new THREE.WebGLRenderer({
//                     canvas: canvas,
//                     context: canvas.getContext('webgl2'),
//                     antialias: true,
//                     alpha: true
//         })

//         renderer.setSize(props.screenWidth, props.screenWidth > 765 ? props.screenWidth * 0.6 : props.screenWidth - 50);
//         renderer.setPixelRatio(window.devicePixelRatio || 1);

//         let simplex = createNoise3D();
//         let perlin = new perlinNoise3d();
//         perlin.noiseSeed(Math.E);


//         let scene = new THREE.Scene();
//         let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth/ canvas.clientHeight, 1, 1000);
        
//         camera.position.z = 10;

//         const controls = new OrbitControls(camera, renderer.domElement);
//         controls.target.set(0,0,0);
//         controls.enableZoom = false;

//         let rotationValue = 0.1000;


//         let geometrySimplex = new THREE.SphereGeometry(1, 128, 128);
//         let geometryPerlin = new THREE.SphereGeometry(0.2, 128, 128);
//         let geometryHex = new THREE.SphereGeometry(0.7,5,5);
//         // let material = new THREE.MeshPhongMaterial({
//         //     color: 0x4f4f4f,
//         //     shininess: 120,
//         // });

//         const material2 = new THREE.MeshPhysicalMaterial({  
//             roughness: 0.05,
//             transmission: .95,
//             thickness:1
//         });

//         let blobSimplex = new THREE.Mesh(geometrySimplex, material2);
//         let blobPerlin = new THREE.Mesh(geometryPerlin, material2);
//         let blobHex = new THREE.Mesh(geometryHex, material2);
//         // ------------------LIGHTS-------------------------

//         let lightTop = new THREE.DirectionalLight(0x23F11F, 2);
//         lightTop.position.set(-100,100,-100);
//         camera.add(lightTop);

//         let lightBottom = new THREE.DirectionalLight(0xFF235F, 1);
//         lightBottom.position.set(0, -500, 400);
//         lightBottom.castShadow = true;
//         camera.add(lightBottom);

//         let white1 = new THREE.DirectionalLight(0xFFFFFF, 1.1);
//         white1.position.set(-100, 100, -250);
//         white1.castShadow = true;
//         camera.add(white1);

//         let white2 = new THREE.DirectionalLight(0xFFFFFF, 0.2);
//         white2.position.set(500, -600, -50);
//         white2.castShadow = true;
//         camera.add(white2);

//         let ambientLight = new THREE.AmbientLight(0xFFFFFF,0.1);
//         camera.add(ambientLight);

//         //------------------POSITIONING------------------------

//         scene.add(camera)
//         scene.add(blobSimplex);
//         scene.add(blobPerlin);
//         scene.add(blobHex);

//         const positionAttributeSimplex = geometrySimplex.attributes.position;
//         const positionAttributePerlin = geometryPerlin.attributes.position;
//         const positionAttributeHex = geometryHex.attributes.position;

//         const positionReferenceArraySimplex = JSON.parse(JSON.stringify(geometrySimplex.attributes.position.array));
//         const positionReferenceArrayPerlin = JSON.parse(JSON.stringify(geometryPerlin.attributes.position.array));
//         const positionReferenceArrayHex = JSON.parse(JSON.stringify(geometryHex.attributes.position.array));
        
//         function update(){
//             let SlidersElement = document.querySelector('.round-slider');
//             let speedValue = SlidersElement.speedvalue || 13;
//             let spikesValue = SlidersElement.spikesvalue || 0.6;
//             let processingValue = SlidersElement.processingvalue || 1;

//             let time = performance.now() * 0.00001 * speedValue * Math.pow(processingValue, 3);
//             let spikes = spikesValue * processingValue * (props.type === 'simplex' ? 1 : 30);
//             for(let i = 0; i < positionAttributeSimplex.count; i++) {

//                 const ix = i * 3;
//                 const iy = i * 3 + 1;
//                 const iz = i * 3 + 2;
        
//                 let vector1 = new THREE.Vector3(positionReferenceArraySimplex[ix],positionReferenceArraySimplex[iy],positionReferenceArraySimplex[iz]);
//                 let vector2 = new THREE.Vector3(positionReferenceArrayPerlin[ix] ,positionReferenceArrayPerlin[iy],positionReferenceArrayPerlin[iz]);

//                 vector1.multiplyScalar(0.5 + 0.2 * simplex(vector1.x * spikes, vector1.y * spikes, vector1.z * spikes + time));
//                 vector2.normalize().multiplyScalar(0.5 + 0.2 * perlin.get(vector2.x * spikes, vector2.y * spikes, vector2.z * spikes + time));
//                 positionAttributeSimplex.setXYZ(i, vector1.x + 4 * Math.cos(Math.PI/2), vector1.y, vector1.z + 4 * Math.sin(Math.PI/2));
//                 positionAttributePerlin.setXYZ(i, vector2.x + 4 * Math.cos(Math.PI + Math.PI/6), vector2.y, vector2.z + 4 * Math.sin(Math.PI + Math.PI/6));
//             }

//             for(let i = 0; i < positionAttributeHex.count; i++) {

//                 const ix = i * 3;
//                 const iy = i * 3 + 1;
//                 const iz = i * 3 + 2;
//                 let vector3 = new THREE.Vector3(positionReferenceArrayHex[ix] ,positionReferenceArrayHex[iy],positionReferenceArrayHex[iz])
        
//                 positionAttributeHex.setXYZ(i, vector3.x + 4 * Math.cos(-Math.PI/6), vector3.y, vector3.z + 4 * Math.sin(-Math.PI/6));
//             }

//             positionAttributePerlin.needsUpdate = true;
//             positionAttributeSimplex.needsUpdate = true;
//             positionAttributeHex.needsUpdate = true;
//             geometryPerlin.computeVertexNormals();
//             geometrySimplex.computeVertexNormals();
//             geometryHex.computeVertexNormals();
        
//         }

//         function animate(){
//             requestAnimationFrame(animate);
//             let leftToRotate = document.querySelector('.controls');
//             if (leftToRotate.rotate){
//                 if (Number(leftToRotate.rotate.toFixed(1)) < 0){
//                     blobHex.rotation.set(0,blobHex.rotation.y + rotationValue, 0, 'XYZ');
//                     blobPerlin.rotation.set(0,blobPerlin.rotation.y + rotationValue, 0, 'XYZ');
//                     blobSimplex.rotation.set(0,blobSimplex.rotation.y + rotationValue, 0, 'XYZ');
//                     handleCompensate(leftToRotate, rotationValue)
//                 } else if (Number(leftToRotate.rotate.toFixed(1)) > 0){
//                     blobHex.rotation.set(0,blobHex.rotation.y - rotationValue, 0, 'XYZ');
//                     blobPerlin.rotation.set(0,blobPerlin.rotation.y - rotationValue, 0, 'XYZ');
//                     blobSimplex.rotation.set(0,blobSimplex.rotation.y - rotationValue, 0, 'XYZ');
//                     handleCompensate(leftToRotate,-rotationValue)
//                 }
//             }
            
            
//             update();
//             renderer.render(scene, camera);
//             camera.updateProjectionMatrix();
//         }
//         animate();

//         return() => {
//             document.querySelector('.controls').rotate = 0;
//             geometryHex.dispose();
//             geometryPerlin.dispose();
//             geometrySimplex.dispose();
//             controls.dispose();
//             scene.remove(blobSimplex);
//             scene.remove(blobPerlin);
//             scene.remove(blobHex);
//         }
//     },[props.screenWidth])


//     return(
//         <>
//             <div className='blob'>
//                 <canvas className={`canvas`} >

//                 </canvas>
//                 <div className='round-slider' speedvalue={props.speedSlider} spikesvalue={props.spikesSlider} processingvalue={props.processingSlider}>
//                     <Roundy className='round-slider_speed' value={props.speedSlider} min={10} max={120} color={'orange'} radius={300} arcSize={110} rotationOffset={33} sliced={false} step={1} strokeWidth={2} thumbSize={0.5} overrideStyle={'position:absolute; .sliderHandle::after{ width:10px; height:10px; right: -5px;}'}  onChange={handleSpeedChange}/>
//                     <Roundy className='round-slider_spikes' value={props.spikesSlider * 100} min={5} max={200} color={'orange'} radius={300} arcSize={110} rotationOffset={153} sliced={false} step={5} strokeWidth={2} thumbSize={0.5} overrideStyle={'position:absolute; .sliderHandle::after{ width:10px; height:10px; right: -5px;}'} onChange={handleSpikesChange}/>
//                     <Roundy className='round-slider_processing' value={props.processingSlider * 100 || 0.05} min={60} max={240} color={'orange'} radius={300} arcSize={110} rotationOffset={-87}sliced={false} step={1} strokeWidth={2} thumbSize={0.5} overrideStyle={'position:absolute; .sliderHandle::after{ width:10px; height:10px; right: -5px;}'} onChange={handleProcessingChange}/>  
//                 </div>
//                 <svg className='slider-caption' width="600" height="600" viewBox="0 0 600 600">
//                     <path id="curve1" d="M 0, 300 a 300,300 0 1,0 600,0 300,300 0 1,1 -600,0" />
//                     <text width="52">
//                         <textPath alignment-baseline="hanging" color="white"href="#curve1">
//                         Processing
//                         </textPath>
//                     </text>
//                 </svg>
//                 <svg className='slider-caption' width="600" height="600" viewBox="0 0 600 600">
//                     <path id="curve2" d="M 0, 300 a 300,300 0 1,0 600,0 300,300 0 1,1 -600,0" />
//                     <text >
//                         <textPath alignment-baseline="hanging" color="white"href="#curve2">
//                         Spikes
//                         </textPath>
//                     </text>
//                 </svg>
//                 <svg className='slider-caption' width="600" height="600" viewBox="0 0 600 600">
//                     <path id="curve3" d="M 0, 300 a 300,300 0 1,1 600,0 300,300 0 1,1 -600,0" />
//                     <text>
//                         <textPath alignment-baseline="top" color="white"href="#curve3" side="right">
//                         Speed
//                         </textPath>
//                     </text>
//                 </svg>
//                 <div className='controls' rotate={props.toRotate}>
//                     <button className='controls__button controls__button_left' onClick={handleLeft}><img src={arrow} alt='arrow-left'/></button>
//                     <button className='controls__button controls__button_right'onClick={handleRight}><img src={arrow} alt='arrow-right'/></button>
//                 </div>
//             </div>
//         </>
//     );
// }

