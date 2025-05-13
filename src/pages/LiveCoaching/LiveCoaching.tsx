import wallpaper from '~/assets/img/wallpaper.png';
import bottomExitImg from '~/assets/svg/bottom-exit.svg';
import bottomChatImg from '~/assets/svg/bottom-chat.svg';
import { useDateTime } from '~/components/hooks/useDateTime';
import Alert from '~/pages/LiveCoaching/components/Alert';
import chatImg from '~/assets/img/chat.png';
import megaPhoneImg from '~/assets/img/megaPhone.png';
import fireImg from '~/assets/img/fire.png';
import heartImg from '~/assets/img/heart2.png';
import zoomImg from '~/assets/img/zoom.png';
export default function LiveCoaching() {
  const dateTime = useDateTime();

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
      <div className="absolute bottom-11 flex w-full items-center justify-between px-10">
        <button>
          <img src={bottomExitImg} alt="exit" />
        </button>
        <button>
          <img src={bottomChatImg} alt="chat" />
        </button>
      </div>
      <div className="absolute bottom-6 h-[4.5px] w-[150px] rounded-full bg-white" />
      <div className="absolute bottom-[118px] flex w-full flex-col gap-[7px] px-4">
        <Alert
          title="오늘의 목표"
          description="오늘의 목표를 설정해주세요."
          image={chatImg}
        />
      </div>
    </div>
  );
}
