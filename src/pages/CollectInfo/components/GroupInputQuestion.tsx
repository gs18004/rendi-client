import Input from '~/components/common/Input';
import {
  TGroupInputQuestion,
  TSubAnswerMap,
} from '~/pages/CollectInfo/types/collectInfo';

type GroupInputQuestionProps = {
  question: TGroupInputQuestion;
  answer: TSubAnswerMap;
  onAnswer: (value: TSubAnswerMap) => void;
};

export default function GroupInputQuestion({
  question,
  answer,
  onAnswer,
}: GroupInputQuestionProps) {
  return (
    <div className="flex w-full flex-col gap-[25px]">
      {question.subQuestions.map((subQuestion, index) => (
        <Input
          key={index}
          question={subQuestion}
          answer={answer[subQuestion.id] ?? ''}
          onAnswer={(value) => {
            onAnswer({
              ...answer,
              [subQuestion.id]: value,
            });
          }}
        />
      ))}
    </div>
  );
}
