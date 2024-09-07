import React, { useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

const users = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Robert Brown'];
const teachers = ['Mr. Anderson', 'Ms. Davis', 'Dr. Wilson', 'Prof. Harris'];

const AdminPushNotificationPage: React.FC = () => {
    const { socket } = useSocket();
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [recipientType, setRecipientType] = useState<'all' | 'teachers' | ''>('');
    const [selectedSpecific, setSelectedSpecific] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRecipientTypeChange = (type: 'all' | 'teachers') => {
        setRecipientType(type);
        setSelectedSpecific('');
    };

    const handleUserSelection = (user: string) => {
        setSelectedSpecific(user);
    };

    const sendNotification = () => {
        if (!socket) {
            toast.error('Socket connection not established!', { autoClose: 3000 });
            return;
        }

        if (!title.trim() || !message.trim()) {
            toast.error('Both title and message are required.', { autoClose: 3000 });
            return;
        }

        setIsLoading(true);

        const notificationPayload = {
            title,
            message,
            recipientType,
            recipient: selectedSpecific || 'all',
        };

        socket.emit('admin-notification', notificationPayload);

        setTimeout(() => {
            setIsLoading(false);
            toast.success('Notification sent successfully!', { autoClose: 3000 });

            setTitle('');
            setMessage('');
            setRecipientType('');
            setSelectedSpecific('');
        }, 1000);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 space-y-8">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Send Push Notification</h1>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Select Recipient Type</h2>
                    <div className="flex justify-between">
                        <Button
                            onClick={() => handleRecipientTypeChange('all')}
                            className={`w-full mr-2 ${recipientType === 'all' ? 'bg-blue-600' : 'bg-blue-500'}`}
                        >
                            All Users
                        </Button>
                        <Button
                            onClick={() => handleRecipientTypeChange('teachers')}
                            className={`w-full ml-2 ${recipientType === 'teachers' ? 'bg-blue-600' : 'bg-blue-500'}`}
                        >
                            All Teachers
                        </Button>
                    </div>
                </div>

                {recipientType && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {recipientType === 'all' ? 'Select User' : 'Select Teacher'} (Optional)
                        </h2>
                        <Input
                            type="text"
                            value={selectedSpecific}
                            onChange={(e) => handleUserSelection(e.target.value)}
                            list="user-options"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-700"
                            placeholder={`Search ${recipientType === 'all' ? 'User' : 'Teacher'} by name`}
                        />
                        <datalist id="user-options">
                            {(recipientType === 'all' ? users : teachers).map((user) => (
                                <option key={user} value={user} />
                            ))}
                        </datalist>
                    </div>
                )}

                <div className="space-y-4">
                    <label className="block text-lg font-semibold text-gray-800" htmlFor="title">
                        Notification Title
                    </label>
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-700"
                        placeholder="Enter the title"
                    />
                </div>

                <div className="space-y-4">
                    <label className="block text-lg font-semibold text-gray-800" htmlFor="message">
                        Notification Message
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-700"
                        placeholder="Enter the message"
                        rows={5}
                    />
                </div>

                <Button
                    onClick={sendNotification}
                    disabled={isLoading}
                    className={`w-full py-3 mt-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {isLoading ? 'Sending...' : 'Send Notification'}
                </Button>

                <ToastContainer />
            </div>
        </div>
    );
};

export default AdminPushNotificationPage;
