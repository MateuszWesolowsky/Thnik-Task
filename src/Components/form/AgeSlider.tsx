import ERROR_ICON from "../../assets/error-icon.svg";
type Props = {
  label: string;
  name: string;
  error?: string;
  value: number;
  range1: number;
  range2: number;
  min: number;
  max: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AgeSlider = ({
  label,
  name,
  error,
  value,
  range1,
  range2,
  min,
  max,
  onChange,
}: Props) => {
  return (
    <div className="w-full max-w-md mx-auto rounded text-left text-textMain">
      <label className="block font-normal mb-2">{label}</label>
      <div className="flex justify-between text-sm px-1">
        <span>{range1}</span>
        <span>{range2}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          className="w-full appearance-none h-1 rounded outline-none 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-[#761BE4] 
            [&::-webkit-slider-thumb]:cursor-pointer 
            [&::-webkit-slider-thumb]:border-none
            [&::-moz-range-thumb]:bg-[#761BE4]
            [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:cursor-pointer
            bg-gradient-to-r from-[#761BE4] to-[#cbb6e5] bg-no-repeat"
          style={{
            background: `linear-gradient(to right, #761BE4 ${value}%, #CBB6E5 ${value}%)`,
          }}
        />

        <div
          className="absolute -bottom-10 translate-x-[-30%] flex flex-col items-center"
          style={{ left: `calc(${value}%)` }}
        >
          <div className="w-2 h-2 bg-white border-l border-t border-[#CBB6E5] rotate-45 absolute -top-[4px]"></div>
          <div className="bg-white border border-[#CBB6E5] text-[#761BE4] w-[37px] h-[31px] text-sm font-medium flex items-center justify-center rounded shadow-sm">
            {value}
          </div>
        </div>
      </div>
      {error && (
        <p className="text-error text-sm mt-12 flex gap-2">
          <img src={ERROR_ICON} alt="Error icon" />
          {error}
        </p>
      )}
    </div>
  );
};
