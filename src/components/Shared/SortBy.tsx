import React from 'react';

interface SortByProps {
  onSort: (sortOption: string) => void;
  disabled?: boolean; // Add the disabled prop
}

const SortBy: React.FC<SortByProps> = ({ onSort, disabled }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!disabled) {
      onSort(event.target.value);
    }
  };

  return (
    <div className="relative">
      <select
        onChange={handleSortChange}
        disabled={disabled} // Apply disabled attribute
        className={`appearance-none w-full bg-white border border-gray-300 px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'hover:border-gray-400'}`}
      >
        <option value="default">Sort by</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default SortBy;
