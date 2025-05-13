import { useState } from 'react';
import { QUESTIONS, STEP_END_IDS, STEP_LABELS } from '~/constants/questions';
import Button from '~/components/common/Button';
import GroupInputQuestion from '~/pages/CollectInfo/components/GroupInputQuestion';
import MultipleChoiceQuestion from '~/pages/CollectInfo/components/MultipleChoiceQuestion';
import ProgressBar from '~/components/common/ProgressBar';
import SelectQuestion from '~/pages/CollectInfo/components/SelectQuestion';
import SliderQuestion from '~/pages/CollectInfo/components/SliderQuestion';
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
import { usePostSurveyLifestyleMutation } from '~/pages/CollectInfo/hooks/usePostSurveyLifestyleMutation';
import { usePostSurveyIdentifyMutation } from '~/pages/CollectInfo/hooks/usePostSurveyIdentifyMutation';
import { usePostSurveyBeliefsMutation } from '~/pages/CollectInfo/hooks/usePostSurveyBeliefsMutation';
import { usePostSurveyPreferenceMutation } from '~/pages/CollectInfo/hooks/usePostSurveyPreferenceMutation';
import { usePostSurveyEssayMutation } from '~/pages/CollectInfo/hooks/usePostSurveyEssayMutation';
import { isArray } from 'es-toolkit/compat';

type CollectMyInfoProps = {
  onComplete: () => void;
};

export default function CollectMyInfo({ onComplete }: CollectMyInfoProps) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const currentQuestion = QUESTIONS[currentQuestionId];
  const currentStep = getCurrentStep(currentQuestionId);
  const updateAnswer = (questionId: number, value: TAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };
  const answer = answers[currentQuestion.id];

  const { mutateAsync: postSurveyLifestyle } = usePostSurveyLifestyleMutation();
  const { mutateAsync: postSurveyIdentify } = usePostSurveyIdentifyMutation();
  const { mutateAsync: postSurveyPreference } =
    usePostSurveyPreferenceMutation();
  const { mutateAsync: postSurveyBeliefs } = usePostSurveyBeliefsMutation();
  const { mutateAsync: postSurveyEssay } = usePostSurveyEssayMutation();

  const goBack = () => {
    setCurrentQuestionId((prev) => prev - 1);
  };
  const goNext = async () => {
    if (currentQuestionId === QUESTIONS.length - 1) {
      const answersArr = Object.entries(answers).map(([key, value]) =>
        isArray(value)
          ? {
              question_id: Number(key),
              option_ids: value,
            }
          : {
              question_id: Number(key),
              option_ids: [value.toString()],
            },
      );
      let essayAnswer: TAnswer = {};
      const essayAnswerArr = Object.entries(answers).filter(
        ([key]) => Number(key) === STEP_END_IDS[4],
      );
      if (essayAnswerArr.length > 0) {
        essayAnswer = essayAnswerArr[0][1] as TAnswer;
      }

      await postSurveyLifestyle({
        answers: answersArr.filter(
          (answer) => answer.question_id <= STEP_END_IDS[0],
        ),
      });
      await postSurveyIdentify({
        answers: answersArr.filter(
          (answer) =>
            answer.question_id > STEP_END_IDS[0] &&
            answer.question_id <= STEP_END_IDS[1],
        ),
      });
      await postSurveyPreference({
        answers: answersArr.filter(
          (answer) =>
            answer.question_id > STEP_END_IDS[1] &&
            answer.question_id <= STEP_END_IDS[2],
        ),
      });
      await postSurveyBeliefs({
        answers: answersArr.filter(
          (answer) =>
            answer.question_id > STEP_END_IDS[2] &&
            answer.question_id <= STEP_END_IDS[3],
        ),
      });
      await postSurveyEssay({
        answers: Object.entries(essayAnswer).map(([key, value]) => ({
          sub_question_id: Number(key),
          text: value.toString(),
        })),
      });
      onComplete();
    }
    setCurrentQuestionId((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-between gap-4 px-4 py-8">
      <div className="flex w-full flex-col items-center gap-9">
        <ProgressBar currentStep={currentStep} />
        <p className="text-center text-base font-semibold leading-tight text-black">
          {STEP_LABELS[currentStep - 1].title}
          <br />
          <span className="text-[10px] font-light leading-tight text-black">
            {STEP_LABELS[currentStep - 1].description}
          </span>
        </p>
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

function getCurrentStep(currentQuestionId: number) {
  if (currentQuestionId < STEP_END_IDS[0]) return 1;
  if (currentQuestionId < STEP_END_IDS[1]) return 2;
  if (currentQuestionId < STEP_END_IDS[2]) return 3;
  if (currentQuestionId < STEP_END_IDS[3]) return 4;
  return 5;
}
