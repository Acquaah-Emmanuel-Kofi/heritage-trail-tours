"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export function FadeIn({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  );
}
