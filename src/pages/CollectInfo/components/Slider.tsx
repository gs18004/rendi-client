import { useRef, useState, useCallback } from 'react';

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

  const percentage = ((value - min) / (max - min)) * 100;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const track = trackRef.current;
      if (!track) return;

      const updateValue = (clientX: number) => {
        const rect = track.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const ratio = Math.min(Math.max(offsetX / rect.width, 0), 1);
        const newValue = Math.round(min + (max - min) * ratio);
        setValue(newValue);
        onChange?.(newValue);
      };

      const onMouseMove = (e: MouseEvent) => updateValue(e.clientX);
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      updateValue(e.clientX);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [min, max, onChange],
  );

  return (
    <div className="w-full max-w-md">
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        className="relative h-[5px] cursor-pointer select-none rounded-full bg-[#e0e0e0]">
        <div
          className="absolute h-[5px] rounded-full bg-[#2BCC9C]"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute top-1/2 h-[19px] w-[19px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[1.4px] border-solid border-[#2BCC9C] bg-white"
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
