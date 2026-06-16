import { useState } from 'react';
import type { Question } from '../data/questions';

interface Props {
  question: Question;
  onAnswer: (score: number) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export default function QuestionCard({ question, onAnswer, onBack, canGoBack }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleSelect(score: number) {
    if (selected !== null) return;
    setSelected(score);
    setTimeout(() => {
      onAnswer(score);
      setSelected(null);
    }, 400);
  }

  return (
    <div className="animate-slide-in">
      <p className="text-xs text-[var(--terracotta)] font-medium tracking-widest uppercase mb-3">
        {question.axis}
      </p>
      <h2 className="text-lg md:text-xl font-serif font-semibold text-[var(--ink)] leading-relaxed mb-6">
        {question.text}
      </h2>
      <div className="flex flex-col gap-3">
        {question.choices.map((choice) => {
          const isSelected = selected === choice.score;
          return (
            <button
              key={choice.score}
              onClick={() => handleSelect(choice.score)}
              disabled={selected !== null}
              className={`
                w-full text-left px-5 py-4 rounded-xl border text-sm leading-snug
                transition-all duration-200 min-h-[48px]
                ${isSelected
                  ? 'border-[var(--green)] bg-[var(--green)]/5 scale-[1.01] text-[var(--green)] font-medium'
                  : 'border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--green)]/50 hover:bg-[var(--green)]/3 active:scale-[0.99]'
                }
                disabled:cursor-default
              `}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
      {canGoBack && (
        <button
          onClick={onBack}
          className="mt-6 text-xs text-[var(--muted)] hover:text-[var(--ink)] transition-colors underline underline-offset-2"
        >
          ← 前の質問に戻る
        </button>
      )}
    </div>
  );
}
