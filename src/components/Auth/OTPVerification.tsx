import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import img from '../../assets/images/img';

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
      <div className="flex flex-col md:flex-row w-full md:w-auto">
        <div className="w-full md:w-96 rounded-s-xl bg-white p-8 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex justify-center mb-4">
              <img src={img.logo} alt="Logo" className="w-12 h-12 rounded-full" />
            </div>
            <p className="text-center text-2xl font-bold">OTP Verification</p>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mt-1 text-sm">
                <label htmlFor="otp" className="block text-gray-400 mb-1">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 outline-none focus:border-blue-500"
                />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-blue-600 py-3 mt-6 text-center text-white rounded-md font-semibold">Verify OTP</button>
              <div className="mt-4 text-center">
                {timer > 0 ? (
                  <p className="text-gray-500">Resend OTP in {`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`}</p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="hidden md:block bg-slate-500 w-full md:w-96 h-auto rounded-xl md:rounded-none">
          <img src={img.bg} alt="Background" className="w-full h-full object-cover rounded-e-xl md:rounded-none" />
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
