import React, { useEffect, useRef, useMemo, useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Float, PerspectiveCamera, Stars, Sparkles, Environment, useProgress, Html } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion, useScroll, useSpring, useInView, useTransform } from 'framer-motion';
import ErrorBoundary from '../components/ErrorBoundary';
import { Shield, Zap, ChevronDown, Menu, X, Brain, LayoutDashboard, GraduationCap, ArrowRight, TrendingUp, Lock } from 'lucide-react';
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
        <span className="mt-4 text-teal-500 font-mono text-sm animate-pulse">
          {progress.toFixed(0)}% GENERATING ECONOMY...
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
 * 3D COMPONENT: EXTRUDED RUPEE SYMBOL
 */
const RupeeSymbol = ({ scrollProgress, lowEnd = false, isMobile = false }) => {
  const groupRef = useRef();
  const materialRef = useRef();

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
    // We lerp the mouse position to avoid jitter
    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.5;

    // SCROLL LOGIC
    // 1. Position: Drifts from right to left, then centers
    const targetX = 3.5 - (progress * 5);
    const targetY = Math.sin(time * 0.5) * 0.1 - (progress * 1);

    // 2. Rotation: Tumbles + looks at mouse
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
      {/* Moving sparkles reacting to time (disabled on low-end or mobile devices) */}
      {!compact && <Sparkles count={100} scale={15} size={3} speed={0.4} opacity={0.5} color="#FCD34D" />}

      <group position={[0, 0, 0]}>
        <RupeeSymbol scrollProgress={scrollProgress} lowEnd={lowEnd} isMobile={isMobile} />
      </group>

      {/* POST PROCESSING - THE "GLOW UP" */}
      {/* Fancy post-processing - disabled on low-end devices */}
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

// Lightweight SVG fallback for environments without WebGL
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

/**
 * UI COMPONENT: GLASS CARD
 */
const GlassCard = ({ children, className = "", active = false }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className={`
      relative p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500
      ${active
        ? "bg-teal-900/20 border-teal-500/50 shadow-[0_0_50px_rgba(20,184,166,0.2)]"
        : "bg-slate-900/40 border-white/10 hover:border-teal-500/30 hover:bg-slate-900/60 shadow-xl"
      }
      ${className}
    `}
  >
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none"></div>
    {children}
  </motion.div>
);

/**
 * UI SECTIONS
 */
// Page-level Navbar removed — global MainNavbar renders app-wide.

const HeroSection = ({ isAuthenticated, navigate }) => (
  <section className="min-h-[60vh] md:min-h-screen flex flex-col justify-center px-6 md:px-20 relative z-10 pt-20">
    <div className="max-w-[800px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-950/30 border border-teal-500/30 text-teal-300 text-[11px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
          <span className="text-teal-300" aria-hidden>✨</span>
          AI-Powered Financial Literacy
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-[0.95] mb-8 tracking-tight">
          Master Money <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-teal-400 to-emerald-400 animate-gradient-x">
            Without Fear.
          </span>
        </h1>

        <p className="text-xl text-gray-400 mb-4 max-w-xl font-light leading-relaxed">
          Your personal AI tutor that simulates real-world economies. Learn to invest, save, and grow wealth in a risk-free sandbox.
        </p>
        <p className="text-teal-300 text-base sm:text-lg font-medium mb-6 max-w-xl">
          Empowering your journey from saving to wealth creation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')}
            className="w-full sm:w-auto group relative px-8 py-4 bg-teal-500 text-[#0b101b] rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(20,184,166,0.4)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative flex items-center gap-2">
              {isAuthenticated ? 'Go to Dashboard' : 'Start Learning'} <ArrowRight size={20} />
            </span>
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-lg transition-all backdrop-blur-md">
            View Demo
          </button>
        </div>
      </motion.div>
    </div>

    <motion.div
      animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
    >
      <ChevronDown size={24} />
    </motion.div>
  </section>
);

const FeatureSection = ({ align = 'left', title, subtitle, icon: Icon, description, color = 'teal' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  return (
    <section className={`min-h-[60vh] md:min-h-screen flex items-center ${align === 'right' ? 'justify-end' : 'justify-start'} px-6 md:px-20 relative z-10 pointer-events-none`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: align === 'right' ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === 'right' ? 50 : -50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-auto max-w-xl w-full"
      >
        <GlassCard active={isInView}>
          <div className={`w-14 h-14 rounded-2xl ${color === 'blue' ? 'bg-blue-500/20 text-blue-400' : 'bg-teal-500/20 text-teal-400'} flex items-center justify-center mb-8`}>
            <Icon size={28} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
          <h3 className={`text-2xl font-semibold mb-6 ${color === 'blue' ? 'text-blue-400' : 'text-teal-400'}`}>{subtitle}</h3>
          <p className="text-gray-400 text-lg leading-relaxed">{description}</p>

          {/* Interactive Mock Data viz */}
          <div className="mt-8 flex gap-4">
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '75%' } : { width: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className={`h-full ${color === 'blue' ? 'bg-blue-500' : 'bg-teal-500'}`}
              />
            </div>
            <div className="text-xs font-mono text-gray-500">ANALYSIS COMPLETED</div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
};

const CtaSection = ({ isAuthenticated, navigate }) => (
  <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative z-10">
    <div className="max-w-4xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
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
        <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
          {isAuthenticated 
            ? "Ready to dive deeper? Explore more modules and enhance your financial literacy." 
            : "Join 50,000+ students learning to manage their finances with our AI-driven platform."}
        </p>
        <button 
          onClick={() => navigate(isAuthenticated ? '/modules' : '/signup')}
          className="w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_60px_rgba(20,184,166,0.4)]"
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
    // Detect WebGL support; if unavailable we'll show a lightweight SVG fallback
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
      {/* 3D Canvas Layer (hidden on small screens to improve mobile performance) */}
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
            // WebGL not available: show lightweight SVG rupee fallback centered in the same area
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-b from-[#071026] to-transparent`}>
              <RupeeFallback size={isMobile ? 96 : 140} />
            </div>
          )}
        </ErrorBoundary>
      </div>

      {/* UI Layer - `MainNavbar` is rendered by `App.jsx` layout. */}

      <main className="relative w-full">
        <HeroSection isAuthenticated={isAuthenticated} navigate={navigate} />

        <FeatureSection
          align="right"
          title="The Dashboard"
          subtitle="Financial Command Center"
          icon={LayoutDashboard}
          description="Forget cluttered spreadsheets. Our AI-driven dashboard unifies your learning progress, simulated portfolio, and personalized roadmap into one sleek interface."
        />

        <FeatureSection
          align="left"
          title="AI Tutor"
          subtitle="Learn by Simulation"
          icon={Brain}
          color="blue"
          description="Don't just read about finance—experience it. Our AI Tutor creates risk-free scenarios tailored to the Indian economy, helping you master concepts before spending a rupee."
        />

        <FeatureSection
          align="right"
          title="Security First"
          subtitle="Bank-Grade Encryption"
          icon={Shield}
          description="We don't ask for your bank passwords. We operate in a sandbox environment, ensuring your learning journey is safe, private, and completely risk-free."
        />

        <CtaSection isAuthenticated={isAuthenticated} navigate={navigate} />

        {/* Footer Spacer (smaller on mobile) */}
        <div className="h-12 sm:h-20 flex items-center justify-center text-gray-500 text-xs sm:text-sm border-t border-white/5 relative z-10 bg-[#0b101b] px-4">
          <span className="truncate">© 2024 FinanceYatra. Built for the Future.</span>
        </div>
      </main>
    </div>
  );
}