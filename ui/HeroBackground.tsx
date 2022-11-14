'use client';
import { Canvas, useLoader } from '@react-three/fiber';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import React, { Suspense } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

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
  const [ref] = useBox(() => ({
    mass: 1,
    position: [getRandomArbitrary(-5, 5), 10, getRandomArbitrary(-5, 5)],
    angularVelocity: [
      getRandomArbitrary(-5, 5),
      getRandomArbitrary(-5, 5),
      getRandomArbitrary(-5, 5),
    ],
  }));

  const texture_1 = useLoader(TextureLoader, 'textures/dice_1.jpeg');
  const texture_2 = useLoader(TextureLoader, 'textures/dice_6.jpeg');
  const texture_3 = useLoader(TextureLoader, 'textures/dice_2.jpeg');
  const texture_4 = useLoader(TextureLoader, 'textures/dice_5.jpeg');
  const texture_5 = useLoader(TextureLoader, 'textures/dice_3.jpeg');
  const texture_6 = useLoader(TextureLoader, 'textures/dice_4.jpeg');

  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry />
      <meshStandardMaterial map={texture_1} attach="material-0" />
      <meshStandardMaterial map={texture_2} attach="material-1" />
      <meshStandardMaterial map={texture_3} attach="material-2" />
      <meshStandardMaterial map={texture_4} attach="material-3" />
      <meshStandardMaterial map={texture_5} attach="material-4" />
      <meshStandardMaterial map={texture_6} attach="material-5" />
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
      <Suspense>
        <D6 />
        <D6 />
        <D6 />
        <D6 />
        <D6 />
        <D6 />
      </Suspense>
    </Physics>
  </Canvas>
);
