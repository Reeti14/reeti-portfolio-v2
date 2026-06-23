"use client";

export default function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-block px-3 py-1.5 text-xs font-mono font-medium bg-sage/10 text-sage-dark rounded-full border border-sage-light/20 hover:bg-sage/20 hover:scale-105 hover:shadow-sm transition-all duration-200 cursor-default">
      {label}
    </span>
  );
}
