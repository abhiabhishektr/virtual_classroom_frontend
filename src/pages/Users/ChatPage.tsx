// src/pages/Users/ChatPage.tsx
import React, { useEffect, useState } from 'react';
import { getGroup, getMessagesForGroup } from '../../api/chat/chatApi';
import ChatPageComponent from '../../components/Chat/ChatPageComponet';
import { IGroup, IMessage } from '../../types/chat';
import { useSocket } from '../../hooks/useSocket'; 

const ChatPage: React.FC = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupData = await getGroup();
        setGroups(groupData);
        if (groupData.length > 0 && groupData[0]) {
          setSelectedGroup(groupData[0]);
        } else {
          setSelectedGroup(null);  
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedGroup) {
        try {
          const messagesData = await getMessagesForGroup(selectedGroup.groupId);
          setMessages(messagesData);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
  }, [selectedGroup]);

  useEffect(() => {
    if (selectedGroup && socket) {
      // Join the selected group room
      socket.emit('joinRoom', selectedGroup.groupId);

      // Listen for new messages
      socket.on('message', (newMessage: IMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });

      // Clean up on component unmount or when group changes
      return () => {
        socket.off('message');
      };
    }
    return undefined; // Returning undefined when there's no cleanup to perform
  }, [selectedGroup, socket]);

  const handleGroupSelect = (group: IGroup) => {
    setSelectedGroup(group);
  };

  return (
    <ChatPageComponent
      groups={groups}
      selectedGroup={selectedGroup}
      setSelectedGroup={handleGroupSelect}
      messages={messages}
    />
  );
};

export default ChatPage;
