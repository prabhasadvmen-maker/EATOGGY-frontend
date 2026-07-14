import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, OrbitControls } from '@react-three/drei';
import { Box3, Vector3 } from 'three';

function TiffinModel() {
  const { scene } = useGLTF('/lunch_box_food_tiffin_carrier.glb');
  const meshRef = useRef();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (scene && !initializedRef.current) {
      initializedRef.current = true;

      // Reset scene transforms to identity to ensure pure bounding box measurements
      scene.scale.set(1, 1, 1);
      scene.position.set(0, 0, 0);
      scene.rotation.set(0, 0, 0);
      scene.updateMatrixWorld(true);

      // Calculate bounding box of the loaded scene
      const box = new Box3().setFromObject(scene);
      const size = new Vector3();
      box.getSize(size);
      
      // Calculate scaling factor to normalize model size in viewport
      const maxDimension = Math.max(size.x, size.y, size.z);
      const targetUnitSize = 2.4; // Well-proportioned scale
      const scaleFactor = targetUnitSize / maxDimension;
      
      scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
      
      // Re-center model relative to its bounding box
      const center = new Vector3();
      box.getCenter(center);
      scene.position.set(
        -center.x * scaleFactor, 
        -center.y * scaleFactor, 
        -center.z * scaleFactor
      );

      // Overwrite materials to create a bright polished steel/silver color finish
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            // Remove the dark diffuse texture map to expose the bright underlying material color
            child.map = null; // Also clear parent map reference if any
            child.material.map = null;
            child.material.color.set('#f1f5f9'); // Bright satin-silver steel color
            child.material.metalness = 0.3;     // Brushed metal finish to react to lights without black reflections
            child.material.roughness = 0.45;    // Satin reflection diffusing the spotlight highlights
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);

  useFrame(({ clock, pointer }) => {
    if (meshRef.current) {
      // Smoothly interpolate rotation based on mouse pointer coordinates (360-degree rotation view)
      const targetY = clock.elapsedTime * 0.15 + pointer.x * 2.0;
      const targetX = pointer.y * 0.6;
      
      // Linear interpolation (lerp) for buttery smooth mouse movement
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.08;
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.08;
      
      // Smooth floating hover animation on the group Y axis
      meshRef.current.position.y = Math.sin(clock.elapsedTime * 1.2) * 0.12;
    }
  });

  return (
    <group ref={meshRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/lunch_box_food_tiffin_carrier.glb');

export default function TiffinCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.0], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={Math.min(window.devicePixelRatio, 1.5)}
      frameloop="always"
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1.8} />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#FF6B35" />
      <pointLight position={[0, 5, 3]} intensity={1.2} color="#FFF8F2" />
      <TiffinModel />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
