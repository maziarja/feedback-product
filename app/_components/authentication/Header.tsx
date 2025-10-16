"use client";

import { motion } from "motion/react";

type HeaderProps = {
  children: React.ReactNode;
};

function Header({ children }: HeaderProps) {
  return (
    <div className="relative h-50 w-full max-w-3xl overflow-hidden rounded-t-lg">
      <div className="h-25">
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute -top-20 -right-20 h-50 w-50 rounded-full bg-orange-300/30 md:-top-20 md:right-0"
        ></motion.div>
      </div>
      <p className="ml-7.5 bg-linear-to-r from-white to-orange-300 bg-clip-text py-1 text-5xl font-bold tracking-wide text-transparent">
        {children}
      </p>
      <motion.div
        initial={{ x: -160 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-17 left-7 h-32 w-32 rounded-full bg-orange-300/30"
      ></motion.div>
    </div>
  );
}

export default Header;
