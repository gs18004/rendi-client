import clsx from 'clsx';
import { useState } from 'react';
import Modal from '~/pages/Root/components/Modal';
import { calculateDday } from '~/utils/date';
import calendarIcon from '~/assets/svg/calendar.svg';
import timeIcon from '~/assets/svg/time.svg';
import locationIcon from '~/assets/svg/location.svg';

export default function Top() {
  const name = '홍길동';
  const date: string | null = '2025-05-14';
  const time: string | null = '18:30';
  const place: string | null = '소개팅 장소';
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-[17px]">
      <p className="px-10 text-sm font-semibold leading-tight text-[#3C4043]">
        <span className="text-sm font-semibold leading-tight text-[#2BCC9C]">
          {name}
        </span>
        님의 소개팅, 같이 준비해볼까요?
      </p>
      <div
        className={clsx(
          'flex w-full items-center rounded-xl bg-white px-[78px] py-[29px]',
          {
            'flex-col': date === null,
            'gap-1': date === null,
            'gap-[46px]': date !== null,
          },
        )}>
        <p className="text-4xl font-bold text-[#2BCC9C]">
          D-
          {date === null
            ? '?'
            : calculateDday(date) === 0
              ? 'Day'
              : calculateDday(date)}
        </p>
        {date === null ? (
          <button
            className="rounded-[10px] bg-[#343953] px-5 py-2.5 text-xs font-semibold text-white"
            onClick={() => setIsModalOpen(true)}>
            소개팅 일정 등록하기
          </button>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <img src={calendarIcon} alt="calendar" />
              <p className="text-[8px] font-medium leading-tight text-black">
                {date}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <img src={timeIcon} alt="time" />
              <p className="text-[8px] font-medium leading-tight text-black">
                {time}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <img src={locationIcon} alt="location" />
              <p className="text-[8px] font-medium leading-tight text-black">
                {place}
              </p>
            </div>
          </div>
        )}
      </div>
      {isModalOpen ? <Modal onClose={() => setIsModalOpen(false)} /> : null}
    </div>
  );
}
