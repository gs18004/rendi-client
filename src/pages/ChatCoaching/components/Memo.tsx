import zoomImg from '~/assets/img/zoom.png';
import closeIcon from '~/assets/svg/close.svg';
import Collapse from '~/pages/ChatCoaching/components/Collapse';

type MemoProps = {
  onClose: () => void;
  partnerMemory: {
    content: Record<string, string[]>;
  };
};

export default function Memo({ onClose, partnerMemory }: MemoProps) {
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
        <button onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </button>
      </div>
      <div className="mt-5 h-full w-full overflow-y-auto">
        <div className="flex w-full flex-col gap-2">
          {Object.entries(partnerMemory.content).map(([key, value]) => (
            <Collapse key={key} title={key} description={value} />
          ))}
        </div>
      </div>
    </div>
  );
}
