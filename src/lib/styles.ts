import type { StyleConfig, FXStyle } from '../types';

// スタイル設定
export const styleConfigs: Record<FXStyle, StyleConfig> = {
  jojo: {
    name: 'ジョジョ風',
    nameEn: 'JoJo Style',
    fontFamily: '"Noto Sans JP", sans-serif',
    fontWeight: 900,
    letterSpacing: '0.15em',
    color: '#1a1a2e',
    gradient: ['#1a1a2e', '#4a0e0e'],
    shadow: '3px 3px 0 #000, -1px -1px 0 #000, 6px 6px 12px rgba(0,0,0,0.5)',
    transform: 'perspective(500px) rotateX(10deg)',
    textStroke: '2px #000',
    aura: true,
    auraColor: 'rgba(138, 43, 226, 0.4)',
  },
  shojo: {
    name: '少女漫画風',
    nameEn: 'Shojo Style',
    fontFamily: '"Zen Maru Gothic", sans-serif',
    fontWeight: 400,
    letterSpacing: '0.3em',
    color: '#ff69b4',
    gradient: ['#ff69b4', '#ff1493', '#da70d6'],
    shadow: '0 0 20px rgba(255,105,180,0.8), 0 0 40px rgba(255,20,147,0.4)',
    transform: 'rotate(-5deg)',
    sparkle: true,
  },
  gekiga: {
    name: '劇画風',
    nameEn: 'Gekiga Style',
    fontFamily: '"Noto Sans JP", serif',
    fontWeight: 900,
    letterSpacing: '0.05em',
    color: '#000',
    gradient: ['#1a1a1a', '#000'],
    shadow: '4px 4px 0 #8b0000, 8px 8px 0 rgba(0,0,0,0.3)',
    transform: 'skewX(-5deg) scaleY(1.1)',
    textStroke: '3px #8b0000',
    rough: true,
  },
  gag: {
    name: 'ギャグ風',
    nameEn: 'Gag Style',
    fontFamily: '"Zen Maru Gothic", sans-serif',
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: '#ff6b35',
    gradient: ['#ff6b35', '#f7c531', '#ff6b35'],
    shadow: '2px 2px 0 #fff, 4px 4px 0 #333',
    transform: 'rotate(3deg) scale(1.05)',
  },
  horror: {
    name: 'ホラー風',
    nameEn: 'Horror Style',
    fontFamily: 'serif',
    fontWeight: 400,
    letterSpacing: '0.2em',
    color: '#2d0a0a',
    gradient: ['#4a0000', '#000', '#2d0a0a'],
    shadow: '0 0 10px #8b0000, 0 0 30px rgba(139,0,0,0.5)',
    transform: 'scaleY(1.2)',
    drip: true,
    glitch: true,
  },
  action: {
    name: 'アクション風',
    nameEn: 'Action Style',
    fontFamily: '"Noto Sans JP", sans-serif',
    fontWeight: 800,
    letterSpacing: '0.08em',
    color: '#ff4500',
    gradient: ['#ff4500', '#ff6347', '#ffd700'],
    shadow: '3px 3px 0 #000, -2px -2px 0 #fff',
    transform: 'skewX(-10deg) perspective(300px) rotateY(-5deg)',
    speedLines: true,
  },
};

// サイズマップ
export const sizeMap: Record<string, string> = {
  xs: '1rem',
  sm: '1.5rem',
  md: '2.5rem',
  lg: '4rem',
  xl: '6rem',
  '2xl': '8rem',
};

// 強度に応じたスケール
export const getIntensityScale = (intensity: number): number => {
  return 0.7 + (intensity * 0.15);
};

// アニメーションクラスマップ
export const animationClassMap: Record<string, string> = {
  none: '',
  shake: 'animate-shake',
  pulse: 'animate-pulse-fx',
  float: 'animate-float',
  explode: 'animate-explode',
  glitch: 'animate-glitch',
  bounce: 'animate-bounce-fx',
  wave: 'animate-wave',
  zoom: 'animate-zoom',
};

// プリセットテンプレート
export const presetTemplates: Record<FXStyle, string> = {
  jojo: ':::fx[ゴゴゴゴゴ]{.jojo .shake}',
  shojo: ':::fx[キラキラ✧]{.shojo .float}',
  gekiga: ':::fx[ズドォォン！]{.gekiga .xl}',
  gag: ':::fx[ドーーン！]{.gag .bounce}',
  horror: ':::fx[ゾクッ...]{.horror .glitch}',
  action: ':::fx[バキィッ！]{.action .explode}',
};

// サンプルコード
export const sampleCode = `:::fx[ゴゴゴゴゴ]{style=jojo intensity=3 .shake}

:::fx[キラーン✧]{.shojo .lg .float}

:::fx[ドドドドド]{.gekiga .xl}

:::fx[ギャーン！]{.gag .bounce}

:::fx[ヒュウウウ...]{.horror .glitch}

:::fx[ズドォォン！]{.action .explode .xl}

:::fx[縦書きテスト]{.jojo .vertical .lg}`;
