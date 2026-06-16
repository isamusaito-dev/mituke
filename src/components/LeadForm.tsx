import { useState } from 'react';

interface Props {
  totalScore: number;
}

const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // TODO: replace with actual Formspree form ID

export default function LeadForm({ totalScore }: Props) {
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
        body: JSON.stringify({ email, company, score: totalScore }),
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
        <h3 className="text-lg font-serif font-semibold text-[var(--green)] mb-2">
          ありがとうございます
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
          レポートは3営業日以内にお送りします。
          <br />
          すぐにご相談されたい方は、ヒアリング（無料・30分）をご予約ください。
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
      <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
        この診断結果をもとに、御社に合った具体的な改善策をまとめた
        <br className="hidden sm:block" />
        <strong className="text-[var(--ink)]">詳細レポート（20〜25ページ）を無料でお送りします。</strong>
      </p>
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
          className="w-full py-4 rounded-full bg-[var(--green)] text-white text-sm font-medium hover:bg-[var(--green-deep)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
        >
          {loading ? '送信中…' : '詳細レポートを受け取る'}
        </button>
      </form>
    </div>
  );
}
