import React, { useState } from 'react';

export const SyntaxHelp: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800/60 rounded-xl border border-purple-500/20 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left 
                 hover:bg-gray-700/30 transition-colors"
      >
        <span className="text-purple-300 font-medium">📖 MFML記法ガイド</span>
        <span className="text-purple-400 text-lg">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      {isExpanded && (
        <div className="p-4 border-t border-purple-500/20 space-y-4">
          {/* 基本構文 */}
          <section>
            <h4 className="text-purple-300 text-sm font-medium mb-2">基本構文</h4>
            <div className="bg-gray-900/50 p-3 rounded-lg font-mono text-sm">
              <code className="text-green-400">:::fx[テキスト]&#123;オプション&#125;</code>
            </div>
          </section>

          {/* スタイル */}
          <section>
            <h4 className="text-purple-300 text-sm font-medium mb-2">スタイル</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-yellow-400">.jojo</code>
                <span className="text-gray-400 ml-2">ジョジョ風</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-yellow-400">.shojo</code>
                <span className="text-gray-400 ml-2">少女漫画風</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-yellow-400">.gekiga</code>
                <span className="text-gray-400 ml-2">劇画風</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-yellow-400">.gag</code>
                <span className="text-gray-400 ml-2">ギャグ風</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-yellow-400">.horror</code>
                <span className="text-gray-400 ml-2">ホラー風</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-yellow-400">.action</code>
                <span className="text-gray-400 ml-2">アクション風</span>
              </div>
            </div>
          </section>

          {/* アニメーション */}
          <section>
            <h4 className="text-purple-300 text-sm font-medium mb-2">アニメーション</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-blue-400">.shake</code>
                <span className="text-gray-400 ml-2">振動</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-blue-400">.pulse</code>
                <span className="text-gray-400 ml-2">脈動</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-blue-400">.float</code>
                <span className="text-gray-400 ml-2">浮遊</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-blue-400">.explode</code>
                <span className="text-gray-400 ml-2">爆発</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-blue-400">.glitch</code>
                <span className="text-gray-400 ml-2">グリッチ</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-blue-400">.bounce</code>
                <span className="text-gray-400 ml-2">バウンス</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-blue-400">.wave</code>
                <span className="text-gray-400 ml-2">波打ち</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-blue-400">.zoom</code>
                <span className="text-gray-400 ml-2">ズーム</span>
              </div>
            </div>
          </section>

          {/* サイズ */}
          <section>
            <h4 className="text-purple-300 text-sm font-medium mb-2">サイズ</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((size) => (
                <div key={size} className="bg-gray-900/50 px-3 py-2 rounded">
                  <code className="text-pink-400">.{size}</code>
                </div>
              ))}
            </div>
          </section>

          {/* その他 */}
          <section>
            <h4 className="text-purple-300 text-sm font-medium mb-2">その他のオプション</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-orange-400">.vertical</code>
                <span className="text-gray-400 ml-2">縦書き</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-orange-400">intensity=1~5</code>
                <span className="text-gray-400 ml-2">強度</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-orange-400">color=#ff0000</code>
                <span className="text-gray-400 ml-2">色指定</span>
              </div>
            </div>
          </section>

          {/* 例 */}
          <section>
            <h4 className="text-purple-300 text-sm font-medium mb-2">使用例</h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-gray-300">:::fx[ゴゴゴ]&#123;.jojo .shake .xl&#125;</code>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-gray-300">:::fx[キラーン✧]&#123;.shojo .float intensity=4&#125;</code>
              </div>
              <div className="bg-gray-900/50 p-2 rounded">
                <code className="text-gray-300">:::fx[ドドド]&#123;.gekiga .vertical .lg&#125;</code>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default SyntaxHelp;
