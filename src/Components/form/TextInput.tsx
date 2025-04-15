import ERROR_ICON from "../../assets/error-icon.svg";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
};

export const TextInput = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
}: Props) => (
  <div className="text-left">
    <label className="block font-normal text-textMain mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 rounded-[8px] outline-none border font-medium
        ${
          error
            ? "border-error bg-errorBg focus:border-error focus:ring-2 focus:ring-error"
            : "border-default bg-white focus:border-active focus:ring-2 focus:ring-active"
        }`}
    />
    {error && (
      <p className="text-error text-sm mt-2 flex gap-2 w-[250px]">
        <img src={ERROR_ICON} alt="Error icon" />
        {error}
      </p>
    )}
  </div>
);
