import gifshot from 'gifshot';
import { toPng } from 'html-to-image';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Editor, Preview, SyntaxHelp, Toolbar } from './components';
import { parseMFML } from './lib/parser';
import { sampleCode } from './lib/styles';

function App() {
  const [code, setCode] = useState(sampleCode);
  const previewRef = useRef<HTMLDivElement>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // MFMLをパースしてトークンに変換
  const tokens = useMemo(() => parseMFML(code), [code]);

  // プリセットを挿入
  const handleInsertPreset = useCallback((preset: string) => {
    setCode((prev) => prev + '\n\n' + preset);
  }, []);

  // コードをクリア
  const handleClear = useCallback(() => {
    if (window.confirm('エディタの内容をクリアしますか？')) {
      setCode('');
    }
  }, []);

  // コードをコピー
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setNotification('📋 コピーしました！');
      setTimeout(() => setNotification(null), 2000);
    } catch (err) {
      setNotification('❌ コピーに失敗しました');
      setTimeout(() => setNotification(null), 2000);
    }
  }, [code]);

  // GIFとしてエクスポート
  const handleExportGif = useCallback(async () => {
    if (!previewRef.current) return;

    try {
      setNotification('🎞️ コマ撮り中 (約2秒)...');

      const frames: string[] = [];
      const frameCount = 12; // 12枚に削減 (約1.2秒)
      const interval = 100;

      for (let i = 0; i < frameCount; i++) {
        const dataUrl = await toPng(previewRef.current, {
          backgroundColor: '#ffffff',
          pixelRatio: 1.0, // 解像度を抑えてデータ量を削減
        });
        frames.push(dataUrl);
        await new Promise(resolve => setTimeout(resolve, interval));
      }

      setNotification('⚙️ GIF生成中...');

      gifshot.createGIF({
        images: frames,
        gifWidth: previewRef.current.offsetWidth,
        gifHeight: previewRef.current.offsetHeight,
        interval: 0.1,
        numFrames: frameCount,
        sampleInterval: 5, // 色解析を高速化
      }, (obj: any) => {
        if (!obj.error) {
          const link = document.createElement('a');
          link.download = `mfml-fx-${Date.now()}.gif`;
          link.href = obj.image;
          link.click();
          setNotification('✅ GIFを書き出しました！');
        } else {
          setNotification('❌ GIF生成に失敗しました');
        }
        setTimeout(() => setNotification(null), 2000);
      });
    } catch (err) {
      console.error(err);
      setNotification('❌ 書き出しに失敗しました');
      setTimeout(() => setNotification(null), 2000);
    }
  }, []);
  // 画像としてエクスポート
  const handleExport = useCallback(async () => {
    if (!previewRef.current) return;

    try {
      setNotification('📸 準備中...');
      const dataUrl = await toPng(previewRef.current, {
        backgroundColor: undefined,
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `mfml-fx-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      setNotification('✅ 書き出しました！');
      setTimeout(() => setNotification(null), 2000);
    } catch (err) {
      console.error(err);
      setNotification('❌ 書き出しに失敗しました');
      setTimeout(() => setNotification(null), 2000);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="px-6 py-4 border-b border-purple-500/30 bg-gray-900/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
              🎌 MFML Editor
            </h1>
            <p className="text-purple-300/70 text-sm mt-1">
              MangaFX Markup Language - 漫画効果音記法エディタ
            </p>
          </div>
          <div className="text-purple-400/50 text-xs">
            v0.1.0
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
        {/* エディタパネル */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-gray-800/80 rounded-xl border border-purple-500/30 overflow-hidden flex-1 flex flex-col">
            {/* ツールバー */}
            <Toolbar
              onInsertPreset={handleInsertPreset}
              onClear={handleClear}
              onCopy={handleCopy}
              onExport={handleExport}
              onExportGif={handleExportGif}
            />

            {/* エディタ */}
            <div className="flex-1">
              <Editor value={code} onChange={setCode} />
            </div>
          </div>

          {/* 記法ヘルプ */}
          <SyntaxHelp />
        </div>

        {/* プレビューパネル */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-purple-500/30 overflow-hidden h-full min-h-[400px] flex flex-col">
            <div className="px-4 py-2 bg-gray-100 border-b flex items-center justify-between">
              <span className="text-gray-600 text-sm font-medium">
                👁️ プレビュー
              </span>
              <span className="text-gray-400 text-xs">
                {tokens.filter(t => t.type === 'fx').length} エフェクト
              </span>
            </div>
            <div className="flex-1 preview-bg overflow-auto">
              <div ref={previewRef}>
                <Preview tokens={tokens} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="px-6 py-3 border-t border-purple-500/20 bg-gray-900/30">
        <div className="flex items-center justify-between text-xs text-purple-400/50">
          <span>MFML - MangaFX Markup Language</span>
          <span>Made with 💜</span>
        </div>
      </footer>

      {/* 通知 */}
      {notification && (
        <div className="fixed bottom-8 right-8 px-4 py-2 bg-gray-800 border border-purple-500/50 
                      rounded-lg text-purple-200 text-sm shadow-lg animate-bounce-fx">
          {notification}
        </div>
      )}
    </div>
  );
}

export default App;
