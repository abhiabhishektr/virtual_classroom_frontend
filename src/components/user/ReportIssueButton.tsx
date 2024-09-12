// src/components/user/ReportIssueButton.tsx
import React, { useState } from 'react';
import { reportIssue } from '../../api/user/reportApi';

interface ReportIssueButtonProps {
    courseId: string;
    tittle: string;
}

const ReportIssueButton: React.FC<ReportIssueButtonProps> = ({ courseId ,tittle}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState('');
    const [description, setDescription] = useState('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleIssueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedIssue(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            await reportIssue(courseId, selectedIssue, description);
            console.log('Report submitted:', { courseId, selectedIssue, description });
            handleCloseModal(); 
        } catch (error: any) { 
            console.error('Error submitting report:', error);
        } 
    };

    const issueOptions = [
        'Incorrect course information',
        'Technical issues with videos/content',
        'Inappropriate or offensive content',
        'Issues with instructor communication',
        'Payment or billing problems',
        'Other (please specify)',
    ];

    return (
        <div>
            <button className="justif" onClick={handleOpenModal}>
                Report Issue
            </button>

            {/* Modal (Popup) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96"> {/* Adjust width as needed */}
                        <h2 className="text-xl font-semibold mb-4">Report Issue for Course: {tittle}</h2>

                        <div className="mb-4">
                            <label htmlFor="issue" className="block text-gray-700 text-sm font-bold mb-2">
                                Issue Type:
                            </label>
                            <select
                                id="issue"
                                value={selectedIssue}
                                onChange={handleIssueChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Select an issue</option>
                                {issueOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                                Description:
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24" // Adjust height as needed
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400" onClick={handleCloseModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportIssueButton;