import clsx from 'clsx';
import { Fragment } from 'react/jsx-runtime';
import { TOTAL_STEPS } from '~/constants/questions';

type ProgressBarProps = {
  currentStep: number;
};
export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps = Array.from({ length: TOTAL_STEPS }, (_, index) => index + 1);
  return (
    <div className="flex">
      {steps.map((step, index) => (
        <Fragment key={step}>
          <div className="flex flex-col items-center gap-1">
            {step < currentStep ? (
              <FinishedStep />
            ) : step === currentStep ? (
              <CurrentStep />
            ) : (
              <UnfinishedStep />
            )}
            <p className="text-[10px] font-medium leading-none tracking-wide text-neutral-400">
              {step}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={clsx('mt-2.5 h-[1px] w-[38px]', {
                'bg-[#2BCC9C]': step < currentStep,
                'bg-[#C6C6C6]': step >= currentStep,
              })}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}

function FinishedStep() {
  return (
    <div className="flex h-5 w-5 items-center justify-center rounded-full border-[1px] border-solid border-[#2BCC9C] bg-[#2BCC9C]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none">
        <path
          d="M7.05297 10.3867C6.91964 10.3867 6.79297 10.3334 6.69964 10.2401L4.81297 8.3534C4.61964 8.16007 4.61964 7.84007 4.81297 7.64673C5.0063 7.4534 5.3263 7.4534 5.51964 7.64673L7.05297 9.18007L10.4796 5.7534C10.673 5.56007 10.993 5.56007 11.1863 5.7534C11.3796 5.94673 11.3796 6.26673 11.1863 6.46006L7.4063 10.2401C7.31297 10.3334 7.1863 10.3867 7.05297 10.3867Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

function CurrentStep() {
  return (
    <div className="flex h-5 w-5 items-center justify-center rounded-full border-[1px] border-solid border-[#2BCC9C] bg-white">
      <div className="h-1 w-1 rounded-full bg-[#2BCC9C]" />
    </div>
  );
}

function UnfinishedStep() {
  return (
    <div className="flex h-5 w-5 items-center justify-center rounded-full border-[1px] border-solid border-[#C6C6C6]" />
  );
}
