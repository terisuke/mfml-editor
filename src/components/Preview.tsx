import React from 'react';
import type { Token } from '../types';
import FXRenderer from './FXRenderer';

interface PreviewProps {
  tokens: Token[];
  className?: string;
}

export const Preview: React.FC<PreviewProps> = ({ tokens, className = '' }) => {
  if (tokens.length === 0) {
    return (
      <div className={`flex items-center justify-center h-full text-gray-400 ${className}`}>
        <div className="text-center">
          <p className="text-lg">プレビューエリア</p>
          <p className="text-sm mt-2">左側にMFML記法を入力してください</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-8 flex flex-wrap items-center justify-center gap-6 min-h-full ${className}`}>
      {tokens.map((token, index) => {
        if (token.type === 'text') {
          return (
            <span key={index} className="text-gray-700 text-lg whitespace-pre-wrap">
              {token.content}
            </span>
          );
        }
        return <FXRenderer key={index} {...token} />;
      })}
    </div>
  );
};

export default Preview;
