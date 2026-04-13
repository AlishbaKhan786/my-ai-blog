import { motion } from "framer-motion";

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  imageUrl?: string;
}

export function BlogCard({ title, excerpt, category, date, readTime, featured, imageUrl }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className={`neon-card group cursor-pointer overflow-hidden ${featured ? "row-span-2" : ""}`}
    >
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      )}
      <div className="p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
            {category}
          </span>
          <span className="text-xs text-muted-foreground">{readTime}</span>
        </div>
        <h3 className={`mb-2 font-mono font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary ${featured ? "text-2xl" : "text-lg"}`}>
          {title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {excerpt}
        </p>
        <div className="flex items-center justify-between">
          <time className="font-mono text-xs text-muted-foreground">{date}</time>
          <span className="font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
            READ →
          </span>
        </div>
      </div>
    </motion.article>
  );
}
