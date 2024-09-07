import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { saveCourseToWishlist, unsaveCourseFromWishlist } from '../../api/userCourseApi';

interface SaveButtonProps {
    courseId: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ courseId }) => {
    const [isSaved, setIsSaved] = useState(false);

    const handleSaveClick = async () => {
        setIsSaved(!isSaved);
        console.log("courseId: ", courseId);
        if (!isSaved) {
            console.log("isSaved: ", isSaved);
            const res = await saveCourseToWishlist(courseId);
            console.log("res: ", res);
        } else {
            const res = await unsaveCourseFromWishlist(courseId);
            console.log("res: ", res);
        }
    };

    return (
        <button
            onClick={handleSaveClick}
            className={`flex items-center px-4 py-2 rounded-full transition-colors ${isSaved ? 'bg-[#0e7490] text-white' : 'bg-gray-200 text-gray-700'
                }`}
        >
            {isSaved ? (
                <AiFillHeart className="h-5 w-5 mr-2" />
            ) : (
                <AiOutlineHeart className="h-5 w-5 mr-2" />
            )}
            {isSaved ? 'Saved' : 'Save'}
        </button>
    );
};
export default SaveButton;

