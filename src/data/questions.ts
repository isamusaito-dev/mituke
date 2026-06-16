export type Axis = '認知力' | '訴求力' | '導線力' | '効率力' | '将来力';

export interface Choice {
  label: string;
  score: number;
}

export interface Question {
  id: number;
  axis: Axis;
  text: string;
  choices: Choice[];
}

export interface AxisFeedback {
  high: string;   // 80-100
  mid: string;    // 50-79
  low: string;    // 0-49
}

export const AXES: Axis[] = ['認知力', '訴求力', '導線力', '効率力', '将来力'];

export const questions: Question[] = [
  {
    id: 1,
    axis: '認知力',
    text: '自社の採用情報は、いまどこに出していますか？',
    choices: [
      { label: 'ハローワークのみ', score: 1 },
      { label: 'ハローワーク＋求人サイト1つ', score: 2 },
      { label: '複数の求人サイト＋自社サイト', score: 3 },
      { label: '求人サイト＋自社サイト＋SNS', score: 4 },
    ],
  },
  {
    id: 2,
    axis: '認知力',
    text: '「会社名　求人」で検索したとき、何が出てきますか？',
    choices: [
      { label: '確認したことがない', score: 1 },
      { label: '出てくるが情報が古い', score: 2 },
      { label: '出てくるが簡素', score: 3 },
      { label: '充実した採用ページが表示される', score: 4 },
    ],
  },
  {
    id: 3,
    axis: '訴求力',
    text: '採用ページに、実際に働いている社員の声（写真・インタビュー）はありますか？',
    choices: [
      { label: 'ない', score: 1 },
      { label: 'テキストだけ少しある', score: 2 },
      { label: '写真付きで掲載している', score: 3 },
      { label: '動画も含めて充実している', score: 4 },
    ],
  },
  {
    id: 4,
    axis: '訴求力',
    text: '「うちで働く理由」を3つ、すぐ言えますか？',
    choices: [
      { label: 'すぐには出てこない', score: 1 },
      { label: '1つは言える', score: 2 },
      { label: '3つ言えるが、採用ページには書いていない', score: 3 },
      { label: '3つ以上、採用ページにも明記している', score: 4 },
    ],
  },
  {
    id: 5,
    axis: '導線力',
    text: '求職者が御社を見つけてから応募完了まで、何ステップかかりますか？',
    choices: [
      { label: 'わからない', score: 1 },
      { label: '5ステップ以上', score: 2 },
      { label: '3〜4ステップ', score: 3 },
      { label: 'フォーム送信のみで完了', score: 4 },
    ],
  },
  {
    id: 6,
    axis: '導線力',
    text: '採用ページはスマートフォンで快適に見れますか？',
    choices: [
      { label: '採用ページ自体がない', score: 1 },
      { label: 'あるがスマホ未対応', score: 2 },
      { label: 'スマホ対応だが見づらい部分がある', score: 3 },
      { label: 'スマホでも快適に応募まで完了できる', score: 4 },
    ],
  },
  {
    id: 7,
    axis: '効率力',
    text: '採用業務は、主に誰が担当していますか？',
    choices: [
      { label: '社長が一人で全部やっている', score: 1 },
      { label: '総務が他の業務と兼任', score: 2 },
      { label: '担当者はいるが他業務も多い', score: 3 },
      { label: '採用専任、またはチームがある', score: 4 },
    ],
  },
  {
    id: 8,
    axis: '効率力',
    text: '応募から内定までの平均期間は？',
    choices: [
      { label: '把握していない', score: 1 },
      { label: '2ヶ月以上', score: 2 },
      { label: '1〜2ヶ月', score: 3 },
      { label: '1ヶ月以内', score: 4 },
    ],
  },
  {
    id: 9,
    axis: '将来力',
    text: '採用活動にデジタルツール（ATS・チャットツール・AI等）を使っていますか？',
    choices: [
      { label: '紙とハローワークのみ', score: 1 },
      { label: 'メールとExcelで管理', score: 2 },
      { label: '一部ツールを導入している', score: 3 },
      { label: 'ATSを活用し、データをもとに改善している', score: 4 },
    ],
  },
  {
    id: 10,
    axis: '将来力',
    text: '来年の採用計画（人数・時期・予算）は、いまの時点で決まっていますか？',
    choices: [
      { label: '必要になったら考える', score: 1 },
      { label: 'なんとなくイメージはある', score: 2 },
      { label: '人数と時期は決まっている', score: 3 },
      { label: '人数・時期・予算・チャネルまで計画済み', score: 4 },
    ],
  },
];

export const axisFeedback: Record<Axis, AxisFeedback> = {
  認知力: {
    high: '採用情報の発信チャネルは十分です。次はコンテンツの質を高めるフェーズです。',
    mid: '求職者との接点を増やす余地があります。自社サイトの採用ページ強化が次の一手です。',
    low: '⚠ ここが最大の課題です。求職者にそもそも届いていない可能性が高いです。まず「見つけてもらう」仕組みから整える必要があります。',
  },
  訴求力: {
    high: '自社の魅力が言語化・可視化できています。社員の声をさらに厚くすると差がつきます。',
    mid: '魅力の発信をもう一段強化できます。社員インタビューや写真の追加が効果的です。',
    low: '⚠ 魅力が外に出ていません。良い会社でも、伝わらなければ応募は来ません。社員の声を1つ載せるだけで変わります。',
  },
  導線力: {
    high: '応募までの導線は整っています。離脱ポイントの分析で、さらに応募率を上げられます。',
    mid: '応募ステップの簡略化で、取りこぼしを減らせます。スマホ対応の確認を。',
    low: '⚠ 応募のハードルが高すぎます。せっかく興味を持った人が、途中で離脱している可能性が大です。',
  },
  効率力: {
    high: '採用体制は安定しています。データ活用で、さらに精度を上げる余地があります。',
    mid: '採用業務の属人化を解消すると、質・スピードともに改善します。',
    low: '⚠ 採用業務が属人的で、持続可能な状態ではありません。人を増やす前に、仕組みを整える必要があります。',
  },
  将来力: {
    high: 'デジタル活用・計画性ともに高い水準です。AI活用で次の段階に進めます。',
    mid: '採用計画の具体化とツール導入で、来期の採用が大きく変わります。',
    low: '⚠ 計画性・ツール活用ともに未着手です。ここを放置すると、今後ますます採用コストが上がります。',
  },
};
