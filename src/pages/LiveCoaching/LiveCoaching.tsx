import wallpaper from '~/assets/img/wallpaper.png';
import bottomExitImg from '~/assets/svg/bottom-exit.svg';
import bottomChatImg from '~/assets/svg/bottom-chat.svg';
import { useDateTime } from '~/components/hooks/useDateTime';
import Alert from '~/pages/LiveCoaching/components/Alert';
import chatImg from '~/assets/img/chat.png';
import { useState } from 'react';
import fireImg from '~/assets/img/fire.png';
import { PATH } from '~/constants/path';
import { useNavigate } from 'react-router-dom';
import Review from '~/pages/LiveCoaching/components/Review';
export default function LiveCoaching() {
  const dateTime = useDateTime();
  const navigate = useNavigate();
  const [activeAlert, setActiveAlert] = useState<number | null>(null);
  const [showReview, setShowReview] = useState(false);
  const toggleAlert = (index: number) => {
    if (activeAlert === index) {
      setActiveAlert(null);
    } else {
      setActiveAlert(index);
    }
  };
  const details1 = [
    {
      title: '🎵 요즘 자주 듣는 노래나 아티스트 있어요?',
      description: '음악 취향을 공유하며 자연스럽게 감성 교류하기 좋아요.',
    },
    {
      title: '🎬 최근에 본 영화나 드라마 중 추천해주세요!',
      description: '콘텐츠를 매개로 이야기 흐름을 이어가기 쉬워요.',
    },
  ];
  const details2 = [
    {
      title: '“오, 요가요? 왠지 잘 어울리는데요!”',
      description:
        '내가 잘 몰라도 상대의 취향을 존중하고 긍정하는 태도를 먼저 보여주는 게 좋아요.',
    },
    {
      title:
        '“요가하면 몸이 진짜 유연해지나요? 어떤 점이 가장 좋아서 계속 하시는 거예요?”',
      description: '상대방이 자신이 좋아하는 걸 설명할 수 있는 기회를 줘요.',
    },
  ];
  return (
    <div className="relative flex h-dvh w-full flex-col items-center">
      <img
        src={wallpaper}
        alt="wallpaper"
        className="wallpaper h-full w-full object-cover"
      />
      <div className="absolute top-[70px] flex flex-col items-center justify-center gap-2">
        <p className="text-xl font-medium text-white">{dateTime.date}</p>
        <p className="text-[80px] font-bold text-white">{dateTime.time}</p>
      </div>
      <div className="absolute top-[200px] flex">
        <div className="flex w-[100px] flex-col items-center gap-3">
          <p className="text-[10px] font-medium leading-tight text-white">
            상대방의 호감도
          </p>
          <div className="h-[21px] w-[87px] overflow-hidden rounded-[6px] border-[1px] border-solid border-white bg-white/50">
            <div
              className="h-full bg-gradient-to-r from-[#FFF2A4] to-[#2BCC9C]"
              style={{
                width: '70%',
              }}
            />
          </div>
        </div>
        <div className="flex w-[100px] flex-col items-center gap-3">
          <p className="text-[10px] font-medium leading-tight text-white">
            나의 표현 점수
          </p>
          <div className="h-[21px] w-[87px] overflow-hidden rounded-[6px] border-[1px] border-solid border-white bg-white/50">
            <div
              className="h-full bg-gradient-to-r from-[#FFF2A4] to-[#FF8686]"
              style={{
                width: '60%',
              }}
            />
          </div>
        </div>
        <div className="flex w-[100px] flex-col items-center gap-1">
          <p className="text-[10px] font-medium leading-tight text-white">
            대화 비율
          </p>
          <p className="text-2xl font-bold leading-tight text-white">7 : 3</p>
          <div className="flex items-center gap-6">
            <p className="text-[6px] font-medium text-white">나</p>
            <p className="text-[6px] font-medium text-white">상대</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-11 flex w-full items-center justify-between px-10">
        <button>
          <img
            src={bottomExitImg}
            alt="exit"
            onClick={() => setShowReview(true)}
          />
        </button>
        <button>
          <img
            src={bottomChatImg}
            alt="chat"
            onClick={() => navigate(PATH.CHAT_COACHING)}
          />
        </button>
      </div>
      <div className="absolute bottom-[118px] flex w-full flex-col gap-[7px] px-4">
        <Alert
          title="새로운 대화 주제 추천 받기"
          description={
            activeAlert === 0
              ? '부담없이 가벼운 대화주제를 준비했어요!'
              : '대화 주제를 전환시켜볼까요?'
          }
          image={chatImg}
          disabled={activeAlert !== 0 && activeAlert !== null}
          onClick={() => toggleAlert(0)}
          details={activeAlert === 0 ? details1 : undefined}
        />
        <Alert
          title="리액션 코칭 요청하기"
          description={
            activeAlert === 1 ? '' : '🚨긴급상황🚨 AI 코칭을 요청해보세요.'
          }
          image={fireImg}
          disabled={activeAlert !== 1 && activeAlert !== null}
          onClick={() => toggleAlert(1)}
          details={activeAlert === 1 ? details2 : undefined}
        />
      </div>
      {showReview ? <Review onClose={() => setShowReview(false)} /> : null}
    </div>
  );
}
