interface NumberStepperProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const NumberStepper = ({
  label,
  value,
  onChange,
}: NumberStepperProps) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">
        {label}
      </label>

      <div className="flex border rounded-lg overflow-hidden">
        <input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(Number(e.target.value))
          }
          className="flex-1 px-4 py-3 outline-none"
        />

        <div className="flex flex-col border-l">
          <button
            type="button"
            onClick={() => onChange(value + 1)}
            className="px-3 py-1 hover:bg-slate-100"
          >
            ▲
          </button>

          <button
            type="button"
            onClick={() => onChange(value - 1)}
            className="px-3 py-1 hover:bg-slate-100"
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberStepper;