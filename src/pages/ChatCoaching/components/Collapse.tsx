import { useState } from 'react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

type CollapseProps = {
  title: string;
  description: string;
};
export default function Collapse({ title, description }: CollapseProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      className="flex w-full flex-col overflow-hidden rounded-[10px] bg-white"
      onClick={() => setIsOpen(!isOpen)}>
      <div className="flex w-full items-center justify-center bg-[#4e4e43c0] px-4 py-2.5">
        <p className="text-sm font-medium leading-none text-white">{title}</p>
      </div>
      {isOpen ? (
        <div className="markdown-content p-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {description}
          </ReactMarkdown>
        </div>
      ) : null}
    </button>
  );
}
