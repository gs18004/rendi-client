import { useNavigate } from 'react-router-dom';
import heartImg from '~/assets/img/heart.png';
import { PATH } from '~/constants/path';
export default function AiRendiButton() {
  const navigate = useNavigate();
  return (
    <button
      className="relative h-[149px] w-full overflow-hidden rounded-xl bg-gradient-to-bl from-[#F3FFE9] to-[#A8FFE5] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)]"
      onClick={() => navigate(PATH.LIVE_COACHING)}>
      <div className="absolute bottom-5 left-5">
        <p className="text-[10px] font-light text-[#343953]">
          소개팅에서 뭐라고 말할지 고민된다면?
        </p>
        <p className="text-2xl font-extrabold text-[#343953]">
          실시간 코칭 AI Rendi
        </p>
      </div>
      <div className="absolute bottom-3 right-[-17px]">
        <div className="relative h-[100px] w-[100px]">
          <div className="absolute right-[-30px] z-10 h-[87px] w-[87px] bg-white blur-[30px]" />
          <img
            src={heartImg}
            alt="heart"
            className="absolute bottom-0 right-0 z-0 h-[100px] w-[100px] rotate-[15deg]"
          />
        </div>
      </div>
      <div className="absolute right-[68px] top-3">
        <div className="relative h-10 w-10">
          <div className="absolute left-0 top-0 z-10 h-10 w-10 bg-white blur-[30px]" />
          <img
            src={heartImg}
            alt="heart"
            className="absolute left-0 top-0 z-0 h-10 w-10 rotate-[-3deg]"
          />
        </div>
      </div>
    </button>
  );
}
