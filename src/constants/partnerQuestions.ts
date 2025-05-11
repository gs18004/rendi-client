import { type TQuestion } from '~/pages/CollectInfo/types/collectInfo';

export const PARTNER_QUESTIONS: TQuestion[] = [
  {
    id: 1,
    type: 'select',
    title: '카카오톡 프로필 분위기',
    maxChoice: 1,
    options: [
      { label: '밝고 유쾌한 느낌 (이모지/사진 활용 多)', value: '1' },
      { label: '깔끔하고 미니멀한 스타일', value: '2' },
      { label: '감성적이거나 분위기 있는 이미지', value: '3' },
      { label: '활동적인 느낌 (여행/운동 사진 등)', value: '4' },
      { label: '딱히 꾸미지 않음 or 비공개', value: '5' },
    ],
  },
  {
    id: 2,
    type: 'select',
    title: '첫 인사 톤',
    maxChoice: 1,
    options: [
      { label: '말투가 부드럽고 공손한 편', value: '1' },
      { label: '쿨하고 간단한 스타일', value: '2' },
      { label: '다정하고 말 많은 편', value: '3' },
      { label: '밍밍하지만 나쁘진 않은 느낌', value: '4' },
      { label: '아직 판단하기 어려움', value: '5' },
    ],
  },
  {
    id: 3,
    type: 'select',
    title: '답장 템포',
    maxChoice: 1,
    options: [
      { label: '답장이 빠르고 자주 와요', value: '1' },
      { label: '일정한 간격으로 답해요', value: '2' },
      { label: '느리지만 성의는 느껴져요', value: '3' },
      { label: '느리고 건조한 느낌이에요', value: '4' },
      { label: '아직 잘 모르겠어요', value: '5' },
    ],
  },
  {
    id: 4,
    type: 'select',
    title: '예상되는 직업 or 학과 이미지',
    maxChoice: 1,
    options: [
      { label: '딱 봐도 전문직 or 직무 강한 느낌', value: '1' },
      { label: '감성적이거나 예술계열 같음', value: '2' },
      { label: '활발하고 사교적인 직군으로 보여요', value: '3' },
      { label: '안정적이고 현실적인 느낌', value: '4' },
      { label: '아직 잘 모르겠어요', value: '5' },
    ],
  },
  {
    id: 5,
    type: 'select',
    title: '대화 주도권 스타일',
    maxChoice: 1,
    options: [
      { label: '주로 먼저 말을 걸어와요', value: '1' },
      { label: '질문을 잘 던지는 편이에요', value: '2' },
      { label: '리액션 위주로 답해줘요', value: '3' },
      { label: '묻지 않으면 조용한 편이에요', value: '4' },
      { label: '아직 잘 모르겠어요', value: '5' },
    ],
  },
];
