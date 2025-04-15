interface Props {
  time: string;
  onClick: () => void;
  isActive: boolean;
}

export const Time = ({ time, onClick, isActive }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 rounded-[8px]  bg-white focus:border-active ${
        isActive ? "border-2 border-active" : "border border-default"
      }`}
    >
      {time}
    </div>
  );
};
