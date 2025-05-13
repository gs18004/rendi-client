import wallpaper from '~/assets/img/wallpaper.png';
import Chat from '~/pages/ChatCoaching/components/Chat';
export default function LiveCoaching() {
  return (
    <div className="relative flex h-dvh w-full flex-col items-center">
      <img
        src={wallpaper}
        alt="wallpaper"
        className="wallpaper h-full w-full object-cover"
      />
      <div className="absolute top-10 w-full px-4">
        <Chat />
      </div>
    </div>
  );
}
