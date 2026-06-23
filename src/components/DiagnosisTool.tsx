import { useState } from 'react';
import { questions } from '../data/questions';
import { calcResult, type DiagnosisResult } from '../lib/scoring';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import RadarChart from './RadarChart';
import ResultCard from './ResultCard';
import LeadForm from './LeadForm';

type Phase = 'quiz' | 'result';

export default function DiagnosisTool() {
  const [phase, setPhase] = useState<Phase>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const total = questions.length;
  const current = questions[currentIndex];

  function handleAnswer(score: number) {
    const newAnswers = [...answers.slice(0, currentIndex), score];
    setAnswers(newAnswers);

    if (currentIndex + 1 < total) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const res = calcResult(newAnswers);
      setResult(res);
      setPhase('result');
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  if (phase === 'result' && result) {
    return (
      <div className="animate-fade-in space-y-10">
        {/* ===== HERO：総合スコア（強い緩急の起点） ===== */}
        <div className="rounded-2xl bg-[var(--navy)] px-6 py-9 text-center">
          <p className="text-[11px] text-white/60 tracking-[0.2em] uppercase mb-3">
            Your Score
          </p>
          <p className="leading-none">
            <span className="text-7xl font-bold text-[var(--mint)] tabular-nums">
              {result.totalScore}
            </span>
            <span className="text-xl text-white/50 font-medium"> / 100</span>
          </p>
          <p className="mt-4 inline-block text-xs font-bold text-white bg-white/10 px-4 py-1.5 rounded-full">
            {result.totalScore >= 80
              ? '採用力は高い水準です'
              : result.totalScore >= 50
                ? '平均的。まだ伸びしろがあります'
                : '改善の余地が大きい状態です'}
          </p>
        </div>

        {/* radar chart */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6">
          <RadarChart axisResults={result.axisResults} />
        </div>

        {/* ===== 軸ごとの結果 ===== */}
        <div>
          <h2 className="text-base font-bold text-[var(--navy)] mb-1">軸ごとの結果</h2>
          <p className="text-xs text-[var(--muted)] mb-5">
            スコアと、いま打つべき一手をまとめました。
          </p>
          <div className="space-y-3">
            {result.axisResults.map((r) => (
              <ResultCard
                key={r.axis}
                result={r}
                isWeakest={r.axis === result.weakestAxis}
              />
            ))}
          </div>
        </div>

        {/* lead form */}
        <div className="border-t border-[var(--line)] pt-8">
          <LeadForm totalScore={result.totalScore} weakestAxis={result.weakestAxis} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProgressBar current={currentIndex + 1} total={total} />
      <QuestionCard
        key={currentIndex}
        question={current}
        onAnswer={handleAnswer}
        onBack={handleBack}
        canGoBack={currentIndex > 0}
      />
    </div>
  );
}
