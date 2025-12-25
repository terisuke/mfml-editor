import React from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  placeholder = ':::fx[ゴゴゴ]{.jojo} のように入力...',
}) => {
  return (
    <div className="relative h-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        className="editor-textarea w-full h-full min-h-[200px] p-4 bg-transparent text-purple-100 
                 text-sm resize-none focus:outline-none leading-relaxed placeholder-purple-400/50"
      />

      {/* 行番号表示（オプション） */}
      {/* <div className="absolute left-0 top-0 p-4 text-gray-600 text-sm select-none pointer-events-none">
        {value.split('\n').map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div> */}
    </div>
  );
};

export default Editor;
