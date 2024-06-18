import './AssistantBlob.css';

import { Slider } from '@mui/material';
import * as THREE from 'three';
import React from 'react';
import {createNoise3D} from 'simplex-noise';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { normalize } from 'three/src/math/MathUtils.js';



export default function Assistant(props){

    const handleSpeedChange = (event, newSpeed) => {
        props.setSpeedSlider(newSpeed);
    }

    const handleSpikesChange = (event, newSpikes) =>{
        props.setSpikesSlider(newSpikes);
    }
    const handleProcessingChange = (event, newProcessing) => {
        props.setProcessingSlider(newProcessing);
    }

    React.useEffect(()=>{
    while (document.querySelector('.canvas') === null){
    }
    let canvas = document.querySelector('.canvas')
    let renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                context: canvas.getContext('webgl2'),
                antialias: true,
                alpha: true
            })
    let simplex = createNoise3D();

    renderer.setSize(window.innerWidth, 1000);
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    let scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(5));
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth/ canvas.clientHeight, 1, 1000);

    
    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0,0,0);
    controls.enableZoom = false;
    controls.update();


    let geometry = new THREE.SphereGeometry(0.8, 128, 128);
    let material = new THREE.MeshPhongMaterial({
        color: 0x1a1a1a,
        shininess: 120
    });
    let sphere = new THREE.Mesh(geometry, material);

    let lightTop = new THREE.DirectionalLight(0x23F11F, 2);
    lightTop.position.set(-100,100,-100);
    camera.add(lightTop);
   

    let lightBottom = new THREE.DirectionalLight(0xFF235F, 1);
    lightBottom.position.set(0, -500, 400);
    lightBottom.castShadow = true;
    camera.add(lightBottom);

    let white1 = new THREE.DirectionalLight(0xFFFFFF, 1.1);
    white1.position.set(-100, 100, -250);
    white1.castShadow = true;
    camera.add(white1);

    let white2 = new THREE.DirectionalLight(0xFFFFFF, 0.2);
    white2.position.set(500, -600, -50);
    white2.castShadow = true;
    camera.add(white2);


    let ambientLight = new THREE.AmbientLight(0xFFFFFF,0.1);
    camera.add(ambientLight);

    scene.add(camera)
    

    scene.add(sphere);

    const positionAttribute = sphere.geometry.attributes.position;
    const positionReferenceArray = JSON.parse(JSON.stringify(geometry.attributes.position.array));

    let speedValue = document.querySelector('.slider_speed input');
    let spikesValue = document.querySelector('.slider_spikes input');
    let processingValue = document.querySelector('.slider_processing input');
    
    
    function update(){
        let time = performance.now() * 0.00001 * speedValue.value * Math.pow(processingValue.value, 3);
        let spikes = spikesValue.value * processingValue.value;
        for(let i = 0; i < positionAttribute.count; i++) {
            const ux = geometry.attributes.uv.getX(i) * Math.PI * 16;
            const uy = geometry.attributes.uv.getY(i) * Math.PI * 16;

            const xangle = (ux);
            const xsin = Math.sin(xangle) * 0.05;
            const yangle = (uy);
            const ycos = Math.cos(yangle) * 0.05;

            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;
            let vector = new THREE.Vector3(positionReferenceArray[ix],positionReferenceArray[iy],positionReferenceArray[iz]);
            vector.normalize().multiplyScalar(1 + 0.2 * simplex(vector.x * spikes, vector.y * spikes, vector.z * spikes + time)); // 405's are not needed
            positionAttribute.setXYZ(i, vector.x, vector.y, vector.z);
            // const xnew = positionReferenceArray[i] + kek;
            // const ynew = positionReferenceArray[i] +kek;
            // const znew = positionReferenceArray[i] + kek;

            // positionAttribute.setZ(i,znew);
            // positionAttribute.setX(i, positionReferenceArray[ix]);
            // positionAttribute.setY(i, positionReferenceArray[iy]);
            // positionAttribute.setZ(i, positionReferenceArray[iz] + kek * 0.05 * Math.sin(yangle));
        }
        positionAttribute.needsUpdate = true;
        sphere.geometry.computeVertexNormals();
       
    }

    function animate(speedValue){
        update(speedValue);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    },[])


    return(
        <>
        <div id="blob">
                <canvas className='canvas'>

                </canvas>
            </div>

            <div class="controls">
                <div>
                    <label>Speed</label>
                    <Slider className='slider_speed' aria-label="Speed" value={props.speedSlider} onChange={handleSpeedChange} step={1} min={10} max={120}/>
                </div>
                <div>
                    <label>Spikes</label>
                    <Slider className='slider_spikes' aria-label="Spikes" value={props.spikesSlider} onChange={handleSpikesChange} step={0.05} min={0.05} max={2}/>
                </div>
                <div>
                    <label>Processing</label>
                    <Slider className='slider_processing' aria-label="Spikes" value={props.processingSlider} onChange={handleProcessingChange} step={0.01} min={0.6} max={2.4}/>
                </div>
            </div>
        </>
    );
}

