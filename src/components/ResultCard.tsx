import type { AxisResult } from '../lib/scoring';

interface Props {
  result: AxisResult;
  isWeakest: boolean;
}

export default function ResultCard({ result, isWeakest }: Props) {
  const levelColor = {
    high: 'text-[var(--green)]',
    mid: 'text-[var(--ink)]',
    low: 'text-[var(--terracotta)]',
  }[result.level];

  return (
    <div
      className={`p-5 rounded-xl border transition-all ${
        isWeakest
          ? 'border-[var(--terracotta)] bg-[var(--terracotta)]/5'
          : 'border-[var(--line)] bg-[var(--paper)]'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isWeakest && (
            <span className="text-[10px] font-medium text-[var(--terracotta)] bg-[var(--terracotta)]/10 px-2 py-0.5 rounded-full">
              最大のボトルネック
            </span>
          )}
          <h3 className="text-sm font-serif font-semibold text-[var(--ink)]">
            {result.axis}
          </h3>
        </div>
        <span className={`text-lg font-cormorant font-medium tabular-nums ${levelColor}`}>
          {result.score}
          <span className="text-xs text-[var(--muted)] ml-0.5">/100</span>
        </span>
      </div>
      {/* score bar */}
      <div className="h-1 rounded-full bg-[var(--line)] mb-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${result.score}%`,
            backgroundColor: isWeakest ? 'var(--terracotta)' : 'var(--green)',
          }}
        />
      </div>
      <p className="text-sm text-[var(--muted)] leading-relaxed">{result.feedback}</p>
    </div>
  );
}
