import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { ScanLine } from "@/components/ScanLine";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — NEUROFEED" },
      { name: "description", content: "Get in touch with the NEUROFEED team." },
    ],
  }),
});

function ContactPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="noise-overlay" />
      <ScanLine />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-4xl px-6 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Open Channel</span>
          </div>

          <h1 className="mb-8 font-mono text-4xl font-black tracking-tighter md:text-5xl">
            <span className="glow-text">Contact</span> <span className="text-foreground">Terminal</span>
          </h1>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="glass-card p-8">
              <h2 className="font-mono text-lg font-bold text-foreground mb-4">// Send Transmission</h2>
              <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-muted-foreground uppercase tracking-wider">Identifier</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-muted-foreground uppercase tracking-wider">Frequency</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-muted-foreground uppercase tracking-wider">Message Payload</label>
                  <textarea
                    rows={4}
                    placeholder="Enter your message..."
                    className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none resize-none"
                  />
                </div>
                <button className="w-full rounded-lg border border-primary/50 bg-primary/10 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary/20">
                  Transmit →
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="glass-card p-8">
                <h2 className="font-mono text-lg font-bold text-foreground mb-4">// Direct Channels</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span><strong className="text-foreground">Email:</strong> operator@neurofeed.io</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span><strong className="text-foreground">Location:</strong> Node 7, Digital Sector 4</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span><strong className="text-foreground">Response Time:</strong> &lt; 24 cycles</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-8">
                <h2 className="font-mono text-lg font-bold text-foreground mb-4">// Availability</h2>
                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Sunt in culpa qui officia deserunt mollit anim id est laborum. 
                  Available for research collaborations, speaking engagements, and advisory roles.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 border-t border-border py-12 text-center">
        <p className="font-mono text-xs text-muted-foreground tracking-widest">© 2026 NEUROFEED — ALL SYSTEMS NOMINAL</p>
      </footer>
    </div>
  );
}
