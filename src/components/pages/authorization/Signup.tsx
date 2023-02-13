import { useState } from "react"
import { useNavigate } from "react-router-dom";

import "../../../style/auth-modal.css";
import Controller from "../../../lib/Controller";

interface UsernamePassword {
    [username: string]: string
}

export default function SignUp() {
    const APP_CONTROLLER = new Controller();
    const [responseMessages, setResponseMessages] = useState({
        errorType: '',
        errorMessage: '',
        isValid: false
    });
    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        repeatPassword: ''
    });
    const navigate = useNavigate();
    const allowed = /^[a-zA-Z0-9_]+$/;
    
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        if (event.target.name === "username" && value && !allowed.test(event.target.value)) {
            event.preventDefault();
        } else {
            setUserInput(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    return (
        <div className="auth-window">
            <div className="auth-modal">
                <div className="hero-shot"></div>
                <div className="auth-block">
                    <div className="auth-wrapper">
                        <h3 className="h3-heading">Sign up</h3>
                        <form className="auth-form" onSubmit={async (e) => {
                            e.preventDefault();
                            await APP_CONTROLLER.signUpVerification(userInput.username, userInput.password);
                            const returnResponseCheck = APP_CONTROLLER.returnResponseCheck();
                            setResponseMessages(returnResponseCheck);
                            returnResponseCheck.isValid && navigate('/signin', {replace: true}); 
                        }}>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={userInput.username}
                                    name="username"
                                    className="form-input"
                                    required
                                    onChange={(e) => onInputChange(e)}>
                                </input>
                                {
                                    (responseMessages.errorMessage && responseMessages.errorType === 'userSignUp') 
                                    && <span className="error-message">{responseMessages.errorMessage}</span>
                                }
                            </div>
                            <div className="input-wrapper">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={userInput.password}
                                    className="form-input"
                                    min={4}
                                    required
                                    onChange={(e) => onInputChange(e)}>
                                </input>
                                { userInput.password && userInput.password.length < 4 && <span className="error-message">Password is too short!</span> }
                            </div>
                            <div className="input-wrapper">
                                <input
                                    type="password"
                                    placeholder="Repeat password"
                                    name="repeatPassword"
                                    value={userInput.repeatPassword}
                                    className="form-input"
                                    min={4}
                                    required
                                    onChange={(e) => onInputChange(e)}>
                                </input>
                                {
                                    (userInput.repeatPassword && userInput.password !== userInput.repeatPassword) 
                                    && <span className="error-message">Passwords don't match</span>
                                }
                            </div>
                            <label htmlFor="privacy">
                                <input
                                    type="checkbox"
                                    id="privacy"
                                    required>
                                </input>
                            I agree with the Privacy policy
                            </label>
                            <button 
                                className="button auth-button sign-up"
                                disabled={!userInput.password || userInput.password !== userInput.repeatPassword || userInput.password.length < 4 ? true : false}
                            >Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
