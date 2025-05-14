import clsx from 'clsx';
import { useState } from 'react';
import Modal from '~/pages/Root/components/Modal';
import { calculateDday } from '~/utils/date';
import calendarIcon from '~/assets/svg/calendar.svg';
import timeIcon from '~/assets/svg/time.svg';
import locationIcon from '~/assets/svg/location.svg';
import { useSuspenseQueries } from '@tanstack/react-query';
import { profileOptions } from '~/apis/profileOptions';
import { schedulesOptions } from '~/apis/schedulesOptions';

export default function Top() {
  const [{ data: profile }, { data: schedules }] = useSuspenseQueries({
    queries: [profileOptions(), schedulesOptions()],
  });
  const name = profile.profile?.name;
  const date = schedules.meeting_date;
  const time = schedules.meeting_time;
  const place = schedules.meeting_place;
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
          'flex w-full items-center rounded-xl bg-white p-[29px]',
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
