import { useNavigate } from 'react-router-dom';

export default function CollectInfoComplete() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  return (
    <div
      className="flex h-dvh w-full flex-col items-center justify-center px-4 py-8"
      onClick={goHome}>
      <div className="flex flex-col items-center gap-[34px]">
        <div>
          <div className="flex h-[159px] w-[159px] items-center justify-center rounded-full bg-[#FFEFC0] text-[90px]">
            👏
          </div>
        </div>
        <p className="text-center text-[22px] font-semibold text-black">
          모든 수집이 완료되었어요!
          <br />
          <br />
          <span className="text-[12px] font-light text-black">
            랭디가 당신의 성향과 취향을 더욱 잘 이해할 수 있었습니다.
            <br />
            이제, 당신의 매력적인 면을 더 잘 표현할 준비가 되었어요! 😊
          </span>
        </p>
      </div>
    </div>
  );
}
