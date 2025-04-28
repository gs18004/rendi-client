import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

interface ErrorProps {
  error: Error;
  resetErrorBoundary: () => void;
  fullScreen?: boolean;
}

export default function Error({ resetErrorBoundary, fullScreen }: ErrorProps) {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  return (
    <div
      className={clsx(
        'flex min-h-dvh flex-col items-center justify-center gap-3',
        {
          'fixed left-0 top-0 h-screen w-screen': fullScreen,
          'relative h-full w-full': !fullScreen,
        },
      )}>
      <p className="text-lg font-bold text-[#202020]">문제가 발생했어요.</p>
      <div className="flex items-center gap-3">
        <button
          onClick={resetErrorBoundary}
          className="flex w-20 cursor-pointer items-center justify-center rounded bg-[#e1f8f2] px-4 py-2 text-[#47a68a]">
          재시도
        </button>
        <button
          onClick={goHome}
          className="flex w-20 cursor-pointer items-center justify-center rounded bg-[#59D1AD] px-4 py-2 text-white">
          홈으로
        </button>
      </div>
    </div>
  );
}
