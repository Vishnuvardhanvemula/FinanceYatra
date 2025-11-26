import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sparkles, Stars } from '@react-three/drei';
import * as random from 'maath/random';
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Globe,
  Zap,
  BarChart3,
  PieChart,
  ChevronRight,
  Play,
  Mouse,
  Calculator,
  FileText,
  Umbrella
} from 'lucide-react';

// --- Utility Components ---

const MagneticButton = React.memo(({ children, className, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
});

const SpotlightCard = React.memo(({ children, className = "" }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
});

// --- 3D Components ---

function InteractiveParticles(props) {
  const ref = useRef();
  const { mouse, viewport } = useThree();
  const [sphere] = useState(() => random.inSphere(new Float32Array(3000), { radius: 1.8 }));

  useFrame((state, delta) => {
    // Rotate the entire group
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;

    // Subtle mouse interaction (parallax)
    const x = (mouse.x * viewport.width) / 50;
    const y = (mouse.y * viewport.height) / 50;
    ref.current.position.x += (x - ref.current.position.x) * 0.05;
    ref.current.position.y += (y - ref.current.position.y) * 0.05;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#fbbf24" // Gold/Amber
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
          blending={2} // Additive blending
        />
      </Points>
    </group>
  );
}

const HeroScene = React.memo(() => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <InteractiveParticles />
        <Sparkles count={50} scale={3} size={2} speed={0.3} opacity={0.4} color="#fff" />
      </Canvas>
    </div>
  );
});

// --- Main Component ---

export default function HomePage2() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Text Reveal Animation Variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9], // Luxury curve
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  const headline = "Financial Intelligence,";
  const words = headline.split(" ");

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-amber-500/30 selection:text-amber-100">

      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <HeroScene />

        {/* Cinematic Vignette & Gradients */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/5 rounded-full blur-[150px]" />

        {/* Aurora Glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-amber-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse-slow" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">

            {/* Headline */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium leading-normal tracking-tighter">
                {words.map((word, index) => (
                  <motion.span
                    variants={child}
                    key={index}
                    className="inline-block mr-4 last:mr-0 py-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40"
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                <motion.span
                  variants={child}
                  className="inline-block font-serif italic tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400"
                >
                  Evolved.
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
            >
              Your personal AI tutor that simulates real-world economies. Learn to invest, save, and grow wealth in a risk-free sandbox.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/signup">
                <MagneticButton className="group relative px-10 py-5 bg-white text-black rounded-full font-medium text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gray-200">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Learning
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </MagneticButton>
              </Link>

              <Link to="/modules">
                <MagneticButton className="group px-10 py-5 rounded-full border border-white/10 text-white font-medium text-sm tracking-widest uppercase hover:bg-white/5 transition-all duration-300 backdrop-blur-sm">
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-3 h-3 fill-current" />
                    </span>
                    View Modules
                  </span>
                </MagneticButton>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="p-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <Mouse className="w-4 h-4 text-white/50 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Tools Showcase (Bento Grid) */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-medium mb-6 tracking-tight">
                Precision Tools for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">Modern Investors.</span>
              </h2>
              <p className="text-gray-400 font-light leading-relaxed text-lg max-w-xl">
                Plan your future with our suite of advanced calculators. From tax planning to retirement, we've got you covered.
              </p>
            </div>
            <Link to="/calculators" className="group flex items-center gap-2 text-sm text-white uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-all">
              Explore all tools
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[350px]">

            {/* Large Card - SIP Calculator */}
            <div className="md:col-span-4">
              <Link to="/calculators/sip" className="block h-full">
                <SpotlightCard className="h-full p-10 flex flex-col justify-between group cursor-pointer">
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                      <TrendingUp className="w-6 h-6 text-amber-200" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-3xl font-medium text-white mb-4 tracking-tight">SIP Calculator</h3>
                    <p className="text-gray-400 text-base leading-relaxed font-light max-w-md">
                      Visualize wealth creation with precision. Calculate returns on your systematic investments and plan for long-term growth.
                    </p>
                  </div>
                  <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-tl-[100px] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                </SpotlightCard>
              </Link>
            </div>

            {/* Tall Card - Tax Planner */}
            <div className="md:col-span-2 md:row-span-2">
              <Link to="/calculators/tax" className="block h-full">
                <SpotlightCard className="h-full p-10 flex flex-col group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <FileText className="w-6 h-6 text-amber-200" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-medium text-white mb-4 tracking-tight">Tax Planner</h3>
                  <p className="text-gray-400 text-base leading-relaxed font-light mb-8">
                    Optimize tax savings and plan efficiently. Navigate the complexities of tax regimes with our smart planner.
                  </p>
                  <div className="mt-auto relative h-48 w-full bg-white/[0.02] rounded-xl overflow-hidden border border-white/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-amber-500/20 rounded-full blur-2xl animate-pulse" />
                    </div>
                    {/* Mock Graph */}
                    <svg className="absolute bottom-0 left-0 w-full h-24 stroke-amber-500/50 fill-none" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <path d="M0 40 Q 20 35, 40 20 T 100 5" strokeWidth="2" />
                      <path d="M0 40 L 100 40 L 100 5 L 0 40" className="fill-amber-500/5 stroke-none" />
                    </svg>
                  </div>
                </SpotlightCard>
              </Link>
            </div>

            {/* Medium Card - EMI Calculator */}
            <div className="md:col-span-2">
              <Link to="/calculators/emi" className="block h-full">
                <SpotlightCard className="h-full p-10 flex flex-col justify-between group cursor-pointer">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Calculator className="w-6 h-6 text-amber-200" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">EMI Calculator</h3>
                    <p className="text-gray-400 text-sm font-light">Plan loan repayments smart and easy.</p>
                  </div>
                </SpotlightCard>
              </Link>
            </div>

            {/* Medium Card - Retirement */}
            <div className="md:col-span-2">
              <Link to="/calculators/retirement" className="block h-full">
                <SpotlightCard className="h-full p-10 flex flex-col justify-between group cursor-pointer">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Umbrella className="w-6 h-6 text-amber-200" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">Retirement</h3>
                    <p className="text-gray-400 text-sm font-light">Secure your future corpus today.</p>
                  </div>
                </SpotlightCard>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center p-12 md:p-32 rounded-[3rem] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.05] relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-amber-500/10 to-transparent opacity-50 pointer-events-none blur-3xl" />

            <h2 className="text-5xl md:text-7xl font-medium mb-8 tracking-tighter relative z-10">
              Ready to elevate your <br /> financial intelligence?
            </h2>
            <p className="text-xl text-gray-400 mb-12 font-light max-w-xl mx-auto relative z-10">
              Join a community of forward-thinking investors building their future today.
            </p>
            <div className="relative z-10">
              <Link to="/signup">
                <MagneticButton className="px-12 py-6 bg-white text-black rounded-full font-medium text-lg tracking-widest uppercase hover:scale-105 transition-transform duration-300 shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]">
                  Get Started Now
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
