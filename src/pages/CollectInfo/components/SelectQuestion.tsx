import { type TSelectQuestion } from '~/pages/CollectInfo/types/collectInfo';

type SelectQuestionProps = {
  question: TSelectQuestion;
  answer: string[];
  onAnswer: (value: string[]) => void;
};
export default function SelectQuestion({
  question,
  answer,
  onAnswer,
}: SelectQuestionProps) {
  const isSelected = (value: string) => answer.includes(value);
  const maxChoice = question.maxChoice ?? Infinity;
  const toggleOption = (value: string) => {
    if (maxChoice === 1) {
      onAnswer([value]);
      return;
    }
    const next = isSelected(value)
      ? answer.filter((v) => v !== value)
      : [...answer, value];

    if (next.length > maxChoice) return;
    onAnswer(next);
  };
  return (
    <div className="flex w-full flex-col gap-[39px] px-[29px]">
      <p className="w-full text-center text-base font-semibold leading-tight text-black">
        {question.title}
        <span className="text-[10px] font-semibold leading-tight text-emerald-400">
          {question.maxChoice && question.maxChoice > 1
            ? ` 최대 ${question.maxChoice}개`
            : null}
        </span>
      </p>
      <div className="flex w-full flex-col gap-[22px]">
        {question.options.map((option) => (
          <div
            key={option.value}
            className="flex w-full items-center justify-between">
            <p className="text-sm font-medium text-black">{option.label}</p>
            <button
              className="flex h-6 w-6 items-center justify-center"
              onClick={() => toggleOption(option.value)}>
              {isSelected(option.value) ? (
                <SelectedCheck />
              ) : (
                <UnselectedCheck />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectedCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none">
      <g clipPath="url(#clip0_22_70)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.3444 24.2982C5.7983 24.2982 0.390625 18.8906 0.390625 12.3444C0.390625 5.7983 5.78912 0.390625 12.3352 0.390625C18.8814 0.390625 24.2982 5.7983 24.2982 12.3444C24.2982 18.8906 18.8906 24.2982 12.3444 24.2982ZM10.8759 18.3487C11.2156 18.3487 11.5094 18.1927 11.7298 17.853L17.8995 8.18525C18.0372 7.98327 18.1565 7.73538 18.1565 7.51503C18.1565 7.02843 17.725 6.72546 17.2752 6.72546C17.0089 6.72546 16.7427 6.88154 16.5407 7.19369L10.83 16.2738L7.79108 12.4636C7.55237 12.1607 7.30448 12.0505 7.01068 12.0505C6.56081 12.0505 6.18438 12.4086 6.18438 12.8952C6.18438 13.1247 6.2762 13.3726 6.43227 13.5654L9.97618 17.8621C10.2608 18.211 10.5362 18.3487 10.8759 18.3487Z"
          fill="#2BCC9C"
        />
      </g>
      <defs>
        <clipPath id="clip0_22_70">
          <rect
            width="23.9076"
            height="23.9076"
            fill="white"
            transform="translate(0.390625 0.390625)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
function UnselectedCheck() {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full border-[1.4px] border-solid border-[#D6D6D6]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none">
        <path
          d="M11.9551 0.0449223C18.5576 0.0449645 23.9102 5.39746 23.9102 12C23.9101 18.6025 18.5576 23.955 11.9551 23.9551C5.35254 23.9551 4.20453e-05 18.6025 0 12C0 5.73087 4.82554 0.589305 10.9648 0.0859379C4.86843 0.592934 0 5.78259 0 11.999C0.000165183 18.545 5.40807 23.9521 11.9541 23.9521C18.5 23.952 23.9071 18.5449 23.9072 11.999C23.9072 5.45443 18.4933 0.0474541 11.9492 0.0449223C11.9511 0.0449214 11.9532 0.0449223 11.9551 0.0449223ZM16.8838 6.37988C17.3337 6.37988 17.7656 6.68332 17.7656 7.16992C17.7655 7.39011 17.6464 7.63802 17.5088 7.83984L11.3389 17.5078C11.1185 17.8474 10.824 18.0029 10.4844 18.0029C10.1449 18.0028 9.86946 17.8653 9.58496 17.5166L6.04102 13.2197C5.88503 13.027 5.79303 12.7792 5.79297 12.5498C5.79297 12.0633 6.16944 11.7053 6.61914 11.7051C6.91294 11.7051 7.16168 11.8152 7.40039 12.1182L10.4385 15.9287L16.1494 6.84766C16.3513 6.53577 16.6177 6.37997 16.8838 6.37988ZM11.9492 0.0449223C11.6178 0.0450791 11.2895 0.0593204 10.9648 0.0859379C11.2881 0.0590565 11.6147 0.0449302 11.9443 0.0449223C11.9459 0.0449223 11.9477 0.0449217 11.9492 0.0449223Z"
          fill="#D6D6D6"
        />
      </svg>
    </div>
  );
}
