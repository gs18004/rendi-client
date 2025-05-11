import clsx from 'clsx';
import { type TMultipleChoiceQuestion } from '~/pages/CollectInfo/types/collectInfo';
import { chunk } from '~/utils/array';

type MultipleChoiceQuestionProps = {
  question: TMultipleChoiceQuestion;
  answer: string[];
  onAnswer: (value: string[]) => void;
};
export default function MultipleChoiceQuestion({
  question,
  answer,
  onAnswer,
}: MultipleChoiceQuestionProps) {
  const isSelected = (value: string) => answer.includes(value);

  const toggleOption = (value: string) => {
    const next = isSelected(value)
      ? answer.filter((v) => v !== value)
      : [...answer, value];
    onAnswer(next);
  };
  return (
    <div className="flex w-full flex-col items-center gap-[39px]">
      <p className="w-full text-center text-base font-semibold leading-tight text-black">
        {question.title}
      </p>
      <div className="flex w-[345px] flex-col gap-[14px]">
        {chunk(question.options, 4).map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full justify-between">
            {row.map((option) => (
              <button
                key={option.value}
                onClick={() => toggleOption(option.value)}
                className={clsx(
                  'flex items-center justify-center rounded-full border-[1px] border-solid px-3 py-0.5 text-sm font-medium leading-snug',
                  {
                    'border-[#2BCC9C] text-[#2BCC9C]': isSelected(option.value),
                    'border-[#c6c6c6] text-[#c6c6c6]': !isSelected(
                      option.value,
                    ),
                  },
                )}>
                {option.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
