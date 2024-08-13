// src/components/Profile/CourseContentManagement.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash, FaPlus, FaVideo, FaFile, FaPlayCircle, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { IChapter, IContent } from '../../types/contentTypes';
import { deleteModule, updateModule, deleteContent } from '../../api/teacher/courseContentApi';



interface CourseContentManagementProps {
    chapters: IChapter[];
}


const CourseContentManagement: React.FC<CourseContentManagementProps> = ({ chapters: initialChapters }) => {
    useEffect(() => {
        setChapters(initialChapters);
    }, [initialChapters]);

    const url: string = window.location.href; // Current URL
    const courseId : string | undefined = url.split('/').pop();

    const [chapters, setChapters] = useState<IChapter[]>([]);
    const [activeChapter, setActiveChapter] = useState<string | null>(null);
    const [activeContent, setActiveContent] = useState<IContent | null>(null);
    const [editMode, setEditMode] = useState<'chapter' | 'content' | null>(null);
    const [editItem, setEditItem] = useState<any>(null);
    const [newTitle, setNewTitle] = useState<string>('');

    const onDrop = useCallback((acceptedFiles: File[], chapterId: string) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                const url = URL.createObjectURL(file);
                const newContent: IContent = {
                    _id: uuidv4(),
                    type: file.type.startsWith('video') ? 'video' : 'document',
                    title: file.name,
                    url: url,
                    duration: file.type.startsWith('video') ? 0 : undefined,
                };
                addContent(chapterId, newContent);
            };
            reader.readAsArrayBuffer(file);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => activeChapter && onDrop(acceptedFiles, activeChapter),
        accept: {
            'video/*': [],
            'application/pdf': []
        },
    });


    const addContent = (chapterId: string, newContent: IContent) => {
        setChapters(chapters.map(chapter =>
            chapter._id === chapterId
                ? { ...chapter, contents: [...chapter.contents, newContent] }
                : chapter
        ));
    };

    const addChapter = () => {
        const newChapter: IChapter = {
            _id: uuidv4(),
            title: `New Chapter`,
            contents: [],
        };
        setChapters([...chapters, newChapter]);
        setEditMode('chapter');
        setEditItem(newChapter);
        setNewTitle(newChapter.title);
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editMode === 'chapter') {
            setChapters(chapters.map((chapter) =>
                chapter._id === editItem._id ? { ...chapter, title: newTitle } : chapter
            ));
        } else if (editMode === 'content') {
            setChapters(chapters.map((chapter) =>
                chapter._id === activeChapter
                    ? {
                        ...chapter,
                        contents: chapter.contents.map((content) =>
                            content._id === editItem._id ? { ...content, title: newTitle } : content
                        ),
                    }
                    : chapter
            ));
        }
        setEditMode(null);
        setEditItem(null);
        setNewTitle('');
    };

    const handleDelete = (chapterId: string, contentId?: string) => {
        if (!courseId) {
            console.error('Course ID is missing');
            return;
        }

        if (contentId) {
            // Find the chapter to get its title
            const chapter = chapters.find(c => c._id === chapterId);
            const contentTitle = chapter?.contents.find(c => c._id === contentId)?.title || "Unknown Content";

            // Show alert with chapter and content information
            console.log(`Deleting content with ID: ${contentId} from chapter with ID: ${chapterId} (${chapter?.title || "Unknown Chapter"})`);

            deleteContent(chapterId, contentId, courseId);
            // Perform the deletion
            setChapters(chapters.map((chapter) =>
                chapter._id === chapterId
                    ? { ...chapter, contents: chapter.contents.filter((content) => content._id !== contentId) }
                    : chapter
            ));
        } else {
            // Find the chapter to get its title
            const chapter = chapters.find(c => c._id === chapterId);

            // Show alert with chapter information
            deleteModule(chapterId);
            console.log(`Deleting chapter with ID: ${chapterId} (${chapter?.title || "Unknown Chapter"})`);

            // Perform the deletion
            setChapters(chapters.filter((chapter) => chapter._id !== chapterId));
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

                {activeContent && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white shadow-lg rounded-lg p-6 mt-6"
                    >
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