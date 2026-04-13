import { createFileRoute, Link } from "@tanstack/react-router";

const posts: Record<string, { title: string; excerpt: string; category: string; date: string; readTime: string }> = {
  "architecture-of-autonomous-systems": {
    title: "The Architecture of Autonomous Systems",
    excerpt: "How self-organizing networks are reshaping infrastructure and emergent behavior.",
    category: "AI",
    date: "2026.04.05",
    readTime: "8 min",
  },
  "quantum-error-correction": {
    title: "Quantum Error Correction Hits 99.9%",
    excerpt: "A breakthrough at MIT brings us closer to fault-tolerant quantum computing.",
    category: "Quantum",
    date: "2026.04.03",
    readTime: "5 min",
  },
  "post-screen-era": {
    title: "Designing for the Post-Screen Era",
    excerpt: "Spatial computing demands new interaction paradigms.",
    category: "Design",
    date: "2026.04.01",
    readTime: "6 min",
  },
  "neural-interfaces-ethics": {
    title: "Neural Interfaces: Ethics at the Edge",
    excerpt: "As brain-computer interfaces mature, the philosophical questions outpace engineering.",
    category: "Ethics",
    date: "2026.03.28",
    readTime: "12 min",
  },
  "rust-in-production": {
    title: "Rust in Production: Two Years Later",
    excerpt: "We rewrote our core services in Rust. Here's the real story.",
    category: "Engineering",
    date: "2026.03.25",
    readTime: "10 min",
  },
  "rise-of-synthetic-data": {
    title: "The Rise of Synthetic Data",
    excerpt: "Why the best AI models of 2026 are trained on data that never existed.",
    category: "AI",
    date: "2026.03.22",
    readTime: "7 min",
  },
};

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = posts[params.slug];
    const title = post ? `${post.title} — NEUROFEED` : "Post Not Found — NEUROFEED";
    const description = post?.excerpt ?? "Blog post not found.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-mono text-4xl text-foreground mb-4">404</h1>
        <p className="text-muted-foreground mb-6">Transmission not found.</p>
        <Link to="/" className="font-mono text-sm text-primary hover:underline">← Return to base</Link>
      </div>
    </div>
  ),
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = posts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-mono text-4xl text-foreground mb-4">404</h1>
          <p className="text-muted-foreground mb-6">Transmission not found.</p>
          <Link to="/" className="font-mono text-sm text-primary hover:underline">← Return to base</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link to="/" className="font-mono text-xs text-primary hover:underline mb-8 inline-block">← BACK TO FEED</Link>
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-xs text-primary border border-primary/30 px-3 py-1 rounded">{post.category}</span>
          <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
          <span className="font-mono text-xs text-muted-foreground">{post.readTime}</span>
        </div>
        <h1 className="font-mono text-3xl md:text-4xl font-bold text-foreground mb-6">{post.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">{post.excerpt}</p>
        <div className="border-t border-border pt-8">
          <p className="font-mono text-sm text-muted-foreground">Full article content coming soon. This is a dispatch placeholder.</p>
        </div>
      </div>
    </div>
  );
}
