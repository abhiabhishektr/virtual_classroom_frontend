import React from 'react';

interface UserOption {
  name: string;
  email: string;
  profilePicture?: string;
}

interface UserDropdownProps {
  options: UserOption[];
  onSelect: (option: UserOption) => void;
  onClose: () => void;  // Callback to handle closing the dropdown
}

const UserDropdown: React.FC<UserDropdownProps> = ({ options, onSelect, onClose }) => {
  return (
    <div className="relative">
      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
        <div className="flex justify-end p-2">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        {options.length > 0 ? (
          options.map((option, index) => (
            <div
              key={index}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => onSelect(option)}
            >
              <img
                src={option.profilePicture || '/default-avatar.png'}
                alt={option.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <div className="font-semibold text-gray-800">{option.name}</div>
                <div className="text-gray-600 text-sm">{option.email}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-2 text-gray-600">No results found</div>
        )}
      </div>
    </div>
  );
};

export default UserDropdown;
