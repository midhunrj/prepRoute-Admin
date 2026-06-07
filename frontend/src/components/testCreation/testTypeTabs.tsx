interface Props {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

const TestTypeTabs = ({
  tabs,
  activeTab,
  onChange,
}: Props) => {
  return (
    <div className="flex border-b mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-5 py-3 border-b-2 text-sm font-medium transition
          ${
            activeTab === tab
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TestTypeTabs;