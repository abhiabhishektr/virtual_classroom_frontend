// src/components/Chat/ChatPageComponet.tsx
// import React from 'react';
// import GroupList from './GroupList';
// import ChatWindow from './ChatWindow';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import { IGroup, IMessage } from '../../types/chat';

// interface ChatPageProps {
//   groups: IGroup[];
//   selectedGroup: IGroup | null;
//   setSelectedGroup: (group: IGroup) => void;
//   messages: IMessage[];
// }

// const ChatPageComponent: React.FC<ChatPageProps> = ({
//   groups,
//   selectedGroup,
//   setSelectedGroup,
//   messages,
// }) => {
//   const { email, name } = useSelector((state: RootState) => state.profile);
//   const currentUsername = email;
//   const currentName = name;


//   return (
//     <div className="flex bg-white text-gray-800 h-full">
//       <GroupList
//         groups={groups}
//         currentUser={currentUsername}
//         selectedGroup={selectedGroup}
//         setSelectedGroup={setSelectedGroup}
//       />
//       <ChatWindow
//         messages={messages}
//         selectedGroup={selectedGroup}
//         currentUsername={currentUsername}
//         currentName={currentName}
//       />
//     </div>
//   );
// };

// export default ChatPageComponent;



// src/components/Chat/ChatPageComponent.tsx
import React, { useState } from 'react';
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

  // State to handle the visibility of the group list on small screens
  const [showChatWindow, setShowChatWindow] = useState(false);

  const handleGroupSelect = (group: IGroup) => {
    setSelectedGroup(group);
    setShowChatWindow(true);
  };

  const goBack = ()=>{
    setShowChatWindow(false)
  }

  return (
    <div className="flex bg-white text-gray-800 h-full">
      {/* Group List: Always visible on large screens, toggled on small screens */}
      <div className={`md:flex md:w-1/4 ${showChatWindow ? 'hidden' : 'flex'} w-full`}>
        <GroupList
          groups={groups}
          currentUser={currentUsername}
          selectedGroup={selectedGroup}
          setSelectedGroup={handleGroupSelect} // Handle group selection
        />
      </div>

      {/* Chat Window: Hidden until a group is selected on small screens */}
      <div className={`md:w-3/4 ${showChatWindow ? 'flex' : 'hidden'} w-full`}>
        {selectedGroup && (
          <ChatWindow
            messages={messages}
            selectedGroup={selectedGroup}
            currentUsername={currentUsername}
            currentName={currentName}
            goBack={goBack}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPageComponent;
