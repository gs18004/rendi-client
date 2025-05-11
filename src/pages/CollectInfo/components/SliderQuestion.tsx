import Slider from '~/pages/CollectInfo/components/Slider';
import { TSliderQuestion } from '~/pages/CollectInfo/types/collectInfo';

type SliderQuestionProps = {
  question: TSliderQuestion;
  answer: number;
  onAnswer: (value: number) => void;
};

export default function SliderQuestion({
  question,
  answer,
  onAnswer,
}: SliderQuestionProps) {
  return (
    <div className="mt-[81px] flex w-full flex-col items-center gap-[35px] px-[26px]">
      <p className="w-full text-center text-base font-semibold leading-tight text-black">
        {question.title}
      </p>
      <Slider
        initialValue={answer}
        onChange={onAnswer}
        minLabel={question.minLabel}
        maxLabel={question.maxLabel}
      />
    </div>
  );
}
