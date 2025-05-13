import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '~/assets/svg/logo.svg';
import Button from '~/components/common/Button';
import Input from '~/components/common/Input';
import Select from '~/components/common/Select';
import { PATH } from '~/constants/path';
import { usePostProfileMutation } from '~/pages/SignUp/hooks/usePostProfileMutation';

const ageOptions = Array.from({ length: 21 }, (_, i) => ({
  value: String(i + 20),
  label: `${i + 20}세`,
}));
const genderOptions = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' },
];
const regionOptions = [
  { value: 'seoul', label: '서울' },
  { value: 'gyeonggi', label: '경기' },
  { value: 'incheon', label: '인천' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'gwangju', label: '광주' },
  { value: 'daejeon', label: '대전' },
  { value: 'ulsan', label: '울산' },
  { value: 'gangwon', label: '강원' },
  { value: 'chungbuk', label: '충북' },
  { value: 'chungnam', label: '충남' },
  { value: 'jeonbuk', label: '전북' },
  { value: 'jeonnam', label: '전남' },
  { value: 'gyeongbuk', label: '경북' },
  { value: 'gyeongnam', label: '경남' },
  { value: 'sejong', label: '세종' },
  { value: 'jeju', label: '제주' },
];
const mbtiOptions = [
  { value: 'ISTJ', label: 'ISTJ' },
  { value: 'ISFJ', label: 'ISFJ' },
  { value: 'INTJ', label: 'INTJ' },
  { value: 'INFJ', label: 'INFJ' },
  { value: 'ISTP', label: 'ISTP' },
  { value: 'ISFP', label: 'ISFP' },
  { value: 'INTP', label: 'INTP' },
  { value: 'INFP', label: 'INFP' },
  { value: 'ESTJ', label: 'ESTJ' },
  { value: 'ESFJ', label: 'ESFJ' },
  { value: 'ENTJ', label: 'ENTJ' },
  { value: 'ENFJ', label: 'ENFJ' },
  { value: 'ESTP', label: 'ESTP' },
  { value: 'ESFP', label: 'ESFP' },
  { value: 'ENTP', label: 'ENTP' },
  { value: 'ENFP', label: 'ENFP' },
];
const smokingOptions = [
  { value: 'smoker', label: '흡연자' },
  { value: 'nonSmoker', label: '비흡연자' },
];

export default function SignUp() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
  });

  const canMoveNext = answer[1] && answer[2] && answer[3] && answer[6];
  const { mutateAsync: postProfile } = usePostProfileMutation();
  const onComplete = async () => {
    if (canMoveNext) {
      await postProfile({
        name: answer[1],
        age: Number(answer[2]),
        gender: answer[3],
        region: answer[4],
        mbti: answer[5],
        smoking: answer[6] === 'smoker',
      });
      navigate(PATH.COLLECT_INFO);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 pt-[93px]">
      <div className="mb-[37px] flex flex-col items-center gap-[18px]">
        <img src={logo} className="h-[78px] w-[78px]" />
        <p className="text-center text-[16px] font-semibold leading-[20px]">
          당신에 대해 알려주세요!
          <br />
          <span className="text-[10px] font-thin">
            랜디가 소개팅 상황에서 든든한 대화 파트너가 되어드릴게요 😊
          </span>
        </p>
      </div>
      <div className="mb-4 h-[calc(100dvh-380px)] w-full overflow-y-scroll">
        <div className="flex w-full flex-col items-center gap-[25px] px-4">
          <Input
            question={{
              id: 1,
              title: '이름',
              placeholder: '이름을 입력하세요',
              required: true,
            }}
            answer={answer[1]}
            onAnswer={(value) => setAnswer({ ...answer, 1: value })}
            size="large"
          />
          <Select
            question={{
              id: 2,
              title: '나이',
              placeholder: '나이를 선택하세요',
              required: true,
            }}
            options={ageOptions}
            answer={answer[2]}
            onAnswer={(value) => setAnswer({ ...answer, 2: value })}
          />
          <Select
            question={{
              id: 3,
              title: '성별',
              placeholder: '성별을 선택하세요',
              required: true,
            }}
            options={genderOptions}
            answer={answer[3]}
            onAnswer={(value) => setAnswer({ ...answer, 3: value })}
          />
          <Select
            question={{
              id: 4,
              title: '거주 지역',
              placeholder: '거주 지역을 선택하세요',
              required: false,
            }}
            options={regionOptions}
            answer={answer[4]}
            onAnswer={(value) => setAnswer({ ...answer, 4: value })}
          />
          <Select
            question={{
              id: 5,
              title: 'MBTI',
              placeholder: 'MBTI를 선택하세요',
              required: false,
            }}
            options={mbtiOptions}
            answer={answer[5]}
            onAnswer={(value) => setAnswer({ ...answer, 5: value })}
          />
          <Select
            question={{
              id: 6,
              title: '흡연 여부',
              placeholder: '흡연 여부를 선택하세요',
              required: true,
            }}
            options={smokingOptions}
            answer={answer[6]}
            onAnswer={(value) => setAnswer({ ...answer, 6: value })}
          />
        </div>
      </div>
      <Button
        variant="signup-complete"
        onClick={onComplete}
        disabled={!canMoveNext}
      />
    </div>
  );
}
