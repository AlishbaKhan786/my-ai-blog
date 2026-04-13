import { motion } from "framer-motion";

export function AuthorSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="py-16"
    >
      <div className="mb-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          System Operator
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="glass-card mx-auto max-w-3xl overflow-hidden">
        <div className="flex flex-col items-center gap-8 p-8 md:flex-row md:items-start">
          {/* Avatar placeholder */}
          <div className="relative shrink-0">
            <div className="h-32 w-32 rounded-full border-2 border-primary/30 bg-surface flex items-center justify-center overflow-hidden">
              <div className="flex flex-col items-center gap-1">
                <div className="h-8 w-8 rounded-full bg-primary/20" />
                <div className="h-10 w-16 rounded-t-full bg-primary/15" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-background bg-primary shadow-[0_0_10px_var(--color-primary)]" />
            <div className="absolute inset-0 rounded-full shadow-[0_0_30px_var(--color-primary)/10%]" />
          </div>

          {/* Bio */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="font-mono text-xs text-primary uppercase tracking-wider">Online</span>
            </div>

            <h2 className="mb-1 font-mono text-2xl font-bold text-foreground tracking-tight">
              [Your Name]
            </h2>
            <p className="mb-4 font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Researcher · Developer · Digital Architect
            </p>

            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              A passionate technologist exploring the intersection of artificial intelligence, 
              systems architecture, and human-computer interaction. Currently researching 
              emergent behaviors in autonomous networks and their implications for 
              next-generation digital infrastructure.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              When not debugging neural networks, you'll find me writing about the ethical 
              dimensions of technology and the future of human cognition in a post-digital world.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
              {["AI/ML", "Systems Design", "Ethics", "Rust", "Quantum Computing"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
