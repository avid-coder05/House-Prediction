import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import "./redirect.css"

export default function Card() {
  const [rotationSpeed, setRotationSpeed] = useState(0.001);
  const [position, setPosition] = useState([12, 0, 1]);
  const [lightPosition, setLightPosition] = useState([3, -1, 1]);
  const [intensity, setIntensity] = useState(0.5);
  const navigate = useNavigate();
  const sphereRef = useRef();
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [size, setSize] = useState([8, 32, 16]);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 200);
  });

  const incrementRotationSpeed = amount => {
    setRotationSpeed(prevSpeed => prevSpeed + amount);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("https://house-prediction-backend.onrender.com", {
        method: e.target.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Failed to login");
      }

      setTimeout(() => {setOpacity(0);}, 10);
      const data = await res.json();
      setTimeout(() => {
        navigate("/predicted", {state: data});
      }, 2400);
    } catch (error) {
      alert(error.message);
    }
  }

  function AnimatedBox({ rotationSpeed }) {
    useFrame(() => {
      setRotation(prevRotation => [
        prevRotation[0],
        prevRotation[1] + rotationSpeed,
        prevRotation[2]
      ]);
    });

    return (
      <mesh ref={sphereRef} position={[9, 0, 1]} rotation={rotation}>
        <sphereGeometry args={size} />
        <meshToonMaterial color={0xFFECD1} wireframe={true}/>
      </mesh>
    );
  }

  return(
    <div className="redirect-container" style={{opacity: opacity}}>
      <div className="back-button">
        <button onClick={() => navigate("/")} className="redirect-button">Logout</button>
      </div>
      <div className="redirect-animation">
        <Canvas>
          <ambientLight color={"#FFFFFF"} intensity={0.5} />
          <pointLight position={[3, -1, 1]} color={"#FFFFFF"} intensity={10} />
          <AnimatedBox rotationSpeed={rotationSpeed} />
        </Canvas>
      </div>
      <div className="redirect-form-container">
        <form method="post" onSubmit={handleSubmit} className="redirect-form">
          <label className="redirect-label">Squarefeets:</label>
          <input type="number" name="SquareFeet" className="redirect-input"/>
          <label className="redirect-label">Bedrooms:</label>
          <input type="number" name="Bedrooms" className="redirect-input"/>
          <label className="redirect-label">Neighborhood:</label>
          <select name="Neighborhood" className="redirect-select">
            <option value="" className="redirect-option">None</option>
            <option value="Suburb" className="redirect-option">Suburb</option>
            <option value="Rural" className="redirect-option">Rural</option>
            <option value="Urban" className="redirect-option">Urban</option>
          </select>
          <label className="redirect-label">Bathrooms:</label>
          <input type="number" name="Bathrooms" className="redirect-input"/>
          <button type="submit" className="redirect-form-button">Submit</button>
        </form>
      </div>
    </div>
  )
}