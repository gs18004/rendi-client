import { useRef, useState, useCallback, useEffect } from 'react';

interface SliderProps {
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  initialValue?: number;
  onChange?: (value: number) => void;
}

export default function Slider({
  min = 0,
  max = 100,
  minLabel = '',
  maxLabel = '',
  initialValue = 50,
  onChange,
}: SliderProps) {
  const [value, setValue] = useState(initialValue);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const percentage = ((value - min) / (max - min)) * 100;

  const calculateValue = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return min;

      const rect = track.getBoundingClientRect();
      const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const ratio = offsetX / rect.width;
      return Math.round(min + (max - min) * ratio);
    },
    [min, max],
  );

  const updateValue = useCallback(
    (clientX: number) => {
      const newValue = calculateValue(clientX);
      setValue(newValue);
      onChange?.(newValue);
    },
    [calculateValue, onChange],
  );

  const handleStart = useCallback(
    (clientX: number) => {
      isDraggingRef.current = true;
      updateValue(clientX);
    },
    [updateValue],
  );

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDraggingRef.current) return;
      updateValue(clientX);
    },
    [updateValue],
  );

  const handleEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        handleMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        handleEnd();
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault();
        handleMove(e.touches[0].clientX);
      }
    };

    const handleGlobalTouchEnd = () => {
      if (isDraggingRef.current) {
        handleEnd();
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchmove', handleGlobalTouchMove, {
      passive: false,
    });
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [handleMove, handleEnd]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleStart(e.clientX);
    },
    [handleStart],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      handleStart(e.touches[0].clientX);
    },
    [handleStart],
  );

  return (
    <div className="w-full max-w-md">
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative h-[5px] cursor-pointer select-none rounded-full bg-[#e0e0e0]">
        <div
          className="absolute h-[5px] rounded-full bg-[#2BCC9C]"
          style={{ width: `${percentage}%` }}
        />
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="absolute top-1/2 h-[19px] w-[19px] -translate-x-1/2 -translate-y-1/2 transform cursor-grab rounded-full border-[1.4px] border-solid border-[#2BCC9C] bg-white active:cursor-grabbing"
          style={{ left: `${percentage}%` }}
        />
      </div>
      <div className="mt-[7px] flex justify-between px-1 text-sm text-gray-400">
        <span className="text-[10px] font-medium text-[#8E8E8E]">
          {minLabel}
        </span>
        <span className="text-[10px] font-medium text-[#8E8E8E]">
          {maxLabel}
        </span>
      </div>
    </div>
  );
}
