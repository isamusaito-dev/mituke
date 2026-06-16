interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const pct = (current / total) * 100;
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex-1 h-1 rounded-full bg-[var(--line)] overflow-hidden">
        <div
          className="h-full rounded-full bg-[var(--green)] transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-[var(--muted)] font-light tabular-nums shrink-0">
        {current}/{total}
      </span>
    </div>
  );
}
