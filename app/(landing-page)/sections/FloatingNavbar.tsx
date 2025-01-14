"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { INavLink } from "@/types/links";

export const FloatingNavbar = ({
  navItems,
  className,
}: {
  navItems: INavLink[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (direction < 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  return (
    <div className="hidden lg:flex flex-row gap-4 items-center justify-center ">
      <motion.div
        initial={{
          scale: 0, // Scale down both horizontally and vertically
          opacity: 0, // Start fully transparent
          filter: "blur(10px)", // Start with a blur
        }}
        animate={{
          scale: visible ? 1 : 0, // Expand to full size or collapse
          opacity: visible ? 1 : 0, // Fade in or out
          filter: visible ? "blur(0px)" : "blur(10px)", // Remove blur when visible
        }}
        exit={{
          scale: 0, // Collapse back both horizontally and vertically
          opacity: 0, // Fade out
          filter: "blur(10px)", // Add blur during collapse
        }}
        transition={{
          duration: 0.4, // Adjust duration for smoothness
          ease: "easeInOut",
        }}
        className="container bg-black flex items-center justify-between fixed top-10 py-4 px-8 z-[100] border-zinc-800 border-[1px] rounded-2xl"
      >
        <div className="flex flex-1 justify-start items-center text-2xl text-white font-extrabold">
          <span className="text-white ">Story</span>Pal
        </div>

        <div
          className={cn(
            "flex flex-1 rounded-2xl px-8  items-center justify-center space-x-8 ",
            className
          )}
        >
          {navItems.map(
            (navItem: INavLink, idx: number) =>
              !navItem.showOnMobile && (
                <Link
                  key={`link=${idx}`}
                  href={navItem.link}
                  className={cn(
                    " text-neutral-50 hover:text-neutral-300  transition-all items-center flex space-x-1 p-4"
                  )}
                >
                  <span className="text-base whitespace-nowrap">
                    {navItem.name}
                  </span>
                </Link>
              )
          )}
        </div>

        <div className="flex flex-1 justify-end items-center">
          <Link href="/login">
            <Button size={"lg"} variant={"outline"}>
              Login
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
