import clsx from 'clsx';
import { useDateTime } from '~/components/hooks/useDateTime';

type AlertProps = {
  title: string;
  description: string;
  image: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function Alert({
  title,
  description,
  image,
  disabled = false,
  children,
  onClick,
}: AlertProps) {
  const dateTime = useDateTime();

  return (
    <button
      className={clsx(
        'flex w-full items-start justify-between rounded-[20px] p-3 backdrop-blur-3xl',
        {
          'bg-white/10': disabled,
          'bg-white/60': !disabled,
        },
      )}
      onClick={onClick}>
      <div className="flex items-center gap-2">
        <div className="flex h-[35px] w-[35px] items-center justify-center rounded-[7.5px] bg-white">
          <img src={image} alt="icon" className="h-[25px] w-[25px]" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold leading-none text-black">{title}</p>
          <p className="text-sm font-normal leading-none text-black">
            {description}
          </p>
          {children}
        </div>
      </div>
      <p className="text-xs font-normal text-neutral-700">{dateTime.time12h}</p>
    </button>
  );
}
