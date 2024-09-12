import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash, FaPlus, FaVideo, FaFile, FaPlayCircle, FaChevronRight, FaChevronDown, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { IChapter, IContent, courseContentDetails } from '../../types/contentTypes';
import { deleteModule, deleteContent, uploadContent, addModule, updateModule, renameContent } from '../../api/teacher/courseContentApi';
import { showToast } from '../../utils/toast';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/profileSlice';
import Swal from 'sweetalert2';


interface CourseContentManagementProps {
    chapters: IChapter[];
    courseDetails: courseContentDetails;
}

const CourseContentManagement: React.FC<CourseContentManagementProps> = ({ chapters: initialChapters, courseDetails }) => {
    const courseId: string | undefined = courseDetails.courseId
    const moduleId: string | undefined = courseDetails.ModuleId
    const dispatch = useDispatch();

    const [chapters, setChapters] = useState<IChapter[]>([]);
    const [tempChapter, setTempChapter] = useState<IChapter | null>(null);

    const [activeChapter, setActiveChapter] = useState<string | null>(null);
    const [activeContent, setActiveContent] = useState<IContent | null>(null);
    const [editMode, setEditMode] = useState<'chapter' | 'content' | 'Chapter' | null>(null);
    const [editItem, setEditItem] = useState<any>(null);
    const [newTitle, setNewTitle] = useState<string>('');

    useEffect(() => {
        setChapters(initialChapters ?? []);
    }, [initialChapters]);

    const onDrop = useCallback(async (acceptedFiles: File[], chapterId: string) => {
        for (const file of acceptedFiles) {
            const url = URL.createObjectURL(file);
    
            // Show SweetAlert2 popup for file preview and renaming
            const { value: fileName } = await Swal.fire({
                title: 'Preview and Upload',
                input: 'text',
                inputLabel: 'Change file name',
                inputValue: file.name,
                showCancelButton: true,
                confirmButtonText: 'Upload',
                cancelButtonText: 'Cancel',
                html: file.type.startsWith('video')
                    ? `<video src="${url}" controls width="100%"></video>`
                    : `<iframe src="${url}" width="100%" height="500px"></iframe>`,
            });
    
            if (fileName) {
                const newContent: IContent = {
                    _id: uuidv4(),
                    type: file.type.startsWith('video') ? 'video' : 'document',
                    title: fileName, // Use the modified file name
                    url: url,
                    duration: file.type.startsWith('video') ? 0 : undefined,
                };
                await addContent(chapterId, newContent);
            }
        }
    }, [courseId, moduleId]); // Add courseId and moduleId to the dependency array
     // Add courseId and moduleId to the dependency array

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => activeChapter && onDrop(acceptedFiles, activeChapter),
        accept: {
            'video/*': [],
            'application/pdf': []
        },
    });

    const addContent = async (chapterId: string, newContent: IContent) => {
        // Update local state
        setChapters(prevChapters => prevChapters.map(chapter =>
            chapter._id === chapterId
                ? { ...chapter, contents: [...chapter.contents, newContent] }
                : chapter
        ));

        // Call API to upload content
        try {
            dispatch(setLoading(true));
            if (!courseId || !moduleId) {
                throw new Error('Course ID or Module ID is missing');
            }
           const res = await uploadContent(courseId, chapterId, newContent);
           setChapters(res.modules)
        } catch (error) {
            console.error('Failed to upload content:', error);
            // Optionally, remove the content from local state if the upload fails
            setChapters(prevChapters => prevChapters.map(chapter =>
                chapter._id === chapterId
                    ? { ...chapter, contents: chapter.contents.filter(content => content._id !== newContent._id) }
                    : chapter
            ));
            // You might also want to show an error message to the user here
        }finally{
            dispatch(setLoading(false));
        }
    };

    const addChapter = () => {
        const newChapter: IChapter = {
            _id: uuidv4(),
            title: `New Chapter`,
            contents: [],
        };
        setTempChapter(newChapter);
        setEditMode('Chapter');
        setEditItem(newChapter);
        setNewTitle(newChapter.title);
    };




    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editMode === 'chapter') {
            try {
                updateModule(courseId, moduleId, editItem._id, newTitle);


                if (!tempChapter) {
                    setChapters(prevChapters => prevChapters.map((chapter) =>
                        chapter._id === editItem._id ? { ...chapter, title: newTitle } : chapter
                    ));
                }
                showToast ('Edit Success', 'success', 'small-toast',2000,'bottom-center');

            } catch (error) {
                console.log(error);
                showToast ('Edit Failed', 'error', 'small-toast',2000,'bottom-center');

            }


        } else if (editMode === 'content') {
            try {
                // renameContent(activeChapter, editItem._id, courseId, moduleId, newTitle);

                if (activeChapter !== null) {
                    renameContent(courseId, moduleId, activeChapter, editItem._id, newTitle);
                }
                setChapters(prevChapters => prevChapters.map((chapter) =>
                    chapter._id === activeChapter
                        ? {
                            ...chapter,
                            contents: chapter.contents.map((content) =>
                                content._id === editItem._id ? { ...content, title: newTitle } : content
                            ),
                        }
                        : chapter
                ));
                showToast ('Edit Success', 'success', 'small-toast',2000,'bottom-center');

            } catch (error) {
                console.log(error);
                showToast ('Edit Failed', 'error', 'small-toast',2000,'bottom-center');

            }

        }

        else if (tempChapter && editMode === 'Chapter') {
            setChapters(prevChapters => [...prevChapters, tempChapter]);
            const newModules = await addModule(courseId, newTitle);
            console.log("newModules: ", newModules);
            setChapters(newModules)
            setTempChapter(null);
            showToast ('Edit Success', 'success', 'small-toast',2000,'bottom-center');
        }

        setEditMode(null);
        setEditItem(null);
        setNewTitle('');

    };

    const handleDelete = async (chapterId: string, contentId?: string) => {
        if (!courseId) {
            console.error('Course ID is missing');
            return;
        }
    
        if (contentId) {
            const chapter = chapters.find(c => c._id === chapterId);
            const content = chapter?.contents.find(c => c._id === contentId);
    
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `Do you really want to delete the content "${content?.title || "this item"}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
            });
    
            if (result.isConfirmed) {
                console.log(`Deleting content with ID: ${contentId} from chapter with ID: ${chapterId} (${chapter?.title || "Unknown Chapter"})`);
    
                await deleteContent(chapterId, contentId, courseId, moduleId);
    
                setChapters(prevChapters => prevChapters.map((chapter) =>
                    chapter._id === chapterId
                        ? { ...chapter, contents: chapter.contents.filter((content) => content._id !== contentId) }
                        : chapter
                ));
    
                Swal.fire('Deleted!', 'Your content has been deleted.', 'success');
            }
        } else {
            const chapter = chapters.find(c => c._id === chapterId);
    
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `Do you really want to delete the chapter "${chapter?.title || "this chapter"}" and all its contents?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
            });
    
            if (result.isConfirmed) {
                console.log(`Deleting chapter with ID: ${chapterId} (${chapter?.title || "Unknown Chapter"})`);
    
                await deleteModule(moduleId, courseId, chapterId);
    
                setChapters(prevChapters => prevChapters.filter((chapter) => chapter._id !== chapterId));
    
                Swal.fire('Deleted!', 'Your chapter has been deleted.', 'success');
            }
        }
    };
    

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <aside className="w-1/3 bg-white shadow-lg p-6 overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Course Structure</h2>
                <AnimatePresence>
                    {chapters.map((chapter) => (
                        <motion.div
                            key={chapter._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mb-6"
                        >
                            <div
                                className="flex justify-between items-center py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer"
                                onClick={() => setActiveChapter(activeChapter === chapter._id ? null : chapter._id)}
                            >
                                <span className="text-lg font-medium text-gray-800">{chapter.title}</span>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditMode('chapter');
                                            setEditItem(chapter);
                                            setNewTitle(chapter.title);
                                        }}
                                        className="text-blue-500 hover:text-blue-600 focus:outline-none"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(chapter._id);
                                        }}
                                        className="text-red-500 hover:text-red-600 focus:outline-none"
                                    >
                                        <FaTrash />
                                    </button>
                                    {activeChapter === chapter._id ? <FaChevronDown /> : <FaChevronRight />}
                                </div>
                            </div>
                            <AnimatePresence>
                                {activeChapter === chapter._id && (
                                    <motion.ul
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-2 space-y-2"
                                    >
                                        {chapter.contents.map((content) => (
                                            <motion.li
                                                key={content._id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="flex justify-between items-center p-3 bg-white rounded-md shadow hover:shadow-md transition-shadow"
                                            >
                                                <span className="flex items-center text-gray-700">
                                                    {content.type === 'video' ? <FaVideo className="mr-2 text-gray-500" /> : <FaFile className="mr-2 text-gray-500" />}
                                                    {content.title}
                                                </span>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditMode('content');
                                                            setEditItem(content);
                                                            setNewTitle(content.title);
                                                            setActiveChapter(chapter._id);
                                                        }}
                                                        className="text-blue-500 hover:text-blue-600 focus:outline-none"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(chapter._id, content._id)}
                                                        className="text-red-500 hover:text-red-600 focus:outline-none"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                    <button
                                                        onClick={() => setActiveContent(content)}
                                                        className="text-green-500 hover:text-green-600 focus:outline-none"
                                                    >
                                                        <FaPlayCircle />
                                                    </button>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                            {activeChapter === chapter._id && (
                                <div
                                    {...getRootProps({
                                        className: `mt-4 border-2 border-dashed ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                            } rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors`,
                                    })}
                                >
                                    <input {...getInputProps()} />
                                    <p className="text-gray-500 text-sm">
                                        {isDragActive ? 'Drop the file here' : 'Drag & drop a video or document here, or click to select a file'}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <button
                    onClick={addChapter}
                    className="mt-6 w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    <FaPlus className="inline mr-2" />
                    Add Chapter
                </button>
            </aside>

            <main className="flex-grow p-6 overflow-y-auto">
                {editMode && (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onSubmit={handleEdit}
                        className="bg-white shadow-lg rounded-lg p-6 mb-6"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Edit {editMode === 'chapter' ? 'Chapter' : 'Content'} Title
                        </h2>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setEditMode(null);
                                    setEditItem(null);
                                    setNewTitle('');
                                    setTempChapter(null); // Clear temp state if canceling
                                }}
                                className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Save
                            </button>
                        </div>
                    </motion.form>
                )}


                {!editMode && activeContent && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative bg-white shadow-lg rounded-lg p-6 mt-6"
                    >
                        <button
                            onClick={() => setActiveContent(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <FaTimes className="text-2xl" />
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">{activeContent.title}</h2>
                        {activeContent.type === 'video' ? (
                            <video
                                controls
                                className="w-full rounded-lg shadow-lg"
                                src={activeContent.url}
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <iframe
                                src={activeContent.url}
                                className="w-full h-96 rounded-lg shadow-lg"
                                title={activeContent.title}
                            >
                                Your browser does not support iframes.
                            </iframe>
                        )}
                    </motion.div>
                )}

            </main>
        </div>
    );
};

export default CourseContentManagement;