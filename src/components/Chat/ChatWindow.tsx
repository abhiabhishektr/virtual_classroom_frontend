import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSocket } from '../../hooks/useSocket'; 
import DotPattern from '../magicui/dot-pattern';
import { cn } from '../../lib/utils';
import { FaArrowLeft } from 'react-icons/fa';

interface Message {
  sender_id: string;
  senderName: string;
  content: string;
}

interface ChatWindowProps {
  messages: Message[];
  selectedGroup: { groupId: string; groupName: string; teacherEmail: string } | null;
  currentUsername: string;
  currentName: string;
  goBack:()=>void
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  selectedGroup,
  currentUsername,
  currentName,
  goBack
}) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocket();
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

  const checkIfAtBottom = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsAtBottom(atBottom);
      setShowScrollButton(!atBottom);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      checkIfAtBottom();
    };
  
    const chatContainer = chatContainerRef.current; // Copy the ref to a local variable
  
    chatContainer?.addEventListener('scroll', handleScroll);
  
    return () => {
      chatContainer?.removeEventListener('scroll', handleScroll); // Use the local variable in cleanup
    };
  }, []);
  

  useEffect(() => {
    if (isAtBottom && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    } else if (!isAtBottom) {
      setShowScrollButton(true);
    }
  }, [messages, isAtBottom]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedGroup) {
      const messagePayload = {
        roomId: selectedGroup.groupId,
        content: newMessage,
        senderEmail: currentUsername,
        name: currentName,
      };

      socket?.emit('group-message', messagePayload);
      setNewMessage('');
    }
  };

  const handleScrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      setShowScrollButton(false);
      setIsAtBottom(true);
    }
  };

  return (
    <div className='h-full w-screen'>
      <div className="flex-1 flex flex-col bg-gray-100 rounded-lg shadow-md h-[87vh]">
        <div className="bg-zinc-700 p-4 text-white flex items-center rounded-t-lg z-10">
        <FaArrowLeft className='cursor-pointer' onClick={goBack}/>
          <h2 className="text-xl font-bold ms-4">{selectedGroup?.groupName || 'Select a group'}</h2>
        </div>
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 h-[90vh] z-10"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`my-2 p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${message.sender_id === currentUsername
                  ? 'bg-slate-500 text-white ml-auto'
                  : message.sender_id === selectedGroup?.teacherEmail
                    ? 'bg-sky-800 text-sky-200 mr-auto border-2 border-sky-950'
                    : 'bg-gray-300 text-gray-800 mr-auto'
                }`}
            >
              {/* Show "Teacher" label for teacher's messages */}
              {message.sender_id === selectedGroup?.teacherEmail ? (
                <p className="text-xs font-bold mb-1 text-yellow-300">Teacher</p>
              ) : null}

              {/* Show sender's name for messages not from current user or teacher */}
              {message.sender_id !== currentUsername && message.sender_id !== selectedGroup?.teacherEmail ? (
                <p className="text-xs font-bold mb-1">{message.senderName}</p>
              ) : null}

              <p className="break-words">{message.content}</p>
            </div>
          ))}
        </div>



        {showScrollButton && (
          <div className="absolute bottom-24 right-4">
            <Button
              onClick={handleScrollToBottom}
              className="p-2 bg-sky-950 rounded-full hover:bg-zinc-600 transition-colors duration-200 absolute bottom-0 right-0 z-30"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
          </div>
        )}
        <div className="p-4 border-t border-gray-300 rounded-b-lg ">
          <div className="flex items-center">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 p-2 mr-2 rounded-lg bg-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-sky-950"
              placeholder="Type a message..."
            />
            <Button
              onClick={handleSendMessage}
              className="p-2 bg-sky-950 rounded-full hover:bg-zinc-600 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
};

export default ChatWindow;