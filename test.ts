// return (
//     <div className="flex h-screen bg-gray-100 font-sans">
//         <aside className="w-1/3 bg-white shadow-lg p-6 overflow-y-auto">
//             <h2 className="text-2xl font-semibold mb-6 text-gray-800">Course Structure</h2>
//             <AnimatePresence>
//                 {chapters.map((chapter) => (
//                     <motion.div
//                         key={chapter._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         className="mb-6"
//                     >
//                         <div
//                             className="flex justify-between items-center py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer"
//                             onClick={() => setActiveChapter(activeChapter === chapter._id ? null : chapter._id)}
//                         >
//                             <span className="text-lg font-medium text-gray-800">{chapter.title}</span>
//                             <div className="flex items-center space-x-2">
//                                 <button
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         setEditMode('chapter');
//                                         setEditItem(chapter);
//                                         setNewTitle(chapter.title);
//                                     }}
//                                     className="text-blue-500 hover:text-blue-600 focus:outline-none"
//                                 >
//                                     <FaEdit />
//                                 </button>
//                                 <button
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         handleDelete(chapter._id);
//                                     }}
//                                     className="text-red-500 hover:text-red-600 focus:outline-none"
//                                 >
//                                     <FaTrash />
//                                 </button>
//                                 {activeChapter === chapter._id ? <FaChevronDown /> : <FaChevronRight />}
//                             </div>
//                         </div>
//                         <AnimatePresence>
//                             {activeChapter === chapter._id && (
//                                 <motion.ul
//                                     initial={{ opacity: 0, height: 0 }}
//                                     animate={{ opacity: 1, height: 'auto' }}
//                                     exit={{ opacity: 0, height: 0 }}
//                                     className="mt-2 space-y-2"
//                                 >
//                                     {chapter.contents.map((content) => (
//                                         <motion.li
//                                             key={content._id}
//                                             initial={{ opacity: 0, x: -20 }}
//                                             animate={{ opacity: 1, x: 0 }}
//                                             exit={{ opacity: 0, x: 20 }}
//                                             className="flex justify-between items-center p-3 bg-white rounded-md shadow hover:shadow-md transition-shadow"
//                                         >
//                                             <span className="flex items-center text-gray-700">
//                                                 {content.type === 'video' ? <FaVideo className="mr-2 text-gray-500" /> : <FaFile className="mr-2 text-gray-500" />}
//                                                 {content.title}
//                                             </span>
//                                             <div className="flex items-center space-x-2">
//                                                 <button
//                                                     onClick={() => {
//                                                         setEditMode('content');
//                                                         setEditItem(content);
//                                                         setNewTitle(content.title);
//                                                         setActiveChapter(chapter._id);
//                                                     }}
//                                                     className="text-blue-500 hover:text-blue-600 focus:outline-none"
//                                                 >
//                                                     <FaEdit />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDelete(chapter._id, content._id)}
//                                                     className="text-red-500 hover:text-red-600 focus:outline-none"
//                                                 >
//                                                     <FaTrash />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => setActiveContent(content)}
//                                                     className="text-green-500 hover:text-green-600 focus:outline-none"
//                                                 >
//                                                     <FaPlayCircle />
//                                                 </button>
//                                             </div>
//                                         </motion.li>
//                                     ))}
//                                 </motion.ul>
//                             )}
//                         </AnimatePresence>
//                         {activeChapter === chapter._id && (
//                             <div
//                                 {...getRootProps({
//                                     className: `mt-4 border-2 border-dashed ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors`,
//                                 })}
//                             >
//                                 <input {...getInputProps()} />
//                                 <p className="text-gray-500 text-sm">
//                                     {isDragActive ? 'Drop the file here' : 'Drag & drop a video or document here, or click to select a file'}
//                                 </p>
//                             </div>
//                         )}
//                     </motion.div>
//                 ))}
//             </AnimatePresence>
//             <button
//                 onClick={addChapter}
//                 className="mt-6 w-full py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//                 <FaPlus className="inline mr-2" />
//                 Add Chapter
//             </button>
//         </aside>

//         <main className="flex-grow p-6 overflow-y-auto">
//             {editMode && (
//                 <motion.form
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     onSubmit={handleEdit}
//                     className="bg-white shadow-lg rounded-lg p-6 mb-6"
//                 >
//                     <h2 className="text-xl font-semibold mb-4 text-gray-800">
//                         Edit {editMode === 'chapter' ? 'Chapter' : 'Content'} Title
//                     </h2>
//                     <input
//                         type="text"
//                         value={newTitle}
//                         onChange={(e) => setNewTitle(e.target.value)}
//                         className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <div className="flex justify-end space-x-2">
//                         <button
//                             type="button"
//                             onClick={() => {
//                                 setEditMode(null);
//                                 setEditItem(null);
//                                 setNewTitle('');
//                             }}
//                             className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                         >
//                             Save
//                         </button>
//                     </div>
//                 </motion.form>
//             )}

//             {!editMode && activeContent && (
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     className="relative bg-white shadow-lg rounded-lg p-6 mt-6"
//                 >
//                     <button
//                         onClick={() => setActiveContent(null)}
//                         className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
//                     >
//                         <FaTimes className="text-2xl" />
//                     </button>
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-800">{activeContent.title}</h2>
//                     {activeContent.type === 'video' ? (
//                         <video
//                             controls
//                             className="w-full rounded-lg shadow-lg"
//                             src={activeContent.url}
//                         >
//                             Your browser does not support the video tag.
//                         </video>
//                     ) : (
//                         <iframe
//                             src={activeContent.url}
//                             className="w-full h-96 rounded-lg shadow-lg"
//                             title={activeContent.title}
//                         >
//                             Your browser does not support iframes.
//                         </iframe>
//                     )}
//                 </motion.div>
//             )}
//         </main>
//     </div>
// );