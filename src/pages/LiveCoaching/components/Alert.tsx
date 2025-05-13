import clsx from 'clsx';

type AlertProps = {
  title: string;
  description: string;
  image: string;
  disabled?: boolean;
  details?: {
    title: string;
    description: string;
  }[];
  onClick?: () => void;
};

export default function Alert({
  title,
  description,
  image,
  disabled = false,
  details,
  onClick,
}: AlertProps) {
  return (
    <button
      className={clsx(
        'flex w-full items-center justify-between gap-2 rounded-[20px] p-3 backdrop-blur-3xl',
        {
          'bg-white/10': disabled,
          'bg-white/60': !disabled,
        },
      )}
      onClick={onClick}>
      <div className="flex h-[35px] w-[35px] items-center justify-center rounded-[7.5px] bg-white">
        <img src={image} alt="icon" className="h-[25px] w-[25px]" />
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className="text-sm font-bold leading-none text-black">{title}</p>
        <p className="text-sm font-normal leading-none text-black">
          {description}
        </p>
        {details !== undefined ? (
          <div className="mt-2 flex w-full flex-col gap-1">
            {details.map((detail) => (
              <div className="flex w-full flex-col gap-1 rounded-[10px] bg-white p-2.5">
                <p className="text-xs font-semibold leading-none text-black">
                  {detail.title}
                </p>
                <p className="whitespace-pre-line text-[10px] font-medium leading-none text-black">
                  {detail.description}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </button>
  );
}
