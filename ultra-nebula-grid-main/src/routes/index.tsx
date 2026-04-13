import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { BlogHeader } from "@/components/BlogHeader";
import { AuthorSection } from "@/components/AuthorSection";
import { ScanLine } from "@/components/ScanLine";
import { ScrollTiltGrid } from "@/components/ScrollTiltGrid";
import { NeonTicker } from "@/components/NeonTicker";
import { BlogCard } from "@/components/BlogCard";

const posts = [
  { title: "The Architecture of Autonomous Systems", excerpt: "How self-organizing networks are reshaping infrastructure and emergent behavior.", category: "AI", date: "2026.04.05", readTime: "8 min", slug: "architecture-of-autonomous-systems", featured: true },
  { title: "Quantum Error Correction Hits 99.9%", excerpt: "A breakthrough at MIT brings us closer to fault-tolerant quantum computing.", category: "Quantum", date: "2026.04.03", readTime: "5 min", slug: "quantum-error-correction" },
  { title: "Designing for the Post-Screen Era", excerpt: "Spatial computing demands new interaction paradigms.", category: "Design", date: "2026.04.01", readTime: "6 min", slug: "post-screen-era" },
  { title: "Neural Interfaces: Ethics at the Edge", excerpt: "As brain-computer interfaces mature, the philosophical questions outpace engineering.", category: "Ethics", date: "2026.03.28", readTime: "12 min", slug: "neural-interfaces-ethics" },
  { title: "Rust in Production: Two Years Later", excerpt: "We rewrote our core services in Rust. Here's the real story.", category: "Engineering", date: "2026.03.25", readTime: "10 min", slug: "rust-in-production" },
  { title: "The Rise of Synthetic Data", excerpt: "Why the best AI models of 2026 are trained on data that never existed.", category: "AI", date: "2026.03.22", readTime: "7 min", slug: "rise-of-synthetic-data" },
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NEUROFEED — Future Tech Blog" },
      { name: "description", content: "Dispatches from the frontier of technology, design, and artificial intelligence." },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="noise-overlay" />
      <ScrollTiltGrid />
      <ScanLine />
      <NeonTicker />

      <Navbar />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pt-24">
        <BlogHeader />

        <AuthorSection />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="py-16"
        >
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Latest Transmissions
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className="block">
                <BlogCard
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.category}
                  date={post.date}
                  readTime={post.readTime}
                  featured={post.featured}
                />
              </Link>
            ))}
          </div>
        </motion.section>

        <footer className="border-t border-border py-12 text-center">
          <p className="font-mono text-xs text-muted-foreground tracking-widest">
            © 2026 NEUROFEED — ALL SYSTEMS NOMINAL
          </p>
        </footer>
      </main>
    </div>
  );
}
