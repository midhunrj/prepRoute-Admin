interface Props {
  label: string;
  value: string;
  checked: boolean;
  onCheck: () => void;
  onChange: (value: string) => void;
}

const OptionInput = ({
  label,
  value,
  checked,
  onCheck,
  onChange,
}: Props) => {
  return (
    <div className="flex items-center gap-3">
      <input
        type="radio"
        checked={checked}
        onChange={onCheck}
      />

      <span className="font-medium">
        {label}
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Enter option"
        className="flex-1 border rounded-lg px-4 py-2"
      />
    </div>
  );
};

export default OptionInput;