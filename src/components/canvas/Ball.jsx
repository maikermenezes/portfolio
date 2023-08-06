import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Decal, Float, Preload, useTexture } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Ball = (props) => {

  const [decal] = useTexture([props.imgUrl]);
  
  return (

    <Float speed={0.1} rotationIntensity={0.1} floatIntensity={0.1}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#ffffff" 
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          roughness={0} 
          metalness={0.5} 
          />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.5]}
          flatShading
          map={decal}
          />
      </mesh>
    </Float>

    )
}

const BallCanvas = ({ icon }) => {
  return (
    <Canvas frameloop='demand' gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={ <CanvasLoader /> }>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon}/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default BallCanvas