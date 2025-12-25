// スタイルの種類
export type FXStyle = 'jojo' | 'shojo' | 'gekiga' | 'gag' | 'horror' | 'action';

// アニメーションの種類
export type FXAnimation = 
  | 'none' 
  | 'shake' 
  | 'pulse' 
  | 'float' 
  | 'explode' 
  | 'glitch' 
  | 'bounce' 
  | 'wave' 
  | 'zoom';

// サイズの種類
export type FXSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// 方向（縦書き/横書き）
export type FXDirection = 'horizontal' | 'vertical';

// FXトークンの基本インターフェース
export interface FXToken {
  type: 'fx';
  text: string;
  style: FXStyle;
  animation: FXAnimation;
  size: FXSize;
  intensity: number;
  color?: string;
  direction: FXDirection;
  customStyles?: Partial<FXCustomStyles>;
}

// テキストトークン
export interface TextToken {
  type: 'text';
  content: string;
}

// トークンの共用型
export type Token = FXToken | TextToken;

// カスタムスタイル
export interface FXCustomStyles {
  fontFamily?: string;
  fontWeight?: number | string;
  letterSpacing?: string;
  textShadow?: string;
  transform?: string;
  gradient?: string[];
  glowColor?: string;
  strokeColor?: string;
  strokeWidth?: string;
}

// スタイル設定
export interface StyleConfig {
  name: string;
  nameEn: string;
  fontFamily: string;
  fontWeight: number;
  letterSpacing: string;
  color: string;
  gradient: string[];
  shadow: string;
  transform: string;
  textStroke?: string;
  // 特殊エフェクト
  aura?: boolean;
  auraColor?: string;
  sparkle?: boolean;
  speedLines?: boolean;
  rough?: boolean;
  drip?: boolean;
  glitch?: boolean;
}

// パーサーのオプション
export interface ParseOptions {
  defaultStyle?: FXStyle;
  defaultAnimation?: FXAnimation;
  defaultSize?: FXSize;
}

// エディタの状態
export interface EditorState {
  code: string;
  tokens: Token[];
  selectedTokenIndex: number | null;
  previewMode: 'single' | 'document';
}
