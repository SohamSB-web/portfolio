"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { Wireframe } from "@react-three/drei";

function BlueprintMesh() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Rotating slightly based on time and mouse pointer coordinates
    const targetX = (state.pointer.y * Math.PI) / 4;
    const targetY = (state.pointer.x * Math.PI) / 4;

    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.05;
    
    // Constant slow rotation
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 2]} />
      <meshBasicMaterial color="#00F2FE" wireframe transparent opacity={0.6} />
      <Wireframe
        thickness={0.05}
        fillOpacity={0}
        strokeOpacity={0.8}
        color="#4FACFE"
      />
    </mesh>
  );
}

export default function Hero() {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Check mobile dimension to disable 3D on small screens
    const checkMobile = () => setIsDesktop(window.innerWidth >= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const ctx = gsap.context(() => {
      // Staggered entrance for the text lines
      // Delaying so the preloader can finish its intro
      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 2.8,
      });
    }, textContainerRef);

    return () => {
      window.removeEventListener('resize', checkMobile);
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center px-8 md:px-16 overflow-hidden">
      <div 
        ref={textContainerRef}
        className="relative z-10 flex flex-col items-start justify-center max-w-3xl w-full"
      >
        <span className="hero-text font-mono text-accent-tech-primary mb-4 text-sm md:text-base tracking-wider uppercase">
          Initialization Complete
        </span>
        <h1 className="hero-text font-sans text-5xl md:text-8xl font-black text-text-primary leading-tight mb-2">
          John Doe
        </h1>
        <h2 className="hero-text font-sans text-2xl md:text-4xl text-text-secondary font-medium mb-8">
          Full-Stack Engineer & Interaction Designer
        </h2>
        <p className="hero-text font-sans text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
          I build high-performance web applications that seamlessly blend robust technical architecture with organic, artistic experiences.
        </p>
      </div>

      {isDesktop && (
        <div className="absolute top-0 right-0 w-1/2 h-full z-0 pointer-events-auto">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <BlueprintMesh />
          </Canvas>
        </div>
      )}
    </section>
  );
}
