import { Canvas } from '@react-three/fiber';
import './PrimitiveCarousel.css';
import { OrbitControls } from '@react-three/drei';

export default function PrimitiveCarousel(){



    return(
        <Canvas>
            <mesh position={[-4,0,0]}>
                <boxGeometry parameters={[2,2,2]}/>
                <meshStandardMaterial wireframe={true}/>
            </mesh>
            <mesh position={[-2,0,0]}>
                <sphereGeometry />
                <meshStandardMaterial wireframe={true}/>
            </mesh>
            <mesh position={[-0,0,0]}>
                <ringGeometry/>
                <meshStandardMaterial wireframe={true}/>
            </mesh>
            <mesh position={[2,0,0]}>
                <coneGeometry/>
                <meshStandardMaterial wireframe={true}/>
            </mesh>
            <mesh position={[4,0,0]}>
                <torusKnotGeometry parameters={[0.5]}/>
                <meshStandardMaterial wireframe={true}/>
            </mesh>
            <ambientLight args={[0xff0000]} intensity={0.1} />
            <directionalLight position={[0, 0, 5]} intensity={0.5} />
            <OrbitControls/>
        </Canvas>
    )
}