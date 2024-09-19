import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { pushNotification, searchUser } from '../../api/admin/adminNotification'; // Import the searchUser function
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import UserDropdown from '../../components/Chat/UserDropdown'; // Import the custom dropdown component

const AdminPushNotificationPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [recipientType, setRecipientType] = useState<'all' | 'teachers' | ''>('');
    const [selectedSpecific, setSelectedSpecific] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<{name: string; email: string; profilePicture?: string}[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (selectedSpecific.trim() === '') {
            setOptions([]);
            setShowDropdown(false);
            return;
        }

        const fetchOptions = async () => {
            try {
                const response = await searchUser(selectedSpecific, recipientType);
                setOptions(response);
                setShowDropdown(true);
            } catch (error) {
                console.error('Error fetching options:', error);
                toast.error('Failed to fetch options from server.', { autoClose: 3000 });
            }
        };

        const debounceFetch = setTimeout(fetchOptions, 500);

        return () => clearTimeout(debounceFetch);
    }, [selectedSpecific, recipientType]);

    const handleRecipientTypeChange = (type: 'all' | 'teachers') => {
        setRecipientType(type);
        setSelectedSpecific('');
        setOptions([]);
        setShowDropdown(false);
    };
    const handleDropdownClose = () => {
        setShowDropdown(false);
      };

    const handleUserSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSpecific(event.target.value);
    };

    const handleOptionSelect = (option: { name: string; email: string; profilePicture?: string }) => {
        setSelectedSpecific(option.email);
        setShowDropdown(false);
    };


    const sendNotification = async () => {
        if (!title.trim() || !message.trim()) {
            toast.error('Both title and message are required.', { autoClose: 3000 });
            return;
        }
        
        // Check recipientType and recipient are set correctly
        if (!recipientType) {
            toast.error('Recipient type is required.', { autoClose: 3000 });
            return;
        }
    
        setIsLoading(true);
    
        const notificationPayload = {
            title,
            message,
            recipientType, // This should never be an empty string now
            // recipient: recipientType === 'all' ? 'all' : selectedSpecific, // Ensure correct recipient
            recipient: selectedSpecific, // Ensure correct recipient
        };
        console.log("notificationPayload: ", notificationPayload);
    
        try {
            const response = await pushNotification(notificationPayload);
    
            if (response.success) { 
                toast.success('Notification sent successfully!', { autoClose: 3000 });
                resetForm();
            } else {
                toast.error(`Failed to send notification: ${response.message}`, { autoClose: 3000 });
            }
        } catch (error) {
            console.error('Error sending notification:', error);
            toast.error('Failed to send notification. Please try again.', { autoClose: 3000 });
        } finally {
            setIsLoading(false);
        }
    };
    
    
    

    const resetForm = () => {
        setTitle('');
        setMessage('');
        setRecipientType('');
        setSelectedSpecific('');
        setOptions([]);
        setShowDropdown(false);
    };

    return (
        <div className="relative flex justify-center items-center h-screen bg-gray-50">
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
                    <div className="relative space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {recipientType === 'all' ? 'Select User' : 'Select Teacher'} (Optional)
                        </h2>
                        <Input
                            type="text"
                            value={selectedSpecific}
                            onChange={handleUserSelection}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-700"
                            placeholder={`Search ${recipientType === 'all' ? 'User' : 'Teacher'} by name`}
                        />
                        {showDropdown && (
                            <UserDropdown
                                options={options}
                                onSelect={handleOptionSelect}
                                onClose={handleDropdownClose} 
                            />
                        )}
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
                    className={`w-full py-3 mt-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Sending...' : 'Send Notification'}
                </Button>

                <ToastContainer />
            </div>
        </div>
    );
};

export default AdminPushNotificationPage;
