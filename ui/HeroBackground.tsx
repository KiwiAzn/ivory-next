'use client';
import { Canvas } from '@react-three/fiber';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import React, { useEffect } from 'react';

const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const Plane: React.FC = () => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <shadowMaterial color="#171717" transparent opacity={0.4} />
    </mesh>
  );
};

const D6: React.FC = () => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [getRandomArbitrary(-5, 5), 10, getRandomArbitrary(-5, 5)],
  }));

  useEffect(() => {
    api.angularVelocity.set(
      getRandomArbitrary(-5, 5),
      getRandomArbitrary(-5, 5),
      getRandomArbitrary(-5, 5),
    );
  });

  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry />
      <meshLambertMaterial color="rgb(125,125,125)" />
    </mesh>
  );
};

export const HeroBackground: React.FC = () => (
  <Canvas
    shadows
    dpr={[1, 2]}
    gl={{ alpha: false }}
    camera={{ near: 1, position: [-5, 5, 5] }}
  >
    <color attach="background" args={[28 / 255, 28 / 255, 28 / 255]} />
    <ambientLight />
    <directionalLight
      position={[10, 10, 10]}
      castShadow
      shadow-mapSize={[2048, 2048]}
    />
    <Physics>
      <Plane />
      <D6 />
      <D6 />
      <D6 />
      <D6 />
      <D6 />
      <D6 />
    </Physics>
  </Canvas>
);
