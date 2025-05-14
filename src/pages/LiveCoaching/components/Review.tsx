import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
type ReviewProps = {
  onClose: () => void;
};
export default function Review({ onClose }: ReviewProps) {
  const navigate = useNavigate();
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-[31px] bg-black/40 px-4"
      onClick={onClose}>
      <div
        className="flex h-[554px] w-[342px] flex-col items-center gap-[23px] rounded-[24px] bg-[#FAFAFA] px-10 pt-[30px]"
        onClick={(e) => e.stopPropagation()}>
        <p className="text-center text-base font-semibold leading-tight text-black">
          소개팅이 마무리 되었어요!
          <br />
          <span className="text-[10px] font-light leading-tight text-black">
            렌디가 오늘의 만남을 정리해봤어요.
          </span>
        </p>
        <div className="markdown-content h-full w-full overflow-y-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{`
# 오늘의 만남

## 소개팅 주제

- 소개팅 주제

| 주제 | 내용 |
| --- | --- |
| 소개팅 주제 | 소개팅 주제 |
| 소개팅 주제 | 소개팅 주제 |
| 소개팅 주제 | 소개팅 주제 |
| 소개팅 주제 | 소개팅 주제 |
          `}</ReactMarkdown>
        </div>
      </div>
      <button
        className="flex w-[342px] items-center justify-center rounded-xl bg-[#2BCC9C] py-[18px] text-base font-semibold text-white/85"
        onClick={(e) => {
          e.stopPropagation();
          navigate(PATH.ROOT);
        }}>
        홈 화면으로 이동
      </button>
    </div>
  );
}
