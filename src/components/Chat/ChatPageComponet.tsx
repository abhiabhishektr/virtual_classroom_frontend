// src/components/Chat/ChatPageComponet.tsx
import React from 'react';
import GroupList from './GroupList';
import ChatWindow from './ChatWindow';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IGroup, IMessage } from '../../types/chat';

interface ChatPageProps {
  groups: IGroup[];
  selectedGroup: IGroup | null;
  setSelectedGroup: (group: IGroup) => void;
  messages: IMessage[];
}

const ChatPageComponent: React.FC<ChatPageProps> = ({
  groups,
  selectedGroup,
  setSelectedGroup,
  messages,
}) => {
  const { email, name } = useSelector((state: RootState) => state.profile);
  const currentUsername = email;
  const currentName = name;


  return (
    <div className="flex bg-white text-gray-800 h-full">
      <GroupList
        groups={groups}
        currentUser={currentUsername}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      <ChatWindow
        messages={messages}
        selectedGroup={selectedGroup}
        currentUsername={currentUsername}
        currentName={currentName}
      />
    </div>
  );
};

export default ChatPageComponent;