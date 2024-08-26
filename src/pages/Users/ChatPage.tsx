import React, { useEffect, useState } from 'react';
import { getGroup, getMessagesForGroup } from '../../api/chat/chatApi';
import ChatPageComponent from '../../components/Chat/ChatPageComponet';
import { IGroup, IMessage } from '../../types/chat';
import { useSocket } from '../../context/SocketContext';

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
        if (groupData.length > 0) {
          setSelectedGroup(groupData[0]);
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

        // Add the test message to the state
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });

      // Clean up on component unmount or when group changes
      return () => {
        socket.off('message');
      };
    }
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
