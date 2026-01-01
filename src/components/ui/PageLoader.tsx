import { memo } from "react";
import { motion } from "framer-motion";

function PageLoaderComponent() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Silver Logo/Ring */}
        <motion.div
          className="relative w-20 h-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4"
            style={{
              borderColor: "var(--color-primary-light)",
              borderTopColor: "var(--color-primary)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Inner pulsing ring */}
          <motion.div
            className="absolute inset-3 rounded-full"
            style={{ backgroundColor: "var(--color-primary-light)" }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Center 925 badge */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-accent)",
              }}
            >
              925
            </span>
          </motion.div>
        </motion.div>

        {/* Brand text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2
            className="text-xl tracking-[0.15em]"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-primary)",
            }}
          >
            925sterlingvibes
          </h2>
          <p
            className="text-xs mt-1 tracking-wider"
            style={{ color: "var(--color-accent)" }}
          >
            Pure Silver • Trusted Quality
          </p>
          <motion.div
            className="mt-3 h-0.5 mx-auto"
            style={{ backgroundColor: "var(--color-primary)" }}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>

        {/* Loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "var(--color-primary)" }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const PageLoader = memo(PageLoaderComponent);
