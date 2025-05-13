import checkedImg from '~/assets/svg/checked.svg';
import uncheckedImg from '~/assets/svg/unchecked.svg';

export default function CheckList() {
  const checkList = [
    {
      id: 1,
      title: '약속 시간, 장소 다시 확인하기',
      checked: true,
    },
    {
      id: 2,
      title: '헤어 / 피부 / 손톱 상태 점검하기',
      checked: false,
    },
    {
      id: 3,
      title: '데일리룩 미리 코디해보기',
      checked: false,
    },
  ];
  return (
    <div className="bg-White flex w-full flex-col rounded-xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)]">
      <div className="flex w-full items-center gap-2 px-5 py-3.5">
        <p className="text-base font-semibold text-[#343953]">Check list</p>
        <p className="text-[10px] font-light text-[#343953]">
          두근두근 소개팅 전! 무엇을 챙겨볼까요?
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 px-5 pb-3.5">
        {checkList.map((item) => (
          <div key={item.id} className="flex items-center gap-2.5">
            <button>
              <img src={item.checked ? checkedImg : uncheckedImg} alt="check" />
            </button>
            <p className="text-xs font-medium text-black">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
