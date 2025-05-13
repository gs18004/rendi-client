import logo from '~/assets/svg/logo.svg';
import closeIcon from '~/assets/svg/close.svg';
import sendIcon from '~/assets/svg/send.svg';
import { PATH } from '~/constants/path';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Chat() {
  const navigate = useNavigate();
  const rendiChat = `청담이라면 분위기 좋은 데 많죠! 소개팅 2차로 딱 좋은 3곳 추천드릴게요:

도산분식 – 트렌디한 감성의 한식 바, 캐주얼하면서도 세련된 분위기.
챔버 – 조용하고 어두운 조도에 와인 한 잔 가능한 바, 대화 집중에 좋아요.
카페 오르 – 늦은 밤까지 운영하는 디저트 바. 가볍게 앉아 이야기 나누기 좋아요.
필요하면 분위기별로 더 추천해드릴까요? 💬`;

  const [chat, setChat] = useState('');
  const [myChat, setMyChat] = useState('');
  const [gotAnswer, setGotAnswer] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGotAnswer(true);
    setMyChat(chat);
    // api 호출
  };

  return (
    <div className="flex h-[445px] w-full flex-col items-center gap-2 rounded-[20px] bg-white/60 p-3 backdrop-blur-3xl">
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-[13px]">
          <img src={logo} alt="logo" className="h-[35px] w-[35px]" />
          <div className="flex w-full flex-col gap-1">
            <p className="text-sm font-bold leading-none text-black">
              AI 코칭 Chat 렌디
            </p>
            <p className="text-sm font-normal leading-none text-black">
              코칭봇 렌디에게 질문을 시작해보세요.
            </p>
          </div>
        </div>
        <button onClick={() => navigate(PATH.LIVE_COACHING)}>
          <img src={closeIcon} alt="close" />
        </button>
      </div>
      <div className="mt-5 h-full w-full overflow-y-auto">
        <div className="flex flex-col gap-3">
          {myChat !== '' ? (
            <div className="flex w-full justify-end">
              <div className="max-w-[270px] rounded-[10px] bg-[#4E4E4Ec0] px-4 py-2.5 text-[10px] font-medium leading-[14px] text-white">
                {myChat}
              </div>
            </div>
          ) : null}
          {gotAnswer ? (
            <div className="flex w-full justify-start">
              <div className="max-w-[270px] whitespace-pre-line rounded-[10px] bg-[#ffffffc0] px-4 py-2.5 text-[10px] font-medium leading-[14px] text-black">
                {rendiChat}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {gotAnswer ? null : (
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center rounded-[10px] bg-white px-4 py-2.5">
          <input
            className="w-full text-[10px] font-medium leading-none outline-none"
            autoFocus
            placeholder="질문을 입력하세요."
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          />
          <button className="mb-0.5 mr-[-4px]" disabled={chat === ''}>
            <img src={sendIcon} alt="send" />
          </button>
        </form>
      )}
    </div>
  );
}
