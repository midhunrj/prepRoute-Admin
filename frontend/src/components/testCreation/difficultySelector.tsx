interface Props {
  value: string;
  onChange: (value: string) => void;
}

const levels = [
  "easy",
  "medium",
  "hard",
];

const DifficultySelector = ({
  value,
  onChange,
}: Props) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">
        Difficulty
      </label>

      <div className="flex gap-5">
        {levels.map((level) => (
          <label
            key={level}
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              checked={value === level}
              onChange={() =>
                onChange(level)
              }
            />

            {level}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;