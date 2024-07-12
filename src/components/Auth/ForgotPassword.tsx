import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Email for password reset:", email);
    // Handle forgot password logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-80 rounded-xl bg-gray-900 p-8 text-gray-100">
        <p className="text-center text-2xl font-bold">Forgot Password</p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mt-1 text-sm">
            <label htmlFor="email" className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full rounded-md border border-gray-700 bg-gray-900 py-3 px-4 text-gray-100 outline-none focus:border-purple-400"
            />
          </div>
          <button type="submit" className="w-full bg-purple-400 py-3 text-center text-gray-900 rounded-md font-semibold mt-4">Reset Password</button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">
          Remember your password? 
          <Link to="/auth/login" className="text-gray-100 hover:underline hover:text-purple-400"> Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;