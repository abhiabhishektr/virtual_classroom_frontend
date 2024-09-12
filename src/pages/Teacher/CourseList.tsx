import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getTeacherCourses } from '../../api/teacher/courseApi';
import ActionButtonWithConfirmation from '../../components/Shared/ActionButtonWithConfirmation';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/slices/profileSlice';
import { RootState } from '../../redux/store';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useSocket } from '../../hooks/useSocket'; 

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  fees: number;
}

const CourseList: React.FC = () => {

  const { socket } = useSocket();

  const { name, email, profilePicture } = useSelector((state: RootState) => state.profile);
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeCall, setActiveCall] = useState<Course | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [alert, setAlert] = useState<{ message: string; isError: boolean } | null>(null);
  const dispatch = useDispatch();
  const fullScreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response: Course[] = await getTeacherCourses();
        setCourses(response);
      } catch (error) {
        setError('Failed to fetch courses');
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCourses();
  }, [dispatch]);

  const startVideoCall = (course: Course) => {

    if (activeCall) {
      setAlert({
        message: "Please end the current live class before starting a new one.",
        isError: true
      });
      return;
    }
    setActiveCall(course);
    console.log('Starting video call for course:', course.title);
    const joinLink = `https://meet.jit.si/ChatWith${course.title.replace(/\s+/g, '')}`;
    console.log("joinLink: ", joinLink);

    const messageContent = `Video Classroom Link:\nJoin the live class for ${course.title} now:\n${joinLink}`;

    // Send the message to the group chat
    socket?.emit('group-message', {
      roomId: course.id,
      content: messageContent,
      senderEmail: email,
      name: name,
      messageType: 'link',
    });
    setAlert({
      message: `Your live class has started. Join link: ${joinLink}`,
      isError: false
    });
  };

  const endVideoCall = () => {
    setActiveCall(null);
    setIsFullScreen(false);
    console.log('Ending video call');
    setAlert({
      message: "The live class has ended.",
      isError: false
    });
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      fullScreenRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const fullScreenChangeHandler = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', fullScreenChangeHandler);

    return () => {
      document.removeEventListener('fullscreenchange', fullScreenChangeHandler);
    };
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='h-[87vh] w-full overflow-y-auto'>
      {alert && (
        <div className={`fixed top-0 left-0 right-0 p-4 ${alert.isError ? 'bg-red-500' : 'bg-green-500'} text-white text-center`}>
          {alert.message}
          <button onClick={() => setAlert(null)} className="ml-4 px-2 py-1 bg-white text-black rounded">Close</button>
        </div>
      )}
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Existing Courses</h2>
          <Link
            to="/profile/course-registration"
            className="inline-block px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition"
          >
            Add Course
          </Link>
        </div>
        {activeCall && (
          <div ref={fullScreenRef} className={`mb-8 ${isFullScreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
            <div className={`flex justify-between items-center mb-4 ${isFullScreen ? 'p-4' : ''}`}>
              <h3 className={`text-2xl font-semibold ${isFullScreen ? 'text-white' : ''}`}>Live Class: {activeCall.title}</h3>
              <div>
                <button
                  onClick={toggleFullScreen}
                  className="mr-4 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
                >
                  {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                </button>
                <button
                  onClick={endVideoCall}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-red-700 transition"
                >
                  End Live Class
                </button>
              </div>
            </div>
            <div style={{ height: isFullScreen ? 'calc(100vh - 80px)' : '600px' }}>
              <JitsiMeeting
                domain="meet.jit.si"
                roomName={`ChatWith${activeCall.title.replace(/\s+/g, '')}`}
                configOverwrite={{
                  startWithAudioMuted: true,
                  disableSimulcast: false,
                }}
                interfaceConfigOverwrite={{
                  filmStripOnly: false,
                  SHOW_JITSI_WATERMARK: false,
                }}
                userInfo={{
                  displayName: name || 'Teacher',
                  email: email || '',
                  avatarURL: profilePicture || `https://ui-avatars.com/api/?name=${name}&background=random`,
                } as any}
                onApiReady={(api) => console.log('Jitsi Meet API instance:', api)}
                getIFrameRef={(iframeRef) => { iframeRef.style.height = '100%'; iframeRef.style.width = '100%'; }}
              />
            </div>
          </div>
        )}
        {!isFullScreen && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses?.map((course: Course) => (
              <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                <div className="relative">
                  <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
                  <ActionButtonWithConfirmation
                    buttonText="Start a Live Class"
                    confirmationTitle="Start a Live Class?"
                    buttonStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '8px' }}
                    confirmationMessage="Are you sure you want to start a live class now?"
                    confirmButtonText="Yes, start it!"
                    onConfirm={() => startVideoCall(course)}
                    successMessage="Your live class has started."
                    successTitle="Started!"
                    overlayStyle="bg-black bg-opacity-50"
                    textStyle="text-white text-lg font-semibold"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 h-12 overflow-hidden">{course.title}</h3>
                  <p className="text-gray-600 mb-2 flex-grow h-24 overflow-hidden">{course.description}</p>
                  <p className="text-gray-600 mb-4">Fees: ₹{course.fees}</p>
                  <div className="flex justify-between items-center space-x-2 mt-auto">
                    <Link
                      to={`/profile/course-edit/${course.id}`}
                      className="inline-block flex-shrink-0 flex-grow-0 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/profile/course-contents/${course.id}`}
                      className="inline-block flex-shrink-0 flex-grow-0 px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-100 transition"
                      style={{ width: '120px', textAlign: 'center' }}
                    >
                      Contents
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;