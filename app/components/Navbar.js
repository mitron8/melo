"use client";

import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#", sub: "Start here" },
  { label: "About", href: "#", sub: "Our story" },
  { label: "Features", href: "#", sub: "What we do" },
  { label: "Contact", href: "#", sub: "Say hello" },
];

const SOCIALS = ["Twitter", "Instagram", "LinkedIn"];

// =========================================
// STAGGER
// =========================================
const overlayContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.3,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const linkItem = {
  hidden: {
    x: -80,
    opacity: 0,
    filter: "blur(10px)",
  },

  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",

    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    x: -50,
    opacity: 0,
    filter: "blur(6px)",

    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const panelVariants = {
  hidden: {
    clipPath: "inset(0 0 0 100%)",
  },

  visible: {
    clipPath: "inset(0 0 0 0%)",

    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    clipPath: "inset(0 0 0 100%)",

    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [hovered, setHovered] = useState(null);

  const { scrollY } = useScroll();

  // =========================================
  // SCROLL
  // =========================================
  useEffect(
    () =>
      scrollY.on("change", (v) => {
        setScrolled(v > 60);
      }),

    [scrollY]
  );

  // =========================================
  // LOCK BODY
  // =========================================
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const pillBase =
    "flex items-center gap-2.5 rounded-full border border-black/10 bg-white/70 backdrop-blur-md cursor-pointer";

  return (
    <>
      {/* ========================================= */}
      {/* LEFT PILL */}
      {/* ========================================= */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed left-5 top-5 z-50 sm:left-8 sm:top-6"
      >
        <motion.div
          animate={{
            scale: scrolled ? 0.9 : 1,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className={`${pillBase} px-4 py-2.5 sm:px-5 sm:py-3`}
        >
          <img
            className="h-4"
            src="/melologo.png"
            alt="Melo Logo"
          />

          <span className="font-['Poppins'] text-[10px] font-medium uppercase tracking-[0.35em] text-black/75 sm:text-xs">
            Melo
          </span>
        </motion.div>
      </motion.div>

      {/* ========================================= */}
      {/* RIGHT PILL */}
      {/* ========================================= */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed right-5 top-5 z-50 sm:right-8 sm:top-6"
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          animate={{
            scale: scrolled ? 0.9 : 1,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          whileHover={{
            scale: scrolled ? 0.93 : 1.05,
            borderColor: "rgba(0,0,0,0.18)",
          }}
          whileTap={{
            scale: 0.94,
          }}
          aria-label="Open menu"
          className={`${pillBase} px-4 py-2.5 sm:px-5 sm:py-3`}
        >
          <span className="font-['Poppins'] text-[10px] font-medium uppercase tracking-[0.35em] text-black/75 sm:text-xs">
            Menu
          </span>

          {/* MENU ICON */}
          <div className="flex flex-col gap-[5px]">
            <motion.span
              className="block h-px rounded-full bg-black/55"
              style={{ width: 16 }}
            />

            <motion.span
              className="ml-auto block h-px rounded-full bg-black/55"
              style={{ width: 10 }}
            />
          </div>
        </motion.button>
      </motion.div>

      {/* ========================================= */}
      {/* FULLSCREEN OVERLAY */}
      {/* ========================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="nav-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100]"
          >
            {/* PANEL */}
            <motion.div
              variants={panelVariants}
              className="absolute inset-0 bg-[#100e0c]"
            />

            {/* GLOWS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
              }}
              className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-orange-400/10 blur-[110px]"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: 0.55,
                duration: 0.8,
              }}
              className="pointer-events-none absolute -bottom-20 -left-20 h-[320px] w-[320px] rounded-full bg-orange-300/6 blur-[90px]"
            />

            {/* VERTICAL LINE */}
            <motion.div
              initial={{
                scaleY: 0,
                opacity: 0,
              }}
              animate={{
                scaleY: 1,
                opacity: 1,
              }}
              exit={{
                scaleY: 0,
                opacity: 0,
              }}
              transition={{
                delay: 0.45,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ originY: 0 }}
              className="absolute bottom-10 left-[16%] top-10 hidden w-px bg-white/5 lg:block"
            />

            {/* ========================================= */}
            {/* CONTENT */}
            {/* ========================================= */}
            <div className="relative z-10 flex h-full flex-col px-5 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 lg:px-20 lg:py-12">

              {/* ========================================= */}
              {/* TOP ROW */}
              {/* ========================================= */}
              <div className="flex items-center justify-between">

                {/* PREMIUM LOGO */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{
                    delay: 0.35,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex items-center gap-4"
                >
                  {/* GLOW */}
                  <div className="absolute -left-6 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-orange-400/10 blur-3xl transition-all duration-700 group-hover:bg-orange-300/20" />

                  {/* GLASS PILL */}
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      borderColor: "rgba(255,255,255,0.12)",
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-3 backdrop-blur-xl"
                  >
                  

                    {/* LOGO */}
                    <div className="relative z-10 flex items-center gap-3">
                      <img
                        src="/melologo.png"
                        alt="Melo Logo"
                        className="h-5 w-auto object-contain brightness-110"
                      />

                      <div className="flex flex-col">
                        <span className="font-['Poppins'] text-[11px] uppercase tracking-[0.42em] text-white/90">
                          Melo
                        </span>

                        <span className="font-['Inter'] text-[10px] tracking-[0.25em] text-white/28">
                          Emotional AI
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* CLOSE BUTTON */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{
                    delay: 0.35,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                  whileTap={{
                    scale: 0.94,
                  }}
                  aria-label="Close menu"
                  className="flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2.5 sm:px-5 sm:py-3"
                >
                  <span className="font-['Poppins'] text-[10px] font-medium uppercase tracking-[0.35em] text-white/45 sm:text-xs">
                    Close
                  </span>

                  <div className="relative h-3 w-3">
                    <span className="absolute inset-0 m-auto block h-px w-full rotate-45 rounded-full bg-white/45" />

                    <span className="absolute inset-0 m-auto block h-px w-full -rotate-45 rounded-full bg-white/45" />
                  </div>
                </motion.button>
              </div>

              {/* ========================================= */}
              {/* NAVIGATION */}
              {/* ========================================= */}
              <motion.nav
                variants={overlayContainer}
                className="mt-auto flex flex-col justify-end pb-2 pt-8"
                aria-label="Main navigation"
              >
                <ul className="space-y-0">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.label}
                      variants={linkItem}
                    >
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        className="group flex items-end gap-4 border-b border-white/[0.06] py-4 sm:py-5 md:py-6"
                      >
                        {/* LEFT */}
                        <div className="mb-1 flex flex-col items-start gap-0.5 sm:mb-2">
                          <span className="font-['Poppins'] text-[9px] uppercase tracking-[0.45em] text-white/20 transition-colors duration-400 group-hover:text-orange-300/50 sm:text-[10px]">
                            0{i + 1}
                          </span>

                          <span className="hidden font-['Inter'] text-[10px] text-white/20 transition-colors duration-400 group-hover:text-white/35 sm:block sm:text-xs">
                            {link.sub}
                          </span>
                        </div>

                        {/* MAIN LINK */}
                        <motion.span
                          animate={{
                            x: hovered === i ? 14 : 0,

                            color:
                              hovered === i
                                ? "rgba(255,255,255,0.95)"
                                : "rgba(255,255,255,0.65)",
                          }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="font-['Poppins'] text-[2.6rem] font-light leading-none tracking-[-0.04em] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem]"
                        >
                          {link.label}
                        </motion.span>

                        {/* ARROW */}
                        <motion.span
                          animate={{
                            opacity: hovered === i ? 1 : 0,
                            x: hovered === i ? 0 : -12,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="mb-2 ml-2 text-orange-300 sm:mb-3 sm:ml-4"
                          style={{
                            fontSize:
                              "clamp(1.1rem, 2.5vw, 2rem)",
                          }}
                          aria-hidden="true"
                        >
                          →
                        </motion.span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>

              {/* ========================================= */}
              {/* BOTTOM */}
              {/* ========================================= */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 16,
                }}
                transition={{
                  delay: 0.7,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-end sm:justify-between"
              >
                <p className="max-w-[220px] font-['Inter'] text-[11px] leading-[1.9] text-white/22 sm:max-w-xs sm:text-xs">
                  A calming space for emotional wellness,
                  <br />
                  guided by thoughtful AI.
                </p>

                <div className="flex items-center gap-5 sm:gap-7">
                  {SOCIALS.map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="font-['Poppins'] text-[9px] uppercase tracking-[0.35em] text-white/28 transition-colors duration-300 hover:text-orange-200/65 sm:text-[10px]"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}