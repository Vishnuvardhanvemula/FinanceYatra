$Content = @"
import React, { useEffect, useRef, useMemo, useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Sparkles, Environment, useProgress, Html, Grid, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion, useScroll, useSpring, useInView, useMotionValue, useTransform } from 'framer-motion';
import ErrorBoundary from '../components/ErrorBoundary';
import {
  Shield, Zap, ChevronDown, Brain, LayoutDashboard, ArrowRight,
  TrendingUp, Calculator, Umbrella, FileText, Trophy, Target, Crown, Users, Activity, Star, CheckCircle, Lock, MessageSquare
} from 'lucide-react';
import Lenis from 'https://cdn.skypack.dev/@studio-freight/lenis@1.0.29';

// --- 1. LOADING SCREEN COMPONENT ---
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#0b101b] z-50">
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-teal-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <span className="mt-4 text-teal-500 font-mono text-xs tracking-widest animate-pulse">
          INITIALIZING... {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  );
}

/**
 * UTILITY: SMOOTH SCROLL
 */
const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      gestureDirection: 'vertical',
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
};

// --- DEVICE/FEATURE DETECTION ---
const isLowEndDevice = () => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isMobile = /Mobi|Android/i.test(ua);
  const cores = navigator.hardwareConcurrency || 4;
  const highDPR = typeof window !== 'undefined' && (window.devicePixelRatio || 1) > 2;
  return isMobile || cores <= 2 || highDPR;
};

/**
 * 3D COMPONENT: ORBITING ELEMENTS (Growth & AI Context)
 */
const OrbitingElements = () => {
  const group = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Upward Arrows (Growth) */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[4, 1, -2]} rotation={[0, 0, -0.2]}>
          <coneGeometry args={[0.2, 0.8, 4]} />
          <meshStandardMaterial color="#34d399" emissive="#059669" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[-3, 2, 1]} rotation={[0, 0, 0.2]}>
          <coneGeometry args={[0.15, 0.6, 4]} />
          <meshStandardMaterial color="#34d399" emissive="#059669" emissiveIntensity={2} toneMapped={false} />
        </mesh>
      </Float>

      {/* Data Nodes (AI/Tech) */}
      <Float speed={3} rotationIntensity={2} floatIntensity={0.5}>
        <mesh position={[-4, -1, -2]}>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#60a5fa" wireframe emissive="#2563eb" emissiveIntensity={2} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={2} floatIntensity={0.5}>
        <mesh position={[3, -2, 2]}>
          <octahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#60a5fa" wireframe emissive="#2563eb" emissiveIntensity={2} />
        </mesh>
      </Float>
    </group>
  );
};

/**
 * 3D COMPONENT: EXTRUDED RUPEE SYMBOL
 */
const RupeeSymbol = ({ scrollProgress, lowEnd = false, isMobile = false }) => {
  const groupRef = useRef();

  // Geometry Construction
  const { topBarShape, bodyShape } = useMemo(() => {
    const top = new THREE.Shape();
    top.moveTo(-2.2, 0); top.lineTo(2.2, 0); top.lineTo(2.2, 0.5); top.lineTo(-2.2, 0.5);

    const body = new THREE.Shape();
    body.moveTo(-2.2, 1.0); body.lineTo(2.2, 1.0); body.lineTo(2.2, 0.5); body.lineTo(0.5, 0.5);
    body.bezierCurveTo(2.8, 0.5, 2.8, -1.8, 0.5, -1.8);
    body.lineTo(2.4, -4.0); body.lineTo(1.2, -4.0); body.lineTo(-0.4, -2.2);
    body.bezierCurveTo(1.0, -2.0, 1.2, 0.0, -2.2, 0.0);

    return { topBarShape: top, bodyShape: body };
  }, []);

  const useLow = lowEnd || isMobile;
  const extrudeSettings = useMemo(() => (
    useLow
      ? { depth: 0.3, bevelEnabled: false, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 1, curveSegments: 8 }
      : { depth: 0.6, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1, bevelSegments: 10, curveSegments: 48 }
  ), [useLow]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const progress = scrollProgress?.get() || 0;
    const time = state.clock.elapsedTime;

    // MOUSE INTERACTION (The "Look At" Effect)
    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.5;

    // SCROLL LOGIC
    // Oscillate X to avoid text collision (Right -> Left -> Right -> Left)
    const targetX = 4 * Math.cos(progress * Math.PI * 3.5);
    
    // Fix Crop: Raise base position and reduce scroll influence
    const targetY = 0.5 + Math.sin(time * 0.5) * 0.1 - (progress * 0.5);

    const targetRotX = (progress * Math.PI * 2) + (mouseY * 0.2);
    const targetRotY = (0.3 + (time * 0.1)) + (mouseX * 0.3);

    // PHYSICS
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.04);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.04);
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={isMobile ? 1.05 : (lowEnd ? 0.7 : 0.85)}>
        <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
          <extrudeGeometry args={[topBarShape, extrudeSettings]} />
          <meshPhysicalMaterial
            color="#FCD34D" // Lighter Gold
            emissive="#B45309" // Orange/Bronze Emissive
            emissiveIntensity={0.2}
            metalness={1}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
          />
        </mesh>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <extrudeGeometry args={[bodyShape, extrudeSettings]} />
          <meshPhysicalMaterial
            color="#FCD34D"
            emissive="#B45309"
            emissiveIntensity={0.2}
            metalness={1}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
          />
        </mesh>
        
        {/* Orbiting Elements now follow the Rupee */}
        <OrbitingElements />
      </group>
    </Float>
  );
};

/**
 * 3D SCENE COMPONENT
 */
const Scene = ({ scrollProgress, lowEnd = false, isMobile = false }) => {
  const compact = lowEnd || isMobile;
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 13]} fov={35} />

      {/* CINEMATIC LIGHTING */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} castShadow color="#ffecd1" />
      <pointLight position={[-10, -10, -10]} intensity={5} color="#2dd4bf" />
      <pointLight position={[0, 0, 5]} intensity={2} color="#fbbf24" distance={10} />

      <Environment preset="city" />

      {/* BACKGROUND ELEMENTS */}
      <Stars radius={100} depth={50} count={compact ? 800 : 5000} factor={compact ? 1 : 4} saturation={0} fade speed={1} />
      {!compact && <Sparkles count={100} scale={15} size={3} speed={0.4} opacity={0.5} color="#FCD34D" />}

      <group position={[0, 0, 0]}>
        <RupeeSymbol scrollProgress={scrollProgress} lowEnd={lowEnd} isMobile={isMobile} />
      </group>

      {/* Digital Floor */}
      <Grid
        position={[0, -4, 0]}
        args={[20, 20]}
        cellColor="#2dd4bf"
        sectionColor="#0f766e"
        fadeDistance={20}
        fadeStrength={1}
      />
      <ContactShadows opacity={0.4} scale={20} blur={2} far={4.5} />

      {/* POST PROCESSING */}
      {!compact && (
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.0} radius={0.6} />
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      )}
    </>
  );
};

// Lightweight SVG fallback
const RupeeFallback = ({ size = 120 }) => (
  <div className="flex items-center justify-center w-full h-full">
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="18" fill="#071026" />
      <circle cx="60" cy="50" r="38" fill="url(#g)" opacity="0.95" />
      <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fontSize="46" fill="#0b101b" fontWeight="700" fontFamily="Inter, sans-serif">₹</text>
    </svg>
  </div>
);

const HeroSection = ({ isAuthenticated, navigate }) => (
  <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-20 relative z-10 pt-20">
    <div className="max-w-[900px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-teal-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
          AI-Powered Financial Intelligence
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-8 tracking-tight">
          Master Money <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-teal-200 animate-gradient-x">
            Without Fear.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl font-light leading-relaxed">
          Your personal AI tutor that simulates real-world economies. Learn to invest, save, and grow wealth in a risk-free sandbox.
        </p>

        <div className="flex flex-col sm:flex-row gap-5">
          <button
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
            className="w-full sm:w-auto group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]"
          >
            <span className="relative flex items-center gap-2 justify-center">
              {isAuthenticated ? 'Go to Dashboard' : 'Start Learning'} <ArrowRight size={18} />
            </span>
          </button>
          <button
            onClick={() => navigate('/modules')}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-full font-medium text-lg transition-all backdrop-blur-sm"
          >
            View Modules
          </button>
        </div>
      </motion.div>
    </div>

    <motion.div
      animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
    >
      <ChevronDown size={24} />
    </motion.div>
  </section>
);

const ToolsShowcase = ({ navigate }) => (
  <section className="relative z-10 px-6 md:px-20 py-32">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Powerful Financial Tools</h2>
          <p className="text-lg text-slate-400 font-light leading-relaxed">
            Plan your future with our suite of advanced calculators. From tax planning to retirement, we've got you covered with precision tools.
          </p>
        </div>
        <button
          onClick={() => navigate('/calculators')}
          className="text-teal-400 hover:text-teal-300 flex items-center gap-2 font-medium transition-colors"
        >
          View All Tools <ArrowRight size={16} />
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {[
          { title: "SIP Calculator", desc: "Visualize wealth creation.", icon: TrendingUp, path: "/calculators/sip" },
          { title: "EMI Calculator", desc: "Plan loan repayments.", icon: Calculator, path: "/calculators/emi" },
          { title: "Tax Planner", desc: "Optimize tax savings.", icon: FileText, path: "/calculators/tax" },
          { title: "Retirement", desc: "Secure your future corpus.", icon: Umbrella, path: "/calculators/retirement" },
          { title: "Emergency Fund", desc: "Build your safety net.", icon: Shield, path: "/calculators/emergency" },
        ].map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(tool.path)}
            className="group cursor-pointer p-8 rounded-3xl bg-[#0b101b]/40 border border-white/5 hover:border-teal-500/30 hover:bg-[#0b101b]/60 backdrop-blur-sm transition-all duration-500 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-2xl bg-white/5 text-white group-hover:bg-teal-500 group-hover:text-black transition-colors duration-300">
                <tool.icon size={24} />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              {tool.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- 3D VIGNETTE: GAMIFICATION SHOWCASE ---

const GoldPedestal = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    meshRef.current.position.y = Math.sin(t * 1) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
      <octahedronGeometry args={[1.8, 0]} />
      <meshStandardMaterial
        color="#FCD34D"
        roughness={0.1}
        metalness={1}
        emissive="#B45309"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const EnergyVortex = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = -t * 0.5; // Swirling motion
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Inner Core Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Swirling Particles Layers */}
      <Sparkles
        count={200}
        scale={[7, 1, 7]}
        size={4}
        speed={2}
        opacity={0.8}
        color="#fbbf24"
        noise={1}
      />
      <Sparkles
        count={100}
        scale={[5, 2, 5]}
        size={6}
        speed={1.5}
        opacity={0.5}
        color="#ff8c00"
        noise={2}
      />
    </group>
  );
};

const FloatingBadge = ({ position, icon: Icon, label, delay, blur = false }) => {
  return (
    <Html position={position} center transform sprite>
      <motion.div
        initial={{ opacity: 0, z: -100 }}
        whileInView={{ opacity: 1, z: 0 }}
        transition={{ delay, duration: 1.5, ease: "easeOut" }}
        className={`flex flex-col items-center gap-2 ${blur ? 'blur-[2px] opacity-70' : ''}`}
      >
        <div className="w-12 h-12 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
          <Icon size={20} className="text-amber-400" />
        </div>
        <span className="text-xs font-bold text-amber-200 uppercase tracking-wider bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm border border-white/5">
          {label}
        </span>
      </motion.div>
    </Html>
  );
};

const GamificationShowcase = () => {
  return (
    <section className="relative w-full h-[800px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 12], fov: 45 }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 1, 14]} />
            <Environment preset="city" />

            {/* Lighting Hierarchy: Central Focus */}
            <ambientLight intensity={0.2} />
            <spotLight
              position={[0, 10, 0]}
              angle={0.6}
              penumbra={0.5}
              intensity={30}
              castShadow
              color="#fbbf24"
              distance={20}
            />
            <pointLight position={[0, 2, 2]} intensity={5} color="#fbbf24" distance={5} />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <GoldPedestal />
            </Float>

            <EnergyVortex />

            <Sparkles count={150} scale={15} size={3} speed={0.4} opacity={0.4} color="#FCD34D" />

            {/* Floating UI Elements in 3D Space */}

            {/* Center Top: Rank (Primary Focus) */}
            <Html position={[0, 3.5, 0]} center distanceFactor={10} zIndexRange={[100, 0]}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center"
              >
                <Crown size={64} className="text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,1)] mb-2" />
                <h3 className="text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_40px_rgba(251,191,36,0.8)]">
                  LEGENDARY
                </h3>
                <div className="text-sm font-mono text-amber-300 tracking-[0.5em] mt-2 uppercase drop-shadow-md">Current Rank</div>
              </motion.div>
            </Html>

            {/* Left Side: Headline (Blurred Background) */}
            <Html position={[-6, 0, -2]} center distanceFactor={12} className="w-[300px] text-right pointer-events-none blur-[1px] opacity-80">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 0.8, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
                  Rise to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Glory.</span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Your financial journey is a quest. Earn XP, unlock rare badges, and dominate the leaderboard.
                </p>
              </motion.div>
            </Html>

            {/* Right Side: Badges (Floating with Depth) */}
            <FloatingBadge position={[5, 1.5, 0]} icon={Trophy} label="Strategist" delay={0.4} />
            <FloatingBadge position={[6, 0, 1]} icon={Target} label="Wealth Tycoon" delay={0.6} />
            <FloatingBadge position={[5, -1.5, -1]} icon={Zap} label="Risk Manager" delay={0.8} blur={true} />

            {/* Post Processing for Depth of Field */}
            <EffectComposer>
              <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
              <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
            </EffectComposer>

          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

// --- ENHANCED FEATURE VISUALS ---

const DashboardVisual = () => (
  <div className="relative w-full h-full min-h-[250px] flex items-center justify-center p-6">
    {/* Abstract Dashboard UI */}
    <div className="w-full max-w-[340px] bg-[#0f1623] rounded-xl border border-white/10 p-4 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <div className="h-2 w-16 bg-white/10 rounded-full" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-[10px] text-gray-400 mb-1">Total Balance</div>
          <div className="text-lg font-bold text-white">₹1.2L</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-[10px] text-gray-400 mb-1">Growth</div>
          <div className="text-lg font-bold text-teal-400">+18%</div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-24 w-full bg-white/5 rounded-lg overflow-hidden p-2">
        <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
          <motion.path
            d="M0 35 Q 20 30, 40 15 T 80 20 T 100 5"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M0 35 Q 20 30, 40 15 T 80 20 T 100 5 V 40 H 0 Z"
            fill="url(#gradient-dash)"
            stroke="none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 1 }}
          />
          <defs>
            <linearGradient id="gradient-dash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Notification */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute -right-2 top-10 bg-teal-500 text-black text-[10px] font-bold px-2 py-1 rounded-l-md shadow-lg"
      >
        New High!
      </motion.div>
    </div>
  </div>
);

const AiTutorVisual = () => (
  <div className="relative w-full h-full min-h-[200px] flex flex-col justify-center gap-3 px-4">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="self-start bg-white/10 rounded-2xl rounded-tl-none px-4 py-2 text-sm text-white max-w-[80%]"
    >
      Should I invest in Gold now?
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      className="self-end bg-blue-600/20 border border-blue-500/30 rounded-2xl rounded-tr-none px-4 py-2 text-sm text-blue-100 max-w-[90%]"
    >
      <div className="flex gap-1 mb-1">
        <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
        <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-75" />
        <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-150" />
      </div>
      Gold is a good hedge against inflation. Consider allocating 5-10% of your portfolio.
    </motion.div>
  </div>
);

const SecurityVisual = () => (
  <div className="relative w-full h-full min-h-[200px] flex items-center justify-center">
    <div className="relative">
      <Shield size={90} className="text-gray-800" />

      {/* Scanning Effect */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full overflow-hidden"
      >
        <Shield size={90} className="text-teal-500 drop-shadow-[0_0_20px_rgba(45,212,191,0.6)]" />
      </motion.div>

      {/* Scan Line */}
      <motion.div
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-teal-300 shadow-[0_0_15px_#2dd4bf] z-10"
      />

      {/* Lock Icon Overlay */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0b101b] rounded-full p-3 border border-teal-500/30 shadow-xl z-20"
      >
        <Lock className="text-teal-400" size={24} />
      </motion.div>
    </div>

    {/* Verified Badge */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.8, type: "spring" }}
      className="absolute -right-6 -bottom-4 bg-[#0b101b] rounded-full p-1.5 border border-white/10 shadow-2xl"
    >
      <CheckCircle className="text-teal-400 fill-teal-400/20" size={32} />
    </motion.div>
  </div>
);

const FeatureSection = ({ align = 'left', title, subtitle, icon: Icon, description, color = 'teal', renderVisual }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  return (
    <section className={`min-h-[60vh] flex items-center ${align === 'right' ? 'justify-end' : 'justify-start'} px-6 md:px-20 relative z-10 pointer-events-none py-24`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: align === 'right' ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === 'right' ? 50 : -50 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pointer-events-auto max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* Text Content */}
        <div className={`${align === 'right' ? 'order-2' : 'order-1'}`}>
          <div className={`w-16 h-16 rounded-2xl ${color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 'bg-teal-500/10 text-teal-400'} flex items-center justify-center mb-8`}>
            <Icon size={32} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{title}</h2>
          <h3 className={`text-xl font-medium mb-6 ${color === 'blue' ? 'text-blue-400' : 'text-teal-400'}`}>{subtitle}</h3>
          <p className="text-slate-400 text-lg leading-relaxed font-light">{description}</p>
        </div>

        {/* Visual Content */}
        <div className={`${align === 'right' ? 'order-1' : 'order-2'} relative`}>
          <div className={`absolute -inset-4 rounded-[3rem] ${color === 'blue' ? 'bg-blue-500/5' : 'bg-teal-500/5'} blur-2xl opacity-0 transition-opacity duration-1000 ${isInView ? 'opacity-100' : ''}`}></div>
          <div className="relative h-[300px] rounded-[2.5rem] bg-[#0b101b]/40 border border-white/5 backdrop-blur-xl overflow-hidden flex items-center justify-center">
            {renderVisual ? renderVisual() : (
              <div className="text-white/20">Visual Placeholder</div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const CtaSection = ({ isAuthenticated, navigate }) => (
  <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 relative z-10 py-24">
    <div className="max-w-4xl">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight">
          {isAuthenticated ? (
            <>
              Continue Your Journey <br />
              <span className="text-teal-500">Keep Learning.</span>
            </>
          ) : (
            <>
              Your Wealth Journey <br />
              <span className="text-teal-500">Starts Today.</span>
            </>
          )}
        </h2>
        <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-light">
          {isAuthenticated
            ? "Ready to dive deeper? Explore more modules and enhance your financial literacy."
            : "Join 50,000+ students learning to manage their finances with our AI-driven platform."}
        </p>
        <button
          onClick={() => navigate(isAuthenticated ? '/modules' : '/signup')}
          className="w-full sm:w-auto px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_60px_rgba(255,255,255,0.2)]"
        >
          {isAuthenticated ? 'Explore Modules' : 'Create Free Account'}
        </button>
      </motion.div>
    </div>
  </section>
);

/**
 * MAIN APP
 */
export default function App() {
  useLenis();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 });
  const [lowEnd, setLowEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setLowEnd(isLowEndDevice());

    const mq = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(max-width: 640px)') : null;
    const handle = () => setIsMobile(mq ? mq.matches : (typeof window !== 'undefined' ? window.innerWidth <= 640 : false));
    handle();
    if (mq && mq.addEventListener) mq.addEventListener('change', handle);
    else if (mq && mq.addListener) mq.addListener(handle);
    window.addEventListener('resize', handle);

    const detectWebGL = () => {
      try {
        if (typeof window === 'undefined') return false;
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };
    setWebglSupported(detectWebGL());
    return () => {
      if (mq && mq.removeEventListener) mq.removeEventListener('change', handle);
      else if (mq && mq.removeListener) mq.removeListener(handle);
      window.removeEventListener('resize', handle);
    };
  }, []);

  return (
    <div className="relative w-full bg-[#0b101b] overflow-hidden selection:bg-teal-500/30 font-sans">
      {/* 3D Canvas Layer */}
      <div className={`fixed top-0 left-0 w-full ${isMobile ? 'h-[50vh]' : 'h-screen'} z-0`}>
        <ErrorBoundary>
          {webglSupported ? (
            <Canvas
              gl={{ antialias: false, toneMappingExposure: 1.5 }}
              dpr={lowEnd || isMobile ? [1, 1] : [1, 2]}
            >
              <Suspense fallback={<Loader />}>
                <Scene scrollProgress={smoothProgress} lowEnd={lowEnd} isMobile={isMobile} />
              </Suspense>
            </Canvas>
          ) : (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-b from-[#071026] to-transparent`}>
              <RupeeFallback size={isMobile ? 96 : 140} />
            </div>
          )}
        </ErrorBoundary>
      </div>

      {/* UI Layer */}
      <main className="relative w-full">
        <HeroSection isAuthenticated={isAuthenticated} navigate={navigate} />

        <FeatureSection
          align="right"
          title="The Dashboard"
          subtitle="Financial Command Center"
          icon={LayoutDashboard}
          description="Forget cluttered spreadsheets. Our AI-driven dashboard unifies your learning progress, simulated portfolio, and personalized roadmap into one sleek interface."
          renderVisual={() => <DashboardVisual />}
        />

        <ToolsShowcase navigate={navigate} />

        <FeatureSection
          align="left"
          title="AI Tutor"
          subtitle="Learn by Simulation"
          icon={Brain}
          color="blue"
          description="Don't just read about finance—experience it. Our AI Tutor creates risk-free scenarios tailored to the Indian economy, helping you master concepts before spending a rupee."
          renderVisual={() => <AiTutorVisual />}
        />

        <GamificationShowcase />

        <FeatureSection
          align="right"
          title="Security First"
          subtitle="Bank-Grade Encryption"
          icon={Shield}
          description="We don't ask for your bank passwords. We operate in a sandbox environment, ensuring your learning journey is safe, private, and completely risk-free."
          renderVisual={() => <SecurityVisual />}
        />

        <CtaSection isAuthenticated={isAuthenticated} navigate={navigate} />
      </main>
    </div>
  );
}
"@

Set-Content -Path "d:\projects\Finance tutor\frontend\src\pages\HomePage.jsx" -Value $Content -Encoding UTF8
