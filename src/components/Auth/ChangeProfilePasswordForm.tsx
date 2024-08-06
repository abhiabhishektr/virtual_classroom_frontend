// import React, { useState, useEffect } from 'react';
// import ChangePasswordApi from './api';
// interface ChangeProfilePasswordFormProps {
//   visible: boolean;
//   setVisible: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const ChangeProfilePasswordForm: React.FC<ChangeProfilePasswordFormProps> = ({ visible, setVisible }) => {
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmedPassword, setConfirmedPassword] = useState('');
//   const [isSaveDisabled, setIsSaveDisabled] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const passwordsMatch = newPassword === confirmedPassword;
//     const fieldsFilled = currentPassword && newPassword && confirmedPassword;
//     setIsSaveDisabled(!(fieldsFilled && passwordsMatch));
//   }, [currentPassword, newPassword, confirmedPassword]);

//   const saveNewPassword = () => {
//     if (newPassword === confirmedPassword) {

//       setVisible(false);
//     } else {
//       setErrorMessage('Passwords do not match');
//     }
//   };

//   return (
//     <div className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 ${visible ? 'block' : 'hidden'}`}>
//       <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800">Change Password</h2>
//         <form className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Current Password</label>
//             <input
//               type="password"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900"
//               placeholder="Current Password"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">New Password</label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900"
//               placeholder="New Password"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Confirm New Password</label>
//             <input
//               type="password"
//               value={confirmedPassword}
//               onChange={(e) => setConfirmedPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900"
//               placeholder="Confirm New Password"
//             />
//           </div>
//           {errorMessage && (
//             <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
//           )}
//         </form>
//         <div className="flex justify-end space-x-4 mt-4">
//           <button
//             onClick={() => setVisible(false)}
//             className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 px-4 py-2 rounded-full flex items-center transition-colors hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-500"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={saveNewPassword}
//             disabled={isSaveDisabled}
//             className={`${
//               isSaveDisabled
//                 ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-800 cursor-not-allowed'
//                 : 'bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700'
//             } px-4 py-2 rounded-full flex items-center transition-colors`}
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChangeProfilePasswordForm;
