import { useState } from 'react';
type CollapseProps = {
  title: string;
  description: string[];
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
        <div className="whitespace-pre-line p-4">
          {description.map((d) => (
            <p key={d} className="text-sm font-normal leading-none text-black">
              - {d}
            </p>
          ))}
        </div>
      ) : null}
    </button>
  );
}
