import heartImg from '~/assets/img/heart.png';
import Button from '~/components/common/Button';

type PartnerInfoStartProps = {
  onComplete: () => void;
};
export default function PartnerInfoStart({
  onComplete,
}: PartnerInfoStartProps) {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-between bg-gradient-to-b from-[#2BCC9C] to-[#FAFAFA] px-4 pb-20">
      <div className="mt-[30dvh] flex flex-col items-center gap-[46px]">
        <div className="relative flex h-[136px] w-[136px] items-center justify-center">
          <img
            src={heartImg}
            alt="heart"
            className="absolute z-10 h-[136px] min-h-[136px] w-[136px] min-w-[136px]"
          />
          <div className="absolute h-[115px] w-[115px] rounded-full bg-white blur-[50px]" />
        </div>
        <p className="text-center text-base font-semibold leading-tight text-black">
          소개팅 상대 정보 등록하기
          <br />
          <span className="text-[10px] font-light leading-tight text-black">
            프로필, 대화 분위기, 첫 인사 등으로 유추해보는 가벼운 인상
            체크리스트!
          </span>
        </p>
      </div>
      <Button variant="start" onClick={onComplete} />
    </div>
  );
}
