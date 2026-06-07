import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface ScheduleRowProps {
  scheduleDate: string;
  setScheduleDate: (v: string) => void;
  scheduleTime: string;
  setScheduleTime: (v: string) => void;
}

const TIME_OPTIONS = Array.from({ length: 24 }, (_, h) => [
  `${String(h).padStart(2, '0')}:00`,
  `${String(h).padStart(2, '0')}:30`,
]).flat();

const ScheduleRow: React.FC<ScheduleRowProps> = ({
  scheduleDate, setScheduleDate, scheduleTime, setScheduleTime,
}) => (
  <div className="bg-white border border-gray-200 border-t-0 px-5 py-3.5 flex gap-4">
    
    <div className="relative flex-1">
      <input
        type="date"
        value={scheduleDate}
        onChange={e => setScheduleDate(e.target.value)}
        className="w-full px-3.5 py-2.5 pr-10 border border-gray-200 rounded-lg text-[13px] text-gray-700 outline-none focus:border-[#4F6CF7] transition-colors"
        placeholder="Select Date"
      />
      <Calendar size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>

    
    <div className="relative flex-1">
      <select
        value={scheduleTime}
        onChange={e => setScheduleTime(e.target.value)}
        className="w-full appearance-none px-3.5 py-2.5 pr-9 border border-gray-200 rounded-lg text-[13px] text-gray-500 outline-none focus:border-[#4F6CF7] transition-colors bg-white cursor-pointer"
      >
        <option value="">Select Time</option>
        {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

export default ScheduleRow;
