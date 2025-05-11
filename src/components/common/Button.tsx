import clsx from 'clsx';
import { ComponentProps } from 'react';

type ButtonProps = {
  variant: 'prev' | 'next' | 'start' | 'signup-complete';
} & ComponentProps<'button'>;
export default function Button({ variant, ...restProps }: ButtonProps) {
  return (
    <button
      {...restProps}
      className={clsx(
        `flex w-full items-center justify-center rounded-xl py-[18px] text-base font-semibold text-white/90 disabled:bg-[#D7D9DF]`,
        {
          'bg-[#989AA3]': variant === 'prev',
          'bg-[#343953]': variant === 'next',
          'bg-[#2BCC9C]': variant === 'start' || variant === 'signup-complete',
        },
      )}>
      {variant === 'prev'
        ? '이전 단계'
        : variant === 'start'
          ? '시작하기'
          : variant === 'signup-complete'
            ? '가입 완료'
            : '다음 단계'}
    </button>
  );
}
