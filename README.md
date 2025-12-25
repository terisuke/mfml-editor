# MFML Editor 🎌

**MangaFX Markup Language** - 漫画の効果音・擬音を記法化するエディタ＆ビューアー

![MFML Editor](https://img.shields.io/badge/version-0.1.0-purple)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🌟 特徴

- 📝 **独自記法 (MFML)** - マークダウンライクな記法で漫画効果音を表現
- 🎨 **6種類のスタイルプリセット** - ジョジョ風、少女漫画風、劇画風など
- ✨ **多彩なアニメーション** - shake, pulse, float, explode, glitch など
- 🎨 **高度なスタイリング**: 影、グラデーション、オーラ、スパークルなどを自在に。
- 🎬 **アニメーション**: 震え、脈動、移動などの動きを付与。
- 📐 **縦書きサポート** - `.vertical` で縦書き表示
- 🔄 **リアルタイムプレビュー** - 入力と同時にプレビュー更新

### 🚀 Live Demo
**[MFML Editor を使ってみる](https://terisuke.github.io/mfml-editor/)**

## 🚀 クイックスタート

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build
```

## 🧪 テスト方法 (Local Testing)

開発環境で修正內容をテストする場合は以下の手順で行ってください。

### 1. 開発サーバーの起動
```bash
npm run dev
```

### 2. 機能テスト項目
- **パーサーのテスト**: エディタに `!!!ギャーン!!!{.gag .shake}` と入力し、正しくレンダリングされるか確認してください。感嘆符の数を変えても動作することを確認します。
- **画像エクスポート**: ツールバーの「🖼️ 画像で保存」ボタンを押し、背景透過のPNGファイルが正しくダウンロードされるか確認してください。
- **スタイル確認**: 各プリセットボタンを押し、期待通りのスタイル（ジョジョ風、少女漫画風など）が適用されるか確認してください。

### 3. リンターの実行
```bash
npm run lint
```

## 📖 記法ガイド

### 基本構文

```
:::fx[テキスト]{オプション}
```

### スタイル

| クラス | 説明 |
|--------|------|
| `.jojo` | ジョジョの奇妙な冒険風 - 重厚なオーラ感 |
| `.shojo` | 少女漫画風 - キラキラ華やか |
| `.gekiga` | 劇画風 - 荒々しい筆文字感 |
| `.gag` | ギャグ漫画風 - ポップで軽快 |
| `.horror` | ホラー風 - 不気味な歪み |
| `.action` | アクション風 - スピード線付き |

### アニメーション

| クラス | 効果 |
|--------|------|
| `.shake` | 振動 |
| `.pulse` | 脈動 |
| `.float` | 浮遊 |
| `.explode` | 爆発登場 |
| `.glitch` | グリッチノイズ |
| `.bounce` | バウンス |
| `.wave` | 波打ち |
| `.zoom` | ズームイン |

### サイズ

`.xs` `.sm` `.md` `.lg` `.xl` `.2xl`

### その他のオプション

- `.vertical` - 縦書き
- `intensity=1~5` - 強度調整
- `color=#ff0000` - カスタムカラー

### 使用例

```
:::fx[ゴゴゴゴゴ]{.jojo .shake .xl intensity=4}

:::fx[キラーン✧]{.shojo .float .lg}

:::fx[ドドドドド]{.gekiga .vertical}

:::fx[バキィッ！]{.action .explode}
```

## 🛠️ 技術スタック

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Font**: Noto Sans JP, Zen Maru Gothic

## 📁 プロジェクト構造

```
mfml-editor/
├── src/
│   ├── components/     # UIコンポーネント
│   │   ├── Editor.tsx
│   │   ├── Preview.tsx
│   │   ├── FXRenderer.tsx
│   │   ├── Toolbar.tsx
│   │   └── SyntaxHelp.tsx
│   ├── lib/            # ライブラリ
│   │   ├── parser.ts   # MFMLパーサー
│   │   └── styles.ts   # スタイル定義
│   ├── types/          # 型定義
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🚢 デプロイ

### Vercel

```bash
npm run build
# dist/ フォルダをVercelにデプロイ
```

### Cloudflare Pages

```bash
npm run build
# dist/ フォルダをCloudflare Pagesにデプロイ
```

## 📜 ライセンス

MIT License

## 🤝 貢献

Issue や Pull Request は大歓迎です！

---

Made with 💜 by Terisuke
