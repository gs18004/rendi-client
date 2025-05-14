import zoomImg from '~/assets/img/zoom.png';
import closeIcon from '~/assets/svg/close.svg';
import { PATH } from '~/constants/path';
import { useNavigate } from 'react-router-dom';
import Collapse from '~/pages/ChatCoaching/components/Collapse';
export default function Memo() {
  const navigate = useNavigate();
  return (
    <div className="flex max-h-[700px] w-full flex-col items-center gap-2 rounded-[20px] bg-white/60 p-3 backdrop-blur-3xl">
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-[13px]">
          <div className="flex h-[35px] w-[35px] items-center justify-center rounded-[7.5px] bg-white">
            <img src={zoomImg} alt="icon" className="h-[25px] w-[25px]" />
          </div>
          <div className="flex w-full flex-col gap-1">
            <p className="text-sm font-bold leading-none text-black">
              상대방 정보 메모
            </p>
            <p className="text-sm font-normal leading-none text-black">
              상대방의 중요 정보를 요약해드릴게요!
            </p>
          </div>
        </div>
        <button onClick={() => navigate(PATH.LIVE_COACHING)}>
          <img src={closeIcon} alt="close" />
        </button>
      </div>
      <div className="mt-5 h-full w-full overflow-y-auto">
        <div className="flex w-full flex-col gap-2">
          <Collapse title="직업 및 학업" description="- 개발자" />
          <Collapse title="취미 활동" description="- 개발" />
          <Collapse title="좋아하는 음식" description="- 치킨" />
        </div>
      </div>
    </div>
  );
}
