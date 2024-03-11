import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useNavigate, useLocation } from 'react-router-dom';
import './predicted.css';

export default function Predicted() {
    const location = useLocation();
    const navigate = useNavigate();
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (location.state === null) {
            navigate("/");
        } else {
            setTimeout(() => {
                setOpacity(0.8);
            }, 100);
        }
    }, [location.state, navigate]);

    const number = location.state;
    const [rotationSpeed, setRotationSpeed] = useState(0.01);
    const [position, setPosition] = useState([12, 1, 1]);
    const [lightPosition, setLightPosition] = useState([0, 0, 0]);
    const [intensity, setIntensity] = useState(0.5);
    const sphereRef = useRef();
    const [rotation, setRotation] = useState([0, 0, 0]);
    const [size, setSize] = useState([8, 32, 16]);
    const [change, setChange] = useState(0.01);
    const [z, setZ] = useState(0.005);

    function AnimatedBox({ rotationSpeed }) {
        useFrame(() => {
            setRotation(prevRotation => [
                prevRotation[0] + rotationSpeed,
                prevRotation[1],
                prevRotation[2]
            ]);
        });

        useFrame(() => {
            if(position[0]<=0){
                setChange(0);
            }
            if(position[0]<10){
                setZ(0);
            }
            setPosition( prevPosition => [
                prevPosition[0] - change,
                prevPosition[1],
                prevPosition[2] - z
            ]);
        });

        return (
            <mesh ref={sphereRef} position={position} rotation={rotation}>
                <sphereGeometry args={size} />
                <meshToonMaterial color={0xFFECD1} wireframe={true}/>
            </mesh>
        );
    }

    return (
        <div className="predicted-container">
            <div className="predicted-back">
                <button onClick={() => { navigate(-1) }} className="predicted-button">Back</button>
                <button onClick={() => { navigate("/") }} className="predicted-button">Log Out</button>
            </div>
            <div className="predicted-main" style={{ opacity:opacity }}>
                <h1>Predicted House Price: </h1>
                <h3>$ {number.prediction}</h3>
            </div>
            <div className="predicted-animation">
                <Canvas>
                    <ambientLight color={"#FFFFFF"} intensity={intensity} />
                    <pointLight position={[3, -1, 1]} color={"#FFFFFF"} intensity={10} />
                    <AnimatedBox rotationSpeed={rotationSpeed} />
                </Canvas>
            </div>
        </div>
    );
}
