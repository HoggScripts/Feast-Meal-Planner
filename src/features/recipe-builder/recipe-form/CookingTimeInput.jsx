import { useState } from "react";

function CookingTimeInput() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleHoursChange = (e) => setHours(e.target.value);
  const handleMinutesChange = (e) => setMinutes(e.target.value);
  const handleSecondsChange = (e) => setSeconds(e.target.value);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Cooking Time</h2>
      <div className="flex justify-center space-x-4">
        <div className="flex flex-col items-center">
          <label htmlFor="hours" className="text-sm font-medium text-gray-700">
            Hours
          </label>
          <input
            id="hours"
            type="number"
            value={hours}
            onChange={handleHoursChange}
            min="0"
            className="mt-1 block w-16 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col items-center">
          <label
            htmlFor="minutes"
            className="text-sm font-medium text-gray-700"
          >
            Minutes
          </label>
          <input
            id="minutes"
            type="number"
            value={minutes}
            onChange={handleMinutesChange}
            min="0"
            className="mt-1 block w-16 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col items-center">
          <label
            htmlFor="seconds"
            className="text-sm font-medium text-gray-700"
          >
            Seconds
          </label>
          <input
            id="seconds"
            type="number"
            value={seconds}
            onChange={handleSecondsChange}
            min="0"
            className="mt-1 block w-16 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default CookingTimeInput;
