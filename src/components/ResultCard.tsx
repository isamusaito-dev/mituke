import type { AxisResult } from '../lib/scoring';

interface Props {
  result: AxisResult;
  isWeakest: boolean;
}

const LEVEL = {
  high: { color: 'var(--green)', label: '強み', icon: 'check' },
  mid: { color: 'var(--navy)', label: '改善の余地', icon: 'arrow' },
  low: { color: 'var(--warn)', label: '要改善', icon: 'warn' },
} as const;

export default function ResultCard({ result, isWeakest }: Props) {
  const lv = LEVEL[result.level];
  const feedback = result.feedback.replace(/^⚠\s*/, '');

  return (
    <div
      className={`rounded-2xl overflow-hidden border bg-[var(--paper)] ${
        isWeakest ? 'border-[var(--warn)] shadow-sm' : 'border-[var(--line)]'
      }`}
    >
      {/* ===== データ部（スコア） ===== */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[var(--navy)]">{result.axis}</h3>
            {isWeakest && (
              <span className="text-[10px] font-bold text-white bg-[var(--warn)] px-2 py-0.5 rounded-full">
                最優先
              </span>
            )}
          </div>
          <span className="font-bold tabular-nums" style={{ color: lv.color }}>
            <span className="text-2xl">{result.score}</span>
            <span className="text-xs text-[var(--muted)] ml-0.5">/100</span>
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${result.score}%`, backgroundColor: lv.color }}
          />
        </div>
      </div>

      {/* ===== コメント部（説明） — テイストを分ける ===== */}
      <div className="px-5 py-4 bg-[var(--cream)] border-t border-[var(--line)]">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span
            className="inline-flex items-center justify-center w-4 h-4 rounded-full text-white text-[9px] shrink-0"
            style={{ backgroundColor: lv.color }}
          >
            {lv.icon === 'check' ? '✓' : lv.icon === 'warn' ? '!' : '→'}
          </span>
          <span className="text-[11px] font-bold tracking-wide" style={{ color: lv.color }}>
            {lv.label}
          </span>
        </div>
        <p className="text-[13px] text-[var(--muted)] leading-relaxed">{feedback}</p>
      </div>
    </div>
  );
}
