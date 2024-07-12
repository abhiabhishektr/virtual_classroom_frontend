import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-80 rounded-xl bg-gray-900 p-8 text-gray-100">
        <p className="text-center text-2xl font-bold">Admin Login</p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mt-1 text-sm">
            <label htmlFor="username" className="block text-gray-400 mb-1">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
              className="w-full rounded-md border border-gray-700 bg-gray-900 py-3 px-4 text-gray-100 outline-none focus:border-purple-400"
            />
          </div>
          <div className="mt-4 text-sm">
            <label htmlFor="password" className="block text-gray-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full rounded-md border border-gray-700 bg-gray-900 py-3 px-4 text-gray-100 outline-none focus:border-purple-400"
            />
          </div>
          <button type="submit" className="w-full bg-purple-400 py-3 text-center text-gray-900 rounded-md font-semibold mt-6">Sign in</button>
        </form>
        <div className="flex items-center pt-4 mt-4">
          <div className="flex-grow h-px bg-gray-700"></div>
          <span className="px-3 text-sm text-gray-400">Login with social accounts</span>
          <div className="flex-grow h-px bg-gray-700"></div>
        </div>
        <div className="flex justify-center mt-4">
          <button aria-label="Log in with Google" className="p-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          Don't have an account? 
          <Link to="/auth/signup" className="text-gray-100 hover:underline hover:text-purple-400"> Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;  