import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import '../assets/login.css'; // Import the CSS file

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(120);
  
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (isOtpSent && timer > 0) {
      countdown = setInterval(() => setTimer((prevTimer) => prevTimer - 1), 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [isOtpSent, timer]);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isAdmin) {
      // Handle admin login logic here
      console.log("Admin Email:", email);
      console.log("Admin Password:", password);
    } else if (isRegistering) {
      // Handle registration logic here
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
      setIsOtpSent(true);
    } else {
      // Handle user login logic here
      console.log("Username:", username);
      console.log("Password:", password);
    }
  };

  const handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle OTP verification logic here
    console.log("OTP:", otp);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="form-container">
        <p className="title">{isAdmin ? "Admin Login" : isRegistering ? "Register" : "Login"}</p>
        {isOtpSent ? (
          <form className="form" onSubmit={handleOtpSubmit}>
            <div className="input-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                name="otp"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                required
              />
            </div>
            <button type="submit" className="sign">Verify OTP</button>
            <div className="mt-4 text-center">
              {timer > 0 ? (
                <p>Resend OTP in {`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`}</p>
              ) : (
                <button onClick={() => { setTimer(120); /* Resend OTP logic here */ }}>Resend OTP</button>
              )}
            </div>
          </form>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            {isAdmin ? (
              <>
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
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </>
            ) : (
              <>
                {isRegistering && (
                  <>
                    <div className="input-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                      />
                    </div>
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
                    <div className="input-group">
                      <label htmlFor="confirm-password">Confirm Password</label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                      />
                    </div>
                  </>
                )}
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                {!isRegistering && (
                  <div className="forgot">
                    <a href="#">Forgot Password ?</a>
                  </div>
                )}
              </>
            )}
            <button type="submit" className="sign">
              {isAdmin ? "Sign in as Admin" : isRegistering ? "Register" : "Sign in"}
            </button>
          </form>
        )}
        {!isOtpSent && (
          <>
            <div className="social-message">
              <div className="line"></div>
              <p className="message">{isAdmin ? "" : "Login with social accounts"}</p>
              <div className="line"></div>
            </div>
            {!isAdmin && (
              <div className="social-icons">
                <button aria-label="Log in with Google" className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                  </svg>
                </button>
              </div>
            )}
            <p className="signup">
              {isAdmin ? (
                <a href="#" onClick={() => setIsAdmin(false)}>Back to User Login</a>
              ) : (
                <>
                  {isRegistering ? "Already have an account? " : "Don't have an account? "}
                  <a href="#" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? "Sign in" : "Sign up"}
                  </a>
                  <br />
                  <a href="#" onClick={() => setIsAdmin(true)}>Admin Login</a>
                </>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
