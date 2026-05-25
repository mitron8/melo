"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { useEffect, useRef, useState } from "react";

import Lenis from "lenis";

const TOTAL_FRAMES = 480;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 80,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  const [images, setImages] = useState([]);

  // =========================================
  // LENIS
  // =========================================
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // =========================================
  // SCROLL
  // =========================================
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    mass: 0.5,
  });

  const frameIndex = useTransform(
    smoothProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  // =========================================
  // TEXT ANIMATIONS
  // =========================================
  const introOpacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.3],
    [1, 1, 0]
  );

  const aboutOpacity = useTransform(
    smoothProgress,
    [0.28, 0.42, 0.55],
    [0, 1, 0]
  );

  const skillOpacity = useTransform(
    smoothProgress,
    [0.5, 0.65, 0.78],
    [0, 1, 0]
  );

  const contactOpacity = useTransform(
    smoothProgress,
    [0.72, 0.84, 0.95],
    [0, 1, 1]
  );

  const introY = useTransform(smoothProgress, [0, 0.3], [0, -120]);
  const aboutY = useTransform(smoothProgress, [0.25, 0.5], [100, 0]);
  const skillY = useTransform(smoothProgress, [0.45, 0.7], [100, 0]);
  const contactY = useTransform(smoothProgress, [0.72, 0.95], [100, 0]);
  const introScale = useTransform(smoothProgress, [0, 0.3], [1, 1.08]);

  // =========================================
  // LOAD IMAGES
  // =========================================
  useEffect(() => {
    const loadedImages = [];

    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = `./Images/${i}.webp`;
      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, []);

  // =========================================
  // RENDER FRAME
  // =========================================
  const render = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const img = images[index];
    if (!img) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imageAspect = img.width / img.height;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, x, y;

    if (imageAspect > canvasAspect) {
      drawHeight = canvasHeight;
      drawWidth = drawHeight * imageAspect;
      x = (canvasWidth - drawWidth) / 2;
      y = 0;
    } else {
      drawWidth = canvasWidth;
      drawHeight = drawWidth / imageAspect;
      x = 0;
      y = (canvasHeight - drawHeight) / 2;
    }

    context.drawImage(img, x, y, drawWidth, drawHeight);
  };

  // =========================================
  // SCROLL TO FRAME
  // =========================================
  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(() => {
      render(Math.floor(latest));
    });
  });

  // =========================================
  // FIRST FRAME
  // =========================================
  useEffect(() => {
    if (images.length > 0) {
      images[0].onload = () => {
        render(0);
      };
    }
  }, [images]);

  // =========================================
  // RESIZE
  // =========================================
  useEffect(() => {
    const canvas = canvasRef.current;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(0);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [images]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[700vh] overflow-hidden bg-black font-['Poppins']"
    >
      {/* ========================================= */}
      {/* FIXED CANVAS */}
      {/* ========================================= */}
      <div className="fixed inset-0">
        <canvas ref={canvasRef} className="h-full w-full" />

        {/* HERO OVERLAY */}
        <motion.div
          style={{
            opacity: useTransform(
              smoothProgress,
              [0, 0.32, 0.42],
              [1, 1, 0]
            ),
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-orange-200/70 via-orange-300/70 to-orange-500/20" />
        </motion.div>

        {/* MELO JOURNEY OVERLAY */}
        <motion.div
          style={{
            opacity: useTransform(
              smoothProgress,
              [0.32, 0.45, 0.55],
              [0, 1, 1]
            ),
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/40 to-white/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,180,80,0.18),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,140,40,0.15),transparent_35%)]" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* AMBIENT LIGHTS */}
        <motion.div
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[10%] h-72 w-72 rounded-full bg-orange-300/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] h-96 w-96 rounded-full bg-orange-200/10 blur-3xl"
        />
      </div>

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}
      <div className="absolute inset-0 z-20 overflow-hidden">

        {/* ── HERO ─────────────────────────────── */}
        <motion.div
          style={{ opacity: introOpacity, y: introY, scale: introScale }}
          className="absolute left-1/2 top-[7%] w-full max-w-7xl -translate-x-1/2 px-5 sm:px-8 lg:px-6"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">

            {/* Label */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
              className="text-center lg:col-span-2 lg:text-left"
            >
              <p className="text-[10px] uppercase tracking-[0.5em] text-black/50 sm:text-xs">
                MeloWorld
              </p>
            </motion.div>

            {/* Headline */}
            <div className="lg:col-span-7">
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                className="
                  text-center text-[2.6rem] font-light leading-[0.92] tracking-[-0.05em] text-black
                  sm:text-6xl
                  md:text-[5.5rem]
                  lg:text-left lg:text-[8rem]
                "
              >
                Melo gently
                <br />
                <span className="ml-0 sm:ml-6 md:ml-10 lg:ml-12 text-white">
                  guides
                </span>{" "}
                you through
                <br />
                emotional
                <br />
                clarity.
              </motion.h1>
            </div>

            {/* Body copy */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              className="flex justify-center lg:col-span-3 lg:items-start lg:justify-start lg:pt-28"
            >
              <p className="max-w-sm text-center font-['Inter'] text-sm leading-[2] text-black/70 sm:text-base lg:text-left">
                A calming AI companion designed to help you slow down, breathe
                deeply, process emotions, and rediscover mental peace through
                immersive therapeutic experiences.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── ABOUT ────────────────────────────── */}
        <motion.div
          style={{ opacity: aboutOpacity, y: aboutY }}
          className="absolute left-1/2 top-[44%] w-full max-w-7xl -translate-x-1/2 px-5 sm:px-8 lg:px-6"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">

            {/* Meta column */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-center lg:col-span-4 lg:text-left"
            >
              <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-black/60 sm:text-xs">
                Emotional Intelligence
              </p>
              <div className="space-y-4">
                <div className="mx-auto h-px w-32 bg-black/10 lg:mx-0 lg:w-full" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 sm:text-xs">
                  Therapy • Mindfulness • AI
                </p>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="lg:col-span-5">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="
                  text-center text-[2.4rem] font-light leading-[0.92] tracking-[-0.05em] text-black
                  sm:text-5xl
                  md:text-6xl
                  lg:text-left lg:text-7xl
                "
              >
                Every emotion
                <br />
                deserves to
                <br />
                feel
                <span className="ml-3 text-white">heard.</span>
              </motion.h2>
            </div>

            {/* Body copy */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="flex justify-center lg:col-span-3 lg:items-end lg:justify-start"
            >
              <p className="max-w-sm text-center font-['Inter'] text-sm leading-[2] text-black/70 sm:text-base lg:text-left">
                Built as a futuristic emotional companion, Melo helps users
                navigate stress, anxiety, mindfulness, emotional reflection, and
                personal growth through calming experiences.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── FEATURES ─────────────────────────── */}
        <motion.div
          style={{ opacity: skillOpacity, y: skillY }}
          className="absolute left-1/2 top-[58%] w-full max-w-7xl -translate-x-1/2 px-5 sm:px-8 lg:px-6"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">

            {/* Label */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-center lg:col-span-3 lg:text-left"
            >
              <p className="text-[10px] uppercase tracking-[0.5em] text-white/70 sm:text-xs">
                What Melo Offers
              </p>
            </motion.div>

            {/* Feature grid */}
            <div className="lg:col-span-9">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {[
                  "Guided Emotional Support",
                  "AI Therapy Sessions",
                  "Mindfulness Experiences",
                  "Stress & Anxiety Relief",
                  "Mood Tracking Journey",
                  "Personal Healing Space",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    whileHover={{ x: 10 }}
                    className="group border-b border-white/10 pb-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-light text-white transition-all duration-500 group-hover:text-orange-200 sm:text-2xl md:text-3xl lg:text-4xl">
                        {item}
                      </h3>
                      <span className="shrink-0 text-xs text-white/30 sm:text-sm">
                        0{index + 1}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CTA ──────────────────────────────── */}
        <motion.div
          style={{ opacity: contactOpacity, y: contactY }}
          className="absolute bottom-[5%] left-1/2 w-full max-w-7xl -translate-x-1/2 px-4 sm:px-6"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 px-6 py-12 sm:rounded-[3rem] sm:px-10 sm:py-16 md:px-16 md:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,170,80,0.18),transparent_55%)]" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="mb-4 text-[10px] uppercase tracking-[0.45em] text-orange-200/70 sm:mb-5 md:text-xs"
              >
                Your Journey Starts Here
              </motion.p>

              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="
                  max-w-4xl text-[2.2rem] font-light leading-[0.95] tracking-[-0.05em] text-white
                  sm:text-5xl
                  md:text-6xl
                  lg:max-w-5xl lg:text-[6rem]
                "
              >
                Melo walks beside
                <br />
                you through stress,
                <br />
                healing &
                <span className="ml-2 text-orange-200 sm:ml-3">growth.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="mt-6 max-w-xl font-['Inter'] text-sm leading-[2] text-white/65 sm:mt-8 sm:max-w-2xl md:text-lg"
              >
                Experience a calmer digital space where emotional wellness feels
                natural, immersive, and deeply human through thoughtful AI
                guided therapy experiences.
              </motion.p>

              <motion.button
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 rounded-full border border-orange-200/20 bg-orange-200 px-8 py-4 text-[10px] uppercase tracking-[0.35em] text-black transition-all duration-500 hover:bg-white sm:mt-10 sm:px-10 sm:py-5 sm:text-xs"
              >
                Enter MeloWorld
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}