
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export function ZoomGlobe() {
  const [isHovered, setIsHovered] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const mapImage = PlaceHolderImages.find(img => img.id === "aerial-map");

  useEffect(() => {
    if (!mountRef.current) return;
    
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    // Create Globe
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      color: 0x8B5E3C,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    camera.position.z = 5;
    
    let animationId: number;
    const animate = () => {
      globe.rotation.y += 0.005;
      globe.rotation.x += 0.002;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();
    
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      className="relative w-full h-[500px] mt-20 cursor-pointer overflow-hidden bg-card/10 border border-white/5 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-700 group-hover:opacity-100">
        <div ref={mountRef} className="w-full h-full" />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ scale: 0.1, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 2, opacity: 0, filter: "blur(40px)" }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-background"
          >
            <div className="relative w-full h-full overflow-hidden">
               {mapImage && (
                 <Image 
                    src={mapImage.imageUrl}
                    alt="Address Map"
                    fill
                    className="object-cover scale-110"
                    data-ai-hint="aerial view map"
                 />
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
               <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                 <motion.div
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.6 }}
                   className="space-y-4"
                 >
                    <h4 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tighter text-white">
                      Торговая улица, 185
                    </h4>
                    <p className="text-primary font-bold uppercase tracking-[0.4em] text-xs">
                      Наш главный офис в Элин-Юрт
                    </p>
                 </motion.div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground animate-pulse">
            {isHovered ? "Локация определена" : "Наведите для масштабирования"}
          </span>
        </div>
      </div>
    </div>
  );
}
