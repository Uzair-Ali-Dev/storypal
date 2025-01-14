"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { BackgroundLines } from "@/components/ui/background-lines";

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section id="home" className="min-h-screen bg-black2">
      <BackgroundLines className="h-screen flex items-center justify-center w-full px-4 bg-black2">
        <motion.div
          className="max-w-2xl z-50 flex flex-col justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-8xl font-bold text-white mb-6 text-center"
            variants={itemVariants}
          >
            Where Stories Come
            <motion.span
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent ml-2 bg-clip-text"
              animate={{
                backgroundPosition: ["0%", "100%"],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            >
              Alive
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg md:text-xl mb-8 text-center"
            variants={itemVariants}
          >
            Unleash your creativity and join a community of storytellers.
            Create, share, and discover captivating stories that inspire and
            connect.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <Link href="/login">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Start Writing Now
              </motion.button>
            </Link>

            <Link href="/login">
              <motion.button
                className="px-8 py-4 border border-purple-500 text-purple-500 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition duration-300"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Explore Stories
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </BackgroundLines>
    </section>
  );
}

export default Hero;
