"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "home" },
  { path: "/experience", label: "experience" },
  { path: "/projects", label: "projects" },
  { path: "/open-source", label: "open-source" },
  { path: "/contact", label: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-14 px-4 md:px-8 bg-cream border-b border-sage-light/30 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-terracotta/80" />
        <div className="w-3 h-3 rounded-full bg-sage/80" />
        <div className="w-3 h-3 rounded-full bg-warm-brown/30" />
      </div>

      <div className="hidden md:flex items-center gap-6 font-mono text-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className="relative px-2 py-1 transition-colors hover:text-sage-dark group"
            >
              <span className={`relative z-10 ${isActive ? "text-sage-dark font-medium" : "text-text-muted"}`}>
                C:\REETI\{item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-sage-light/20 rounded-md z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="md:hidden flex items-center font-mono text-sm text-sage-dark font-medium">
        C:\REETI\{navItems.find(item => item.path === pathname)?.label || 'home'}
      </div>
    </nav>
  );
}
