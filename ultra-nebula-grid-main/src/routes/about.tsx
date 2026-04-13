import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ScanLine } from "@/components/ScanLine";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — NEUROFEED" },
      { name: "description", content: "Learn about the NEUROFEED project and its mission." },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="noise-overlay" />
      <ScanLine />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-4xl px-6 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">System Profile</span>
          </div>

          <h1 className="mb-8 font-mono text-4xl font-black tracking-tighter md:text-5xl">
            <span className="glow-text">About</span> <span className="text-foreground">NEUROFEED</span>
          </h1>

          <div className="glass-card p-8 mb-8">
            <h2 className="font-mono text-lg font-bold text-foreground mb-4">// Mission Statement</h2>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. 
              Cras vehicula, mi eget laoreet varius, libero enim interdum magna, at pulvinar lectus eros nec sapien.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
            </p>
          </div>

          <div className="glass-card p-8 mb-8">
            <h2 className="font-mono text-lg font-bold text-foreground mb-4">// Core Objectives</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Explore emerging paradigms in artificial intelligence and autonomous systems architecture.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Document breakthroughs in quantum computing, neural interfaces, and spatial computing.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Foster critical discourse on the ethical implications of next-generation technologies.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Build a community of researchers, engineers, and thought leaders at the frontier.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8">
            <h2 className="font-mono text-lg font-bold text-foreground mb-4">// Technical Foundation</h2>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur 
              magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
              sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 border-t border-border py-12 text-center">
        <p className="font-mono text-xs text-muted-foreground tracking-widest">© 2026 NEUROFEED — ALL SYSTEMS NOMINAL</p>
      </footer>
    </div>
  );
}
