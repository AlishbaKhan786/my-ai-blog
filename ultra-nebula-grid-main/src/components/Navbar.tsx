import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Home, User, FileText, Mail } from "lucide-react";

const navItems = [
  { label: "Home", to: "/" as const, icon: Home },
  { label: "About", to: "/about" as const, icon: User },
  { label: "Blog", to: "/blog" as const, icon: FileText },
  { label: "Contact", to: "/contact" as const, icon: Mail },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-8 left-1/2 z-40 -translate-x-1/2">
      {/* Desktop HUD */}
      <div className="hidden md:flex items-center gap-1 rounded-2xl border border-primary/20 bg-background/40 px-2 py-2 backdrop-blur-2xl shadow-[0_0_30px_var(--color-primary)/8%,inset_0_1px_0_oklch(1_0_0/6%)]">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                active
                  ? "bg-primary/15 text-primary shadow-[0_0_12px_var(--color-primary)/20%]"
                  : "text-muted-foreground hover:text-primary hover:bg-surface"
              }`}
            >
              <Icon size={14} strokeWidth={active ? 2.5 : 1.5} />
              {item.label}
              {active && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
              )}
            </Link>
          );
        })}

        <div className="mx-1 h-6 w-px bg-border" />

        <button className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-primary transition-all hover:bg-primary/20 hover:shadow-[0_0_20px_var(--color-primary)/15%]">
          Subscribe
        </button>
      </div>

      {/* Mobile HUD */}
      <div className="flex md:hidden items-center gap-2 rounded-2xl border border-primary/20 bg-background/40 px-3 py-2 backdrop-blur-2xl shadow-[0_0_30px_var(--color-primary)/8%]">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
          <span className="font-mono text-sm font-bold tracking-widest text-foreground">NF</span>
        </Link>

        <div className="flex-1" />

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-5 bg-primary transition-transform ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-primary transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-primary transition-transform ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="mt-2 md:hidden rounded-2xl border border-primary/20 bg-background/80 backdrop-blur-2xl p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${
                  location.pathname === item.to
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-surface"
                }`}
              >
                <Icon size={14} />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
