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

const overlayContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.25,
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
    x: 80,
    opacity: 0,
    filter: "blur(10px)",
  },

  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",

    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    x: 50,
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
      duration: 0.7,
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

  useEffect(
    () =>
      scrollY.on("change", (v) => {
        setScrolled(v > 60);
      }),

    [scrollY]
  );

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
      {/* LEFT LOGO */}
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

      {/* MENU BUTTON */}
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
          whileHover={{
            scale: scrolled ? 0.93 : 1.05,
          }}
          whileTap={{
            scale: 0.94,
          }}
          className={`${pillBase} px-4 py-2.5 sm:px-5 sm:py-3`}
        >
          <span className="font-['Poppins'] text-[10px] font-medium uppercase tracking-[0.35em] text-black/75 sm:text-xs">
            Menu
          </span>

          <div className="flex flex-col gap-[5px]">
            <span className="block h-px w-4 rounded-full bg-black/55" />
            <span className="ml-auto block h-px w-2.5 rounded-full bg-black/55" />
          </div>
        </motion.button>
      </motion.div>

      {/* OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="nav-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100]"
          >
            {/* BACKGROUND */}
            <motion.div
              variants={panelVariants}
              className="absolute inset-0 bg-[#0f0d0c]"
            />

            {/* GLOWS */}
            <div className="absolute right-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-orange-400/10 blur-[120px]" />

            <div className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-orange-300/5 blur-[120px]" />

            {/* CONTENT */}
            <div className="relative z-10 flex h-full flex-col px-6 py-6 sm:px-10 md:px-14 lg:px-20 lg:py-10">

              {/* TOP */}
              <div className="flex items-center justify-between">

                {/* LOGO */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{
                    delay: 0.25,
                    duration: 0.6,
                  }}
                  className="flex items-center gap-4"
                >
                  <img
                    src="/melologo.png"
                    alt="Melo"
                    className="h-5 brightness-110"
                  />

                  <div>
                    <p className="font-['Poppins'] text-[11px] uppercase tracking-[0.42em] text-white/90">
                      Melo
                    </p>

                    <p className="mt-1 font-['Inter'] text-[10px] tracking-[0.25em] text-white/28">
                      Emotional AI
                    </p>
                  </div>
                </motion.div>

                {/* CLOSE */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{
                    delay: 0.25,
                    duration: 0.6,
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.94,
                  }}
                  className="flex items-center gap-3 rounded-full border border-white/10 px-5 py-3"
                >
                  <span className="font-['Poppins'] text-[10px] uppercase tracking-[0.35em] text-white/45">
                    Close
                  </span>

                  <div className="relative h-3 w-3">
                    <span className="absolute inset-0 my-auto h-px rotate-45 bg-white/45" />
                    <span className="absolute inset-0 my-auto h-px -rotate-45 bg-white/45" />
                  </div>
                </motion.button>
              </div>

              {/* MAIN */}
              <div className="flex flex-1 items-center overflow-y-auto py-6">

                <div className="grid w-full grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr]">

                  {/* LEFT SIDE */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{
                      delay: 0.35,
                      duration: 0.8,
                    }}
                    className="hidden lg:flex lg:flex-col lg:justify-between"
                  >
                    <div>
                      <p className="font-['Poppins'] text-[11px] uppercase tracking-[0.45em] text-orange-200/50">
                        Emotional Intelligence
                      </p>

                      <h2 className="mt-8 max-w-md font-['Poppins'] text-[3.5rem] font-light leading-[1.05] tracking-[-0.05em] text-white">
                        Technology that
                        <span className="text-orange-200"> understands </span>
                        human emotions.
                      </h2>

                      <p className="mt-8 max-w-sm font-['Inter'] text-sm leading-8 text-white/35">
                        Melo creates a calming digital experience through AI,
                        thoughtful design, and emotionally aware interactions.
                      </p>
                    </div>

                    {/* SOCIALS */}
                    <div className="flex gap-8">
                      {SOCIALS.map((s) => (
                        <a
                          key={s}
                          href="#"
                          className="font-['Poppins'] text-[10px] uppercase tracking-[0.35em] text-white/28 transition-colors duration-300 hover:text-orange-200/70"
                        >
                          {s}
                        </a>
                      ))}
                    </div>
                  </motion.div>

                  {/* RIGHT NAV */}
                  <motion.nav
                    variants={overlayContainer}
                    className="flex items-center"
                  >
                    <ul className="w-full">
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
                            className="group flex items-end border-b border-white/[0.06] py-3 md:py-4 lg:py-5"
                          >
                            {/* NUMBER */}
                            <div className="mr-6 hidden md:block">
                              <span className="font-['Poppins'] text-[11px] uppercase tracking-[0.45em] text-white/18">
                                0{i + 1}
                              </span>
                            </div>

                            {/* LINK */}
                            <motion.span
                              animate={{
                                x: hovered === i ? 14 : 0,

                                color:
                                  hovered === i
                                    ? "rgba(255,255,255,0.98)"
                                    : "rgba(255,255,255,0.68)",
                              }}
                              transition={{
                                duration: 0.35,
                              }}
                              className="
                                font-['Poppins']
                                font-light
                                leading-[0.9]
                                tracking-[-0.05em]

                                text-[2.4rem]
                                sm:text-[3.2rem]
                                md:text-[4.2rem]
                                lg:text-[5rem]
                                xl:text-[5.8rem]
                                2xl:text-[6.2rem]
                              "
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
                              }}
                              className="ml-5 mb-3 text-orange-300"
                              style={{
                                fontSize: "clamp(1.2rem,2vw,2rem)",
                              }}
                            >
                              →
                            </motion.span>
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.nav>
                </div>
              </div>

              {/* MOBILE FOOTER */}
              <div className="mt-auto flex flex-col gap-5 lg:hidden">
                <p className="max-w-xs font-['Inter'] text-xs leading-7 text-white/28">
                  A calming space for emotional wellness,
                  guided by thoughtful AI.
                </p>

                <div className="flex gap-6">
                  {SOCIALS.map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="font-['Poppins'] text-[10px] uppercase tracking-[0.35em] text-white/28"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}