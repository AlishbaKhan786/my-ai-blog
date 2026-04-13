import { motion } from "framer-motion";
import { RobotHead } from "@/components/RobotHead";

export function BlogHeader() {
  return (
    <header className="relative border-b border-border pb-8 pt-20 overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px]">
        {/* Left — Baby Bot */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[500px] lg:h-[600px]"
        >
          <RobotHead />
        </motion.div>

        {/* Right — Mission Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 w-fit">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
              Transmitting
            </span>
          </div>

          <h1 className="font-mono text-5xl font-black tracking-tighter md:text-7xl">
            <span className="glow-text">NEURO</span>
            <span className="text-foreground">FEED</span>
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
            Dispatches from the frontier of technology, design, and artificial intelligence.
          </p>

          <div className="mt-4 rounded-2xl border border-primary/20 bg-surface/50 backdrop-blur-xl p-6 max-w-lg">
            <h2 className="font-mono text-lg font-bold tracking-wider text-primary mb-3">
              SYNTHETIC INTELLIGENCE. REAL REPORTING.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In a world drowning in artificial noise, we are the filter.{" "}
              <span className="text-primary font-semibold">NEUROFEED</span> dispatches
              from the AI frontier, explained with journalistic integrity. Join digital
              correspondent{" "}
              <span className="text-foreground font-medium">Alishba Khan</span> on a
              data-driven dispatch into tomorrow.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
    </header>
  );
}
