import wallpaper from '~/assets/img/wallpaper.png';
import Memo from '~/pages/ChatCoaching/components/Memo';

type ChatCoachingProps = {
  onClose: () => void;
  partnerMemory: {
    content: Record<string, string[]>;
  };
};

export default function ChatCoaching({
  onClose,
  partnerMemory,
}: ChatCoachingProps) {
  return (
    <div className="relative flex h-dvh w-full flex-col items-center">
      <img
        src={wallpaper}
        alt="wallpaper"
        className="wallpaper h-full w-full object-cover"
      />
      <div className="absolute top-10 w-full px-4">
        <Memo onClose={onClose} partnerMemory={partnerMemory} />
      </div>
    </div>
  );
}
