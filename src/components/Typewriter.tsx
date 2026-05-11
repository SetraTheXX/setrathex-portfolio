"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function TerminalTypewriter({
  command,
  output,
}: {
  command: string;
  output: string;
}) {
  const [text, setText] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Typing effect for command
    if (text.length < command.length) {
      timeout = setTimeout(() => {
        setText(command.slice(0, text.length + 1));
      }, 40 + Math.random() * 60); // random typing speed
    } else if (!showOutput) {
      // Pause before output
      timeout = setTimeout(() => {
        setShowOutput(true);
      }, 700);
    }

    return () => clearTimeout(timeout);
  }, [text, command, showOutput]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-[family-name:var(--font-geist-mono)] text-[13px] sm:text-sm">
      <div className="flex items-center gap-2 text-slate-300">
        <span className="text-cyan-400 font-bold">$</span>
        <span>{text}</span>
        {(!showOutput || cursorBlink) && (
          <span className="inline-block h-[15px] w-[8px] bg-emerald-400/80 -ml-1" />
        )}
      </div>
      {showOutput && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-emerald-300 flex items-center gap-2"
        >
          <span>✓</span>
          <span>{output}</span>
        </motion.div>
      )}
    </div>
  );
}
