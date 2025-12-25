import type {
  FXAnimation,
  FXSize,
  FXStyle,
  FXToken,
  ParseOptions,
  TextToken,
  Token
} from '../types';

// デフォルトのパースオプション
const defaultParseOptions: ParseOptions = {
  defaultStyle: 'jojo',
  defaultAnimation: 'pulse',
  defaultSize: 'md',
};

// 有効な値の定義
const validStyles: FXStyle[] = ['jojo', 'shojo', 'gekiga', 'gag', 'horror', 'action'];
const validAnimations: FXAnimation[] = ['none', 'shake', 'pulse', 'float', 'explode', 'glitch', 'bounce', 'wave', 'zoom'];
const validSizes: FXSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

/**
 * MFML記法をパースしてトークン配列に変換する
 * 
 * 対応構文:
 * - :::fx[テキスト]{オプション}
 * - !!テキスト!!{オプション}
 * - ::スタイル[テキスト]
 */
export function parseMFML(input: string, options: ParseOptions = {}): Token[] {
  const opts = { ...defaultParseOptions, ...options };
  const tokens: Token[] = [];

  // メインパターン
  // 1: :::fx[...] 2: :::fx{...}
  // 3: !!! marker 4: !!! text 5: !!! options
  // 6: ::style 7: ::text
  const fxPattern = /:::fx\[([^\]]+)\]\{([^}]*)\}|(!{2,})(.+?)\3\{([^}]*)\}|::([a-z]+)\[([^\]]+)\]/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = fxPattern.exec(input)) !== null) {
    // マッチ前のプレーンテキストを追加
    if (match.index > lastIndex) {
      const textContent = input.slice(lastIndex, match.index);
      if (textContent.trim()) {
        tokens.push(createTextToken(textContent));
      }
    }

    // FXトークンを解析
    const text = match[1] || match[4] || match[7];
    const optionsStr = match[2] || match[5] || '';
    const shortStyle = match[6] as FXStyle | undefined;

    const fxOptions = parseOptions(optionsStr, shortStyle, opts);

    tokens.push(createFXToken(text, fxOptions));

    lastIndex = match.index + match[0].length;
  }

  // 残りのテキストを追加
  if (lastIndex < input.length) {
    const remainingText = input.slice(lastIndex);
    if (remainingText.trim()) {
      tokens.push(createTextToken(remainingText));
    }
  }

  return tokens;
}

/**
 * テキストトークンを作成
 */
function createTextToken(content: string): TextToken {
  return {
    type: 'text',
    content,
  };
}

/**
 * FXトークンを作成
 */
function createFXToken(
  text: string,
  options: Partial<Omit<FXToken, 'type' | 'text'>>
): FXToken {
  return {
    type: 'fx',
    text,
    style: options.style || 'jojo',
    animation: options.animation || 'pulse',
    size: options.size || 'md',
    intensity: options.intensity || 2,
    direction: options.direction || 'horizontal',
    color: options.color,
    customStyles: options.customStyles,
  };
}

/**
 * オプション文字列をパースする
 */
function parseOptions(
  optionsStr: string,
  shortStyle: FXStyle | undefined,
  defaults: ParseOptions
): Partial<Omit<FXToken, 'type' | 'text'>> {
  const options: Partial<Omit<FXToken, 'type' | 'text'>> = {
    style: shortStyle || defaults.defaultStyle,
    animation: defaults.defaultAnimation,
    size: defaults.defaultSize,
    intensity: 2,
    direction: 'horizontal',
  };

  // .class形式のパース
  const classPattern = /\.([a-z0-9-]+)/g;
  let classMatch: RegExpExecArray | null;

  while ((classMatch = classPattern.exec(optionsStr)) !== null) {
    const className = classMatch[1];

    // スタイル
    if (validStyles.includes(className as FXStyle)) {
      options.style = className as FXStyle;
    }
    // アニメーション
    else if (validAnimations.includes(className as FXAnimation)) {
      options.animation = className as FXAnimation;
    }
    // サイズ
    else if (validSizes.includes(className as FXSize)) {
      options.size = className as FXSize;
    }
    // 縦書き
    else if (className === 'vertical' || className === 'v') {
      options.direction = 'vertical';
    }
    // 横書き（明示的）
    else if (className === 'horizontal' || className === 'h') {
      options.direction = 'horizontal';
    }
  }

  // key=value形式のパース
  const kvPattern = /(\w+)=([^\s}]+)/g;
  let kvMatch: RegExpExecArray | null;

  while ((kvMatch = kvPattern.exec(optionsStr)) !== null) {
    const [, key, value] = kvMatch;

    switch (key) {
      case 'style':
        if (validStyles.includes(value as FXStyle)) {
          options.style = value as FXStyle;
        }
        break;
      case 'animation':
      case 'anim':
        if (validAnimations.includes(value as FXAnimation)) {
          options.animation = value as FXAnimation;
        }
        break;
      case 'size':
        if (validSizes.includes(value as FXSize)) {
          options.size = value as FXSize;
        }
        break;
      case 'intensity':
      case 'i':
        const intensity = parseInt(value, 10);
        if (!isNaN(intensity) && intensity >= 1 && intensity <= 5) {
          options.intensity = intensity;
        }
        break;
      case 'color':
      case 'c':
        options.color = value;
        break;
      case 'direction':
      case 'dir':
        if (value === 'vertical' || value === 'v') {
          options.direction = 'vertical';
        } else if (value === 'horizontal' || value === 'h') {
          options.direction = 'horizontal';
        }
        break;
    }
  }

  return options;
}

/**
 * トークンをMFML記法に変換（逆変換）
 */
export function tokensToMFML(tokens: Token[]): string {
  return tokens.map(token => {
    if (token.type === 'text') {
      return token.content;
    }

    const fx = token as FXToken;
    const options: string[] = [];

    // スタイル
    options.push(`.${fx.style}`);

    // アニメーション
    if (fx.animation !== 'pulse') {
      options.push(`.${fx.animation}`);
    }

    // サイズ
    if (fx.size !== 'md') {
      options.push(`.${fx.size}`);
    }

    // 縦書き
    if (fx.direction === 'vertical') {
      options.push('.vertical');
    }

    // 強度
    if (fx.intensity !== 2) {
      options.push(`intensity=${fx.intensity}`);
    }

    // カスタムカラー
    if (fx.color) {
      options.push(`color=${fx.color}`);
    }

    return `:::fx[${fx.text}]{${options.join(' ')}}`;
  }).join('\n\n');
}

/**
 * シンタックスハイライト用のトークン化
 */
export function tokenizeForHighlight(input: string): Array<{
  type: 'keyword' | 'bracket' | 'text' | 'option' | 'plain';
  value: string;
  start: number;
  end: number;
}> {
  const highlights: Array<{
    type: 'keyword' | 'bracket' | 'text' | 'option' | 'plain';
    value: string;
    start: number;
    end: number;
  }> = [];

  const pattern = /(:::fx|!{2,}|::)(\[)([^\]]+)(\])(\{?)([^}]*)(\}?)/g;
  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = pattern.exec(input)) !== null) {
    // 前のプレーンテキスト
    if (match.index > lastIndex) {
      highlights.push({
        type: 'plain',
        value: input.slice(lastIndex, match.index),
        start: lastIndex,
        end: match.index,
      });
    }

    let pos = match.index;

    // キーワード (:::fx, !!, ::)
    highlights.push({
      type: 'keyword',
      value: match[1],
      start: pos,
      end: pos + match[1].length,
    });
    pos += match[1].length;

    // 開始ブラケット
    highlights.push({
      type: 'bracket',
      value: match[2],
      start: pos,
      end: pos + 1,
    });
    pos += 1;

    // テキスト
    highlights.push({
      type: 'text',
      value: match[3],
      start: pos,
      end: pos + match[3].length,
    });
    pos += match[3].length;

    // 終了ブラケット
    highlights.push({
      type: 'bracket',
      value: match[4],
      start: pos,
      end: pos + 1,
    });
    pos += 1;

    // オプション部分
    if (match[5]) {
      highlights.push({
        type: 'bracket',
        value: match[5],
        start: pos,
        end: pos + 1,
      });
      pos += 1;

      if (match[6]) {
        highlights.push({
          type: 'option',
          value: match[6],
          start: pos,
          end: pos + match[6].length,
        });
        pos += match[6].length;
      }

      if (match[7]) {
        highlights.push({
          type: 'bracket',
          value: match[7],
          start: pos,
          end: pos + 1,
        });
      }
    }

    lastIndex = match.index + match[0].length;
  }

  // 残りのテキスト
  if (lastIndex < input.length) {
    highlights.push({
      type: 'plain',
      value: input.slice(lastIndex),
      start: lastIndex,
      end: input.length,
    });
  }

  return highlights;
}
