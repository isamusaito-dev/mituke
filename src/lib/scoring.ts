import { type Axis, AXES, axisFeedback } from '../data/questions';

export interface AxisResult {
  axis: Axis;
  score: number;
  feedback: string;
  level: 'high' | 'mid' | 'low';
}

export interface DiagnosisResult {
  totalScore: number;
  axisResults: AxisResult[];
  weakestAxis: Axis;
}

export function calcAxisScore(scoreA: number, scoreB: number): number {
  return Math.round(((scoreA + scoreB) / 8) * 100 * 10) / 10;
}

export function getFeedbackLevel(score: number): 'high' | 'mid' | 'low' {
  if (score >= 80) return 'high';
  if (score >= 50) return 'mid';
  return 'low';
}

export function calcResult(answers: number[]): DiagnosisResult {
  // answers[0..9] correspond to Q1..Q10
  const axisScores: Record<Axis, number> = {
    認知力: calcAxisScore(answers[0], answers[1]),
    訴求力: calcAxisScore(answers[2], answers[3]),
    導線力: calcAxisScore(answers[4], answers[5]),
    効率力: calcAxisScore(answers[6], answers[7]),
    将来力: calcAxisScore(answers[8], answers[9]),
  };

  const axisResults: AxisResult[] = AXES.map((axis) => {
    const score = axisScores[axis];
    const level = getFeedbackLevel(score);
    return {
      axis,
      score,
      feedback: axisFeedback[axis][level],
      level,
    };
  });

  const totalScore = Math.round(
    AXES.reduce((sum, axis) => sum + axisScores[axis], 0) / AXES.length
  );

  const weakestAxis = axisResults.reduce((a, b) => (a.score <= b.score ? a : b)).axis;

  return { totalScore, axisResults, weakestAxis };
}
