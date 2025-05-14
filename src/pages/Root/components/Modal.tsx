import { useState } from 'react';
import Input from '~/components/common/Input';
import { usePostScheduleMutation } from '~/pages/Root/hooks/usePostScheduleMutation';
import { formatDateString } from '~/utils/date';

type ModalProps = {
  onClose: () => void;
};
export default function Modal({ onClose }: ModalProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');

  const { mutateAsync: postPartnersSchedule } = usePostScheduleMutation();
  const isValidDate = /^\d{8}$/.test(date);
  const isValidTime = /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
  const isValidPlace = place.trim().length > 0;
  const isFormValid = isValidDate && isValidTime && isValidPlace;
  const handleSave = async () => {
    if (!isFormValid) return;
    await postPartnersSchedule({
      meeting_date: formatDateString(date),
      meeting_time: time + ':00.000Z',
      meeting_place: place,
    });
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-[342px] flex-col items-center gap-[26px] rounded-xl bg-[#FAFAFA] p-5">
        <p className="text-center text-base font-semibold leading-tight text-black">
          소개팅 일정 등록하기
          <br />
          <span className="text-[10px] font-light leading-tight text-black">
            만남의 순간을 잊지 않게, 미리 준비해볼까요?
          </span>
        </p>
        <div className="flex w-full flex-col gap-[13px]">
          <Input
            question={{
              id: 1,
              title: '소개팅 날짜',
              required: true,
              placeholder: '8자로 작성해주세요 (ex. 20250524)',
            }}
            answer={date}
            onAnswer={setDate}
          />
          <Input
            question={{
              id: 2,
              title: '소개팅 시간',
              required: true,
              placeholder: '00:00 형식으로 작성해주세요 (ex. 18:30)',
            }}
            answer={time}
            onAnswer={setTime}
          />
          <Input
            question={{
              id: 3,
              title: '소개팅 장소',
              required: true,
              placeholder: '소개팅 장소를 작성해주세요',
            }}
            answer={place}
            onAnswer={setPlace}
          />
        </div>
        <div className="flex w-full items-center gap-4">
          <button
            className="w-full rounded-[10px] bg-[#989AA3] px-5 py-2.5 text-center text-xs font-semibold text-white"
            onClick={onClose}>
            취소
          </button>
          <button
            className="w-full rounded-[10px] bg-[#343953] px-5 py-2.5 text-center text-xs font-semibold text-white"
            onClick={handleSave}
            disabled={!isFormValid}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
