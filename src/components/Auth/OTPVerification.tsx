import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import '../../styles/login.css';

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(120);

  useEffect(() => {
    let countdown: NodeJS.Timeout | undefined;
    if (timer > 0) {
      countdown = setInterval(() => setTimer((prevTimer) => prevTimer - 1), 1000);
    }
    return () => {
      if (countdown) clearInterval(countdown);
    };
  }, [timer]);

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("OTP:", otp);
    // Handle OTP verification logic here
  };

  const handleResendOTP = () => {
    setTimer(120);
    // Resend OTP logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="form-container">
        <p className="title">OTP Verification</p>
        <form className="form" onSubmit={handleSubmit}>
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
              <button onClick={handleResendOTP}>Resend OTP</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default OTPVerification;