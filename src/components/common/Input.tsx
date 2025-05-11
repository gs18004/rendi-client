import clsx from 'clsx';
import { useState } from 'react';
import { TSubQuestion } from '~/pages/CollectInfo/types/collectInfo';

type InputProps = {
  question: TSubQuestion;
  answer: string;
  onAnswer: (value: string) => void;
  size?: 'base' | 'large';
};
export default function Input({
  question,
  answer,
  onAnswer,
  size = 'base',
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative flex w-full flex-col items-center gap-2.5 rounded-lg bg-white px-[29px] py-3.5">
      <p
        className={clsx('w-full text-[10px] font-semibold', {
          'text-[#2BCC9Ce6]': isFocused,
          'text-black/90': !isFocused,
        })}>
        {question.title}{' '}
        {!question.required ? (
          <span className="text-[10px] font-semibold text-[#2BCC9C]">
            *선택
          </span>
        ) : null}
      </p>
      <input
        type="text"
        value={answer}
        onChange={(e) => onAnswer(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={question.placeholder}
        className={clsx('w-full font-normal text-black outline-none', {
          'text-[12px]': size === 'base',
          'text-[16px]': size === 'large',
        })}
      />
      {isFocused ? (
        <div className="absolute bottom-0 h-[3px] w-[calc(100%-58px)] bg-[#2BCC9C] opacity-70" />
      ) : null}
    </div>
  );
}
