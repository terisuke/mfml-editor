import React from 'react';
import { presetTemplates, styleConfigs } from '../lib/styles';
import type { FXStyle } from '../types';

interface ToolbarProps {
  onInsertPreset: (preset: string) => void;
  onClear: () => void;
  onCopy: () => void;
  onExport: () => void;
  onExportGif: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onInsertPreset,
  onClear,
  onCopy,
  onExport,
  onExportGif,
}) => {
  const styles = Object.keys(styleConfigs) as FXStyle[];

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-900/50 border-b border-purple-500/30">
      {/* プリセットボタン */}
      <div className="flex flex-wrap gap-1">
        <span className="text-purple-400 text-xs mr-2 self-center">プリセット:</span>
        {styles.map((key) => (
          <button
            key={key}
            onClick={() => onInsertPreset(presetTemplates[key])}
            className="px-2 py-1 text-xs rounded-md bg-purple-600/30 hover:bg-purple-600/50 
                     text-purple-200 transition-colors border border-purple-500/30"
          >
            {styleConfigs[key].name}
          </button>
        ))}
      </div>

      {/* 区切り線 */}
      <div className="w-px h-6 bg-purple-500/30 mx-2" />

      {/* アクションボタン */}
      <div className="flex gap-2 ml-auto">
        <button
          onClick={onExportGif}
          className="px-3 py-1 text-xs rounded-md bg-indigo-600 hover:bg-indigo-700 
                   text-white transition-colors border border-indigo-500 shadow-lg"
        >
          🎬 GIFで保存
        </button>
        <button
          onClick={onExport}
          className="px-3 py-1 text-xs rounded-md bg-purple-600 hover:bg-purple-700 
                   text-white transition-colors border border-purple-500 shadow-lg"
        >
          🖼️ 画像で保存
        </button>
        <button
          onClick={onCopy}
          className="px-3 py-1 text-xs rounded-md bg-green-600/30 hover:bg-green-600/50 
                   text-green-200 transition-colors border border-green-500/30"
        >
          📋 コピー
        </button>
        <button
          onClick={onClear}
          className="px-3 py-1 text-xs rounded-md bg-red-600/30 hover:bg-red-600/50 
                   text-red-200 transition-colors border border-red-500/30"
        >
          🗑️ クリア
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
