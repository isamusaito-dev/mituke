# Mitsuke（ミツケ）採用力診断ツール

地方の中小企業向け採用支援サービス **Mitsuke** の無料採用力診断MVP。

10問・約5分で採用力を5軸スコア化し、詳細レポートへのリード獲得につなげる。

## 技術スタック

- **Astro 5** — 静的サイト生成 + Reactアイランド
- **React 19** — 診断UIコンポーネント
- **Tailwind CSS 4** — スタイリング
- **Cloudflare Pages** — ホスティング（予定）
- **Formspree** — フォーム送信（MVP）

## ローカル開発

Node.js 22以上が必要。

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # ./dist/ に静的ファイル生成
npm run preview  # ビルド後のプレビュー
```

## ページ構成

| パス | 内容 |
|------|------|
| `/` | LPトップ（ヒーロー + CTA） |
| `/diagnosis` | 診断ページ（Reactアイランド） |
| `/thanks` | サンクスページ |

## スコアリングロジック

5軸それぞれ2問 × 4点満点 = 8点 → 100点換算。

| 軸 | 設問 | 測定対象 |
|----|------|----------|
| 認知力 | Q1・Q2 | 求職者に自社が届いているか |
| 訴求力 | Q3・Q4 | 働く魅力が伝わっているか |
| 導線力 | Q5・Q6 | 迷わず応募できるか |
| 効率力 | Q7・Q8 | 採用業務に無理がないか |
| 将来力 | Q9・Q10 | AI活用・拡張の伸びしろ |

## 設定が必要なもの

- `src/components/LeadForm.tsx` の `FORMSPREE_ID` を実際のIDに置き換える
- `src/pages/index.astro` / `thanks.astro` のCalendly URLを実際のURLに置き換える

## ブランド

- サービス名：**Mitsuke**（ミツケ）
- ドメイン：mitsuke.life
- 対応エリア：長野・群馬・山梨・新潟・埼玉・栃木
- 運営：株式会社ハンチス (Hunches Co., Ltd.)
