import React from 'react';
import { animationClassMap, getIntensityScale, sizeMap, styleConfigs } from '../lib/styles';
import type { FXToken } from '../types';

interface FXRendererProps extends Omit<FXToken, 'type'> { }

export const FXRenderer: React.FC<FXRendererProps & { containerRef?: React.RefObject<HTMLSpanElement> }> = ({
  text,
  style,
  animation,
  size,
  intensity,
  color,
  direction,
  containerRef,
}) => {
  const config = styleConfigs[style] || styleConfigs.jojo;
  const fontSize = sizeMap[size] || sizeMap.md;
  const scale = getIntensityScale(intensity);
  const animationClass = animationClassMap[animation] || '';

  const baseStyle: React.CSSProperties = {
    fontFamily: config.fontFamily,
    fontWeight: config.fontWeight,
    fontSize,
    letterSpacing: config.letterSpacing,
    color: color || config.color,
    textShadow: config.shadow,
    display: 'inline-block',
    position: 'relative',
    padding: '0.5rem 1rem',
    WebkitTextStroke: config.textStroke,
    writingMode: direction === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
    textOrientation: direction === 'vertical' ? 'upright' : 'mixed',
  };

  const transformStyle = `${config.transform || ''} scale(${scale})`;

  return (
    <span ref={containerRef} className="fx-item inline-block relative p-4 bg-transparent">
      {/* オーラエフェクト (ジョジョ風) */}
      {config.aura && (
        <span
          className="absolute inset-0 animate-aura pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse, ${config.auraColor} 0%, rgba(255, 255, 255, 0) 70%)`,
            filter: 'blur(20px)',
            transform: 'scale(1.5)',
            zIndex: -1,
          }}
        />
      )}

      {/* スパークルエフェクト (少女漫画風) */}
      {config.sparkle && (
        <span className="absolute inset-0 pointer-events-none overflow-visible">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute animate-sparkle text-pink-300"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.15}s`,
                fontSize: `${0.8 + Math.random() * 0.6}rem`,
              }}
            >
              ✧
            </span>
          ))}
        </span>
      )}

      {/* スピードラインエフェクト (アクション風) */}
      {config.speedLines && (
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="absolute bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-speed"
              style={{
                height: '2px',
                width: '200%',
                left: '-50%',
                top: `${15 + i * 14}%`,
                animationDelay: `${i * 0.08}s`,
                opacity: 0.7,
              }}
            />
          ))}
        </span>
      )}

      {/* メインテキスト */}
      <span
        className={`fx-text ${animationClass}`}
        style={{
          ...baseStyle,
          transform: transformStyle,
        }}
      >
        {/* グラデーションテキスト */}
        <span
          className="gradient-text"
          style={{
            backgroundImage: config.gradient
              ? `linear-gradient(${direction === 'vertical' ? '90deg' : '180deg'}, ${config.gradient.join(', ')})`
              : 'none',
            WebkitBackgroundClip: config.gradient ? 'text' : 'initial',
            backgroundClip: config.gradient ? 'text' : 'initial',
            WebkitTextFillColor: config.gradient ? 'transparent' : 'initial',
          }}
        >
          {text}
        </span>
      </span>
    </span>
  );
};

export default FXRenderer;
