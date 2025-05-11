import { useState } from 'react';
import { PARTNER_QUESTIONS } from '~/constants/partnerQuestions';
import Button from '~/components/common/Button';
import GroupInputQuestion from '~/pages/CollectInfo/components/GroupInputQuestion';
import MultipleChoiceQuestion from '~/pages/CollectInfo/components/MultipleChoiceQuestion';
import SelectQuestion from '~/pages/CollectInfo/components/SelectQuestion';
import SliderQuestion from '~/pages/CollectInfo/components/SliderQuestion';
import heartImg from '~/assets/img/heart.png';
import type {
  TAnswer,
  TGroupInputQuestion,
  TSelectQuestion,
  TSliderQuestion,
  TMultipleChoiceQuestion,
  AnswerMap,
  TQuestion,
  TSubAnswerMap,
} from '~/pages/CollectInfo/types/collectInfo';

type CollectPartnerInfoProps = {
  onComplete: () => void;
};

export default function CollectPartnerInfo({
  onComplete,
}: CollectPartnerInfoProps) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const currentQuestion = PARTNER_QUESTIONS[currentQuestionId];
  const updateAnswer = (questionId: number, value: TAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };
  const answer = answers[currentQuestion.id];

  const goBack = () => {
    setCurrentQuestionId((prev) => prev - 1);
  };
  const goNext = () => {
    if (currentQuestionId === PARTNER_QUESTIONS.length - 1) {
      // api 호출
      onComplete();
    }
    setCurrentQuestionId((prev) => prev + 1);
  };

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-between px-4 py-8">
      <div className="flex w-full flex-col items-center gap-9">
        <div className="flex flex-col items-center gap-[17px]">
          <img src={heartImg} alt="heart" className="h-[61px] w-[61px]" />
          <p className="text-base font-semibold leading-tight text-black">
            소개팅 상대 정보 등록하기
          </p>
        </div>
        <RenderQuestion
          {...getRenderProps(currentQuestion, updateAnswer, answer)}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <Button
          variant="prev"
          onClick={goBack}
          disabled={currentQuestionId === 0}
        />
        <Button
          variant="next"
          onClick={goNext}
          disabled={
            (currentQuestion.type !== 'group_input' && answer === undefined) ||
            (Array.isArray(answer) && answer.length === 0)
          }
        />
      </div>
    </div>
  );
}

type RenderQuestionProps =
  | {
      type: 'select';
      question: TSelectQuestion;
      answer: string[];
      onAnswer: (value: string[]) => void;
    }
  | {
      type: 'slider';
      question: TSliderQuestion;
      answer: number;
      onAnswer: (value: number) => void;
    }
  | {
      type: 'multiple_choice';
      question: TMultipleChoiceQuestion;
      answer: string[];
      onAnswer: (value: string[]) => void;
    }
  | {
      type: 'group_input';
      question: TGroupInputQuestion;
      answer: TSubAnswerMap;
      onAnswer: (value: TSubAnswerMap) => void;
    };

function RenderQuestion(props: RenderQuestionProps) {
  switch (props.type) {
    case 'select':
      return (
        <SelectQuestion
          question={props.question}
          answer={props.answer}
          onAnswer={props.onAnswer}
        />
      );
    case 'slider':
      return (
        <SliderQuestion
          question={props.question}
          answer={props.answer}
          onAnswer={props.onAnswer}
        />
      );
    case 'multiple_choice':
      return (
        <MultipleChoiceQuestion
          question={props.question}
          answer={props.answer}
          onAnswer={props.onAnswer}
        />
      );
    case 'group_input':
      return (
        <GroupInputQuestion
          question={props.question}
          answer={props.answer}
          onAnswer={props.onAnswer}
        />
      );
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === 'string');
}

function isSubAnswerMap(value: unknown): value is TSubAnswerMap {
  return typeof value === 'object' && !Array.isArray(value);
}

function getRenderProps(
  question: TQuestion,
  updateAnswer: (id: number, value: TAnswer) => void,
  answer: TAnswer | undefined,
): RenderQuestionProps {
  switch (question.type) {
    case 'select':
      if (isStringArray(answer)) {
        return {
          type: 'select',
          question,
          answer,
          onAnswer: (value) => updateAnswer(question.id, value),
        };
      }
      return {
        type: 'select',
        question,
        answer: [],
        onAnswer: (value) => updateAnswer(question.id, value),
      };

    case 'slider':
      if (typeof answer === 'number') {
        return {
          type: 'slider',
          question,
          answer,
          onAnswer: (value) => updateAnswer(question.id, value),
        };
      }
      return {
        type: 'slider',
        question,
        answer: 50,
        onAnswer: (value) => updateAnswer(question.id, value),
      };

    case 'multiple_choice':
      if (isStringArray(answer)) {
        return {
          type: 'multiple_choice',
          question,
          answer,
          onAnswer: (value) => updateAnswer(question.id, value),
        };
      }
      return {
        type: 'multiple_choice',
        question,
        answer: [],
        onAnswer: (value) => updateAnswer(question.id, value),
      };

    case 'group_input':
      if (isSubAnswerMap(answer)) {
        return {
          type: 'group_input',
          question,
          answer,
          onAnswer: (value) => updateAnswer(question.id, value),
        };
      }
      return {
        type: 'group_input',
        question,
        answer: {},
        onAnswer: (value) => updateAnswer(question.id, value),
      };
  }
}
