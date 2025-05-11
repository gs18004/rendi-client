import clsx from 'clsx';
import { TSubQuestion } from '~/pages/CollectInfo/types/collectInfo';
import chevronDown from '~/assets/svg/chevron-down.svg';
import { useRef } from 'react';
type SelectProps = {
  question: TSubQuestion;
  options: { label: string; value: string }[];
  answer: string;
  onAnswer: (value: string) => void;
};
export default function Select({
  question,
  options,
  answer,
  onAnswer,
}: SelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-2.5 rounded-lg bg-white px-[29px] py-3.5">
      <p className="w-full text-[10px] font-semibold text-black/90">
        {question.title}{' '}
        {!question.required ? (
          <span className="text-[10px] font-semibold text-[#2BCC9C]">
            *선택
          </span>
        ) : null}
      </p>
      <select
        ref={selectRef}
        value={answer}
        onChange={(e) => onAnswer(e.target.value)}
        className={clsx(
          'w-full cursor-pointer appearance-none bg-transparent text-[16px] font-normal outline-none',
          {
            'text-[#9CA3AF]': answer === '',
            'text-black': answer !== '',
          },
        )}>
        <option value="" disabled>
          {question.placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <img
        src={chevronDown}
        className="pointer-events-none absolute right-[29px]"
        alt="chevron down"
      />
    </div>
  );
}
