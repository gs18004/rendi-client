import checkedImg from '~/assets/svg/checked.svg';
import uncheckedImg from '~/assets/svg/unchecked.svg';
import fileCheckImg from '~/assets/svg/file-check.svg';
import { useSuspenseQueries } from '@tanstack/react-query';
import { checklistOptions } from '~/apis/checklistOptions';
import { usePostChecklistMutation } from '~/pages/Root/hooks/usePostChecklistMutation';
import { checklistItemsOptions } from '~/apis/checklistItemsOptions';

export default function CheckList() {
  const notStarted = false;
  const [{ data: checklistData }, { data: checklistItemsData }] =
    useSuspenseQueries({
      queries: [checklistOptions(), checklistItemsOptions()],
    });
  const { mutateAsync: postChecklist } = usePostChecklistMutation();
  const handleCheck = async (id: number, checked: boolean) => {
    await postChecklist({
      checked: !checked,
      item_id: id,
    });
  };
  const checklist = checklistData.map((item) => ({
    ...item,
    text: checklistItemsData.find(
      (checklistItem) => checklistItem.id === item.item_id,
    )?.text,
  }));
  return (
    <div className="bg-White flex w-full flex-col rounded-xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)]">
      <div className="flex w-full items-center gap-2 px-5 py-3.5">
        <p className="text-base font-semibold text-[#343953]">Check list</p>
        <p className="text-[10px] font-light text-[#343953]">
          {notStarted
            ? '소개팅 전, 체크 리스트로 꼼꼼히 준비해요!'
            : '두근두근 소개팅 전! 무엇을 챙겨볼까요?'}
        </p>
      </div>
      <div className="flex max-h-[300px] w-full flex-col gap-3 overflow-y-auto px-5 pb-3.5">
        {!notStarted ? (
          <div className="flex flex-col items-center gap-[15px] py-10">
            <img src={fileCheckImg} alt="file-check" />
            <p className="text-center text-sm font-semibold leading-tight text-[#2BCC9C]">
              소개팅 일정을 등록하면
              <br />
              체크 리스트를 확인 할 수 있어요!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {checklist.map((item) => (
              <div key={item.item_id} className="flex items-center gap-2.5">
                <button onClick={() => handleCheck(item.item_id, item.checked)}>
                  <img
                    src={item.checked ? checkedImg : uncheckedImg}
                    alt="check"
                  />
                </button>
                <p className="text-xs font-medium text-black">{item.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
