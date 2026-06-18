import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { TIME_OPTIONS } from '../../service/utils';

type LiveDuration = 'Always Available' | '1 Week' | '2 Weeks' | '3 Weeks' | '1 Month' | 'Custom Duration';

const LIVE_OPTIONS: LiveDuration[] = [
  'Always Available', '1 Week', '2 Weeks', '3 Weeks', '1 Month', 'Custom Duration',
];

interface LiveUntilProps {
  liveDuration: LiveDuration;
  setLiveDuration: (v: LiveDuration) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  endTime: string;
  setEndTime: (v: string) => void;
}

const LiveUntil: React.FC<LiveUntilProps> = ({
  liveDuration, setLiveDuration, endDate, setEndDate, endTime, setEndTime,
}) => (
  <div className="bg-white border border-gray-200 border-t-0 px-5 py-5">
    <h3 className="text-[15px] font-bold text-gray-800 mb-1.5">Live Until</h3>
    <p className="text-[13px] text-gray-400 mb-5">
      Choose how long this test should remain available on the platform.
    </p>


    <div className="grid grid-cols-2 gap-x-10 gap-y-4 mb-5">
      {LIVE_OPTIONS.map(opt => {
        const isChecked = liveDuration === opt;
        return (
          <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name="live_duration"
              value={opt}
              checked={isChecked}
              onChange={() => setLiveDuration(opt)}
              className="sr-only"
            />

            <span
              className={`
                w-4.5 h-4.5 w-[18px] h-[18px] rounded-full border-2 flex-shrink-0
                flex items-center justify-center transition-all
                ${isChecked ? 'border-[#4F6CF7]' : 'border-gray-300'}
              `}
            >
              {isChecked && (
                <span className="w-2 h-2 rounded-full bg-[#4F6CF7] block" />
              )}
            </span>
            <span className="text-[13px] text-gray-700">{opt}</span>
          </label>
        );
      })}
    </div>


    {liveDuration === 'Custom Duration' && (
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 rounded-lg text-[13px] text-gray-700 outline-none focus:border-[#4F6CF7] transition-colors"
            placeholder="Select End Date"
          />
          <Calendar size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative flex-1">
          <select
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="w-full appearance-none px-3.5 py-2.5 pr-9 border border-gray-200 rounded-lg text-[13px] text-gray-500 outline-none focus:border-[#4F6CF7] transition-colors bg-white cursor-pointer"
          >
            <option value="">Select End Time</option>
            {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
    )}
  </div>
);

export default LiveUntil;
export type { LiveDuration };
