import { useState } from 'react';
import type { Axis } from '../data/questions';

interface Props {
  totalScore: number;
  weakestAxis: Axis;
}

const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // TODO: replace with actual Formspree form ID

export default function LeadForm({ totalScore, weakestAxis }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, company, score: totalScore, weakestAxis }),
      });
      setSubmitted(true);
    } catch {
      alert('送信に失敗しました。お手数ですが、再度お試しください。');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <p className="text-2xl mb-3">✉️</p>
        <h3 className="text-lg font-bold text-[var(--green)] mb-2">
          ありがとうございます
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
          ガイドはご入力のメールアドレスにお送りします。
          <br />
          より具体的に相談されたい方は、ヒアリング（無料・30分）もご利用ください。
        </p>
        <a
          href="https://calendly.com/hunches"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-full bg-[var(--green)] text-white text-sm font-medium hover:bg-[var(--green-deep)] transition-colors"
        >
          無料ヒアリングを予約する →
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* ガイドのイメージ */}
      <div className="flex justify-center mb-5">
        <svg
          viewBox="0 0 320 200"
          className="w-[220px] h-auto"
          role="img"
          aria-label="採用改善ガイドのイメージ"
        >
          {/* 背面ページ */}
          <rect x="92" y="26" width="150" height="152" rx="8" fill="#F4F8F7" stroke="#DCE6E3" transform="rotate(6 167 102)" />
          <rect x="78" y="22" width="150" height="154" rx="8" fill="#FFFFFF" stroke="#DCE6E3" transform="rotate(-5 153 99)" />
          {/* 表紙 */}
          <rect x="85" y="18" width="150" height="164" rx="10" fill="#162C53" />
          <text x="160" y="48" textAnchor="middle" fill="#B9E1D7" fontSize="8" letterSpacing="2" fontFamily="sans-serif">RECRUITMENT GUIDE</text>
          <text x="160" y="64" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="sans-serif" opacity="0.7">地方の中小企業のための</text>
          <text x="160" y="92" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="700" fontFamily="sans-serif">採用改善</text>
          <text x="160" y="116" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="700" fontFamily="sans-serif">ガイド</text>
          {/* ミニレーダー */}
          <polygon points="160,128 174,138 169,154 151,154 146,138" fill="none" stroke="#0BA696" strokeWidth="1.2" strokeLinejoin="round" />
          <polygon points="160,135 168,140 165,148 156,149 153,141" fill="#0BA696" fillOpacity="0.35" stroke="#0BA696" strokeWidth="1" strokeLinejoin="round" />
          {/* バッジ */}
          <rect x="118" y="160" width="84" height="16" rx="8" fill="#B9E1D7" />
          <text x="160" y="171" textAnchor="middle" fill="#162C53" fontSize="8" fontWeight="700" fontFamily="sans-serif">PDF · 約10ページ</text>
        </svg>
      </div>
      <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
        地方の中小企業のための
        <strong className="text-[var(--ink)]">採用改善ガイド（PDF・約10ページ）を無料でお送りします。</strong>
        採用の5軸ごとに、よくある失敗と打ち手を具体的にまとめた実践資料です。
      </p>
      <div className="mb-6 px-4 py-3 rounded-xl bg-[var(--green)]/8 text-sm text-[var(--ink)] leading-relaxed">
        あなたが今いちばん手をつけるべきは
        <strong className="text-[var(--green)]">「{weakestAxis}」</strong>
        。ガイドの該当パートから読むのがおすすめです。
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="メールアドレス（必須）"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--green)] transition-colors"
        />
        <input
          type="text"
          placeholder="会社名（任意）"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--green)] transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-full bg-[var(--green)] text-white text-sm font-bold hover:bg-[var(--green-deep)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
        >
          {loading ? '送信中…' : '無料ガイドを受け取る'}
        </button>
      </form>
    </div>
  );
}
