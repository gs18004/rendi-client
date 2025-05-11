// questions
export type TSelectQuestion = {
  id: number;
  type: 'select';
  title: string;
  maxChoice?: number;
  options: { label: string; value: string }[];
};

export type TSliderQuestion = {
  id: number;
  type: 'slider';
  title: string;
  minLabel: string;
  maxLabel: string;
  min: number;
  max: number;
  step?: number;
};

export type TMultipleChoiceQuestion = {
  id: number;
  type: 'multiple_choice';
  title: string;
  options: { label: string; value: string }[];
};

export type TGroupInputQuestion = {
  id: number;
  type: 'group_input';
  subQuestions: TSubQuestion[];
};

export type TQuestion =
  | TSelectQuestion
  | TSliderQuestion
  | TMultipleChoiceQuestion
  | TGroupInputQuestion;

export type TQuestionType = TQuestion['type'];

export type TSubQuestion = {
  id: number;
  title: string;
  placeholder?: string;
  required?: boolean;
};

// answers
export type TAnswer = string | number | string[] | TSubAnswerMap;

export type AnswerMap = Record<number, TAnswer>;

export type TSubAnswerMap = Record<number, string>;
