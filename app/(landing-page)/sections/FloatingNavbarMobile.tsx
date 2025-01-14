"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { INavLink } from "@/types/links";
import { Menu } from "lucide-react";

function FloatingNavbarMobile({ navItems }: { navItems: INavLink[] }) {
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
      className="lg:hidden flex justify-between items-center w-full fixed top-0 py-8 px-6 z-[100] bg-black2 border-zinc-800 border-b-[1px] "
    >
      <div className="flex flex-1 justify-start items-center text-xl  font-extrabold">
        <span className="text-white ">StoryPal</span>
      </div>

      <div className="flex justify-center items-center">
        <NavigationSideBar navItems={navItems} />
      </div>
    </motion.div>
  );
}

export default FloatingNavbarMobile;

function NavigationSideBar({ navItems }: { navItems: INavLink[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="inline-flex">
          <Menu className="text-white text-xl" />
        </button>
      </SheetTrigger>
      <SheetContent className="border-0 z-[5000] w-full h-screen overflow-y-auto bg-black2">
        <SheetTitle></SheetTitle>
        {/* Scrollable sidebar */}
        <nav className="flex flex-col items-center py-8 ">
          <ul className="grid grid-cols-2 gap-10 p-8 w-full">
            {navItems.map(({ name, link, icon: Icon }) => (
              <SheetClose key={name} asChild>
                <Link href={link}>
                  <li
                    className="flex flex-col justify-center items-center font-bold text-sm gap-2 border-b-[6px] border-secondary active:border-b-[1px] transition-all
                  text-secondary text-center w-full bg-gray-900 aspect-square rounded-2xl"
                  >
                    {Icon && <Icon className="text-3xl text-primary" />}
                    <p className="text-white font-normal text-base ">{name}</p>
                  </li>
                </Link>
              </SheetClose>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
