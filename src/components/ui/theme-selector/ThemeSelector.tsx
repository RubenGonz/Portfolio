export const ThemeSelector = () => {
  return <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" className="sr-only peer" />
    <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-emerald-500 transition-colors duration-300"></div>
    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full flex items-center justify-center transition-all duration-300 peer-checked:translate-x-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-400 peer-checked:text-emerald-600 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" className="peer-checked:hidden" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" className="hidden peer-checked:block" />
      </svg>
    </div>
  </label>
};