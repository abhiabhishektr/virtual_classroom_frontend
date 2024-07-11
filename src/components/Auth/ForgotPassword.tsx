import React, { useState, ChangeEvent, FormEvent } from "react";
import '../../styles/login.css';

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
      <div className="form-container">
        <p className="title">Forgot Password</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit" className="sign">Reset Password</button>
        </form>
        <p className="signup">
          Remember your password? 
          <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;