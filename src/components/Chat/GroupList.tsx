// src/components/Chat/GroupList.tsx
import React from 'react';
import { Input } from '../ui/input';
import { IGroup } from '../../types/chat';


interface GroupListProps {
  groups: IGroup[];
  currentUser: string;
  selectedGroup: IGroup | null;
  setSelectedGroup: (group: IGroup) => void;
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  selectedGroup,
  setSelectedGroup,
}) => {
  return (
    <div className="w-full h-[87vh] bg-gray-200 text-gray-800 p-4 flex flex-col rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Chats</h2>
        <div className="flex items-center">
        </div>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search groups"
          className="w-full p-2 rounded-lg bg-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <h3 className="text-md font-semibold mb-2">Groups</h3>
      <ul className="flex-1 overflow-y-auto">
        {groups.length > 0 ? (
          groups.map((group) => (
            <li
              key={group.groupId}
              className={`p-3 cursor-pointer rounded-lg mb-2 transition-colors duration-200 ${
                selectedGroup?.groupId === group.groupId
                  ? 'bg-zinc-700  text-white'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setSelectedGroup(group)}
            >
              {group.groupName}
            </li>
          ))
        ) : (
          <li className="p-3 rounded-lg text-gray-500 text-center">No groups available</li>
        )}
      </ul>
    </div>
  );
};

export default GroupList;