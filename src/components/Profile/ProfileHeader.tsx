import React from 'react';
import { Button } from '../ui/button';

interface ProfileHeaderProps {
    handleToggleDashboard: () => void;
    isTeacherDashboard: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ handleToggleDashboard, isTeacherDashboard }) => {
    return (

        <div className=" py-6">
            <div className="container mx-auto flex items-center justify-center space-x-4 ">
                <Button
                    onClick={handleToggleDashboard}
                    className={isTeacherDashboard ? "bg-white text-black" : ""}>
                    Student
                </Button>
                <Button
                    onClick={handleToggleDashboard}
                    className={!isTeacherDashboard ? "bg-white text-black" : ""}>
                    Teacher
                </Button>
            </div>
        </div>
    );
};

export default ProfileHeader;