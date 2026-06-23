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
      <div className="animate-fade-in space-y-8">
        {/* total score */}
        <div className="text-center">
          <p className="text-xs text-[var(--muted)] font-light tracking-widest mb-1">
            あなたの採用力スコア
          </p>
          <p className="font-cormorant text-[72px] leading-none text-[var(--terracotta)] font-medium">
            {result.totalScore}
            <span className="text-2xl text-[var(--muted)] font-light"> / 100</span>
          </p>
        </div>

        {/* radar chart */}
        <RadarChart axisResults={result.axisResults} />

        {/* axis results */}
        <div className="space-y-3">
          {result.axisResults.map((r) => (
            <ResultCard
              key={r.axis}
              result={r}
              isWeakest={r.axis === result.weakestAxis}
            />
          ))}
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
