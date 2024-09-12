import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/toast';
import { API_BASE_URL } from '../utils/constants';


const Login: React.FC = () => {
    const { login: loginWithAuth } = useAuth();
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {

            try {
                const response = await axios.post(`${API_BASE_URL}/api/auth/google/callback`, {
                    code: codeResponse.code
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response && response.data) {
                    await loginWithAuth(response.data.token.accessToken, response.data.token.refreshToken);
                    showToast(' Login Successful', 'success');
                    navigate('/');
                }

            } catch (error) {
                console.error("Error:", error);
            }
        },
        onError: (error) => console.error("Login Failed:", error),
        flow: 'auth-code',
    });

    return (
        <div>
            <style>{`
                .button {
                    padding: 10px;
                    font-weight: 600;
                    display: flex;
                    position: relative;
                    overflow: hidden;
                    border-radius: 35px;
                    align-items: center;
                    border: solid black 1px;
                    outline: none;
                    cursor: pointer;
                }

                .svg {
                    height: 25px;
                    margin-right: 10px;
                    stroke: white; 
                    stroke-width: 5px;
                }

                .button .text {
                    z-index: 10;
                    font-size: 14px;
                }

                .button:hover .text {
                    animation: text forwards 0.3s;
                }

                @keyframes text {
                    from {
                        color: black;
                    }

                    to {
                        color: white;
                    }
                }

                .svg {
                    z-index: 6;
                }

                .button:hover::before {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 9%;
                    transform: translate(-50%, -50%);
                    width: 0;
                    height: 0;
                    opacity: 0;
                    border-radius: 300px;
                    animation: wave1 2.5s ease-in-out forwards;
                }

                .button:hover::after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 9%;
                    transform: translate(-50%, -50%);
                    width: 0;
                    height: 0;
                    opacity: 0;
                    border-radius: 300px;
                    animation: wave2 2.5s ease-in-out forwards;
                }

                @keyframes wave1 {
                    0% {
                        z-index: 1;
                        background: #EB4335;
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }

                    1% {
                        z-index: 1;
                        background: #EB4335;
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }

                    25% {
                        z-index: 1;
                        background: #EB4335;
                        width: 800px;
                        height: 800px;
                        opacity: 1;
                    }

                    26% {
                        z-index: 3;
                        background: #34A853;
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }

                    50% {
                        z-index: 3;
                        background: #34A853;
                        width: 800px;
                        height: 800px;
                        opacity: 1;
                    }

                    70% {
                        z-index: 3;
                        background: #34A853;
                        width: 800px;
                        height: 800px;
                        opacity: 1;
                    }

                    100% {
                        z-index: 3;
                        background: #34A853;
                        width: 800px;
                        height: 800px;
                        opacity: 1;
                    }
                }

                @keyframes wave2 {
                    0% {
                        z-index: 2;
                        background: #FBBC05;
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }

                    11% {
                        z-index: 2;
                        background: #FBBC05;
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }

                    35% {
                        z-index: 2;
                        background: #FBBC05;
                        width: 800px;
                        height: 800px;
                        opacity: 1;
                    }

                    39% {
                        z-index: 2;
                        background: #FBBC05;
                        width: 800px;
                        height: 800px;
                        opacity: 1;
                    }

                    40% {
                        z-index: 4;
                        background: #4285F4;
                        width: 0;
                        height: 0;
                        opacity: 1;
                    }

                    64% {
                        z-index: 4;
                        background: #4285F4;
                        width: 800px;
                        height: 800px;
                        opacity: 1;
                    }

                    100% {
                        z-index: 4;
                        background: #4285F4;
                        width: 800px;
                        height: 800px;
                        opacity: 1;
                    }
                }
            `}</style>
            <button onClick={() => login()} className="button">
                <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" className="svg">
                    <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" className="blue"></path>
                    <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" className="green"></path>
                    <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" className="yellow"></path>
                    <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" className="red"></path>
                </svg>
                <span className="text">Continue with Google</span>
            </button>
        </div>
    );
};

export default Login;