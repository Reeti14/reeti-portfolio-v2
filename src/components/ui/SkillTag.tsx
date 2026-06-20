export default function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-terracotta-light/20 text-terracotta border border-terracotta-light/30 transition-colors hover:bg-terracotta-light/30">
      {label}
    </span>
  );
}
