import { useState } from "react"
import { useNavigate } from "react-router-dom";

import "../../../style/auth-modal.css";
import Controller from "../../../lib/Controller";

export default function SignIn() {
    const APP_CONTROLLER = new Controller();

    const [userName, setName] = useState('');
    const [userPassword, setPassword] = useState('');
    const [responseMessages, setResponseMessages] = useState({
        errorType: '',
        errorMessage: '',
        isValid: false
    });
    const navigate = useNavigate();

    return (
        <div className="auth-window">
            <div className="auth-modal">
                <div className="hero-shot"></div>
                <div className="auth-block">
                    <div className="auth-wrapper">
                        <h3>Sign in</h3>
                        <form className="auth-form" onSubmit={async (e) => {
                            e.preventDefault()
                            const response = await APP_CONTROLLER.signInVerification(userName, userPassword);
                            setResponseMessages(APP_CONTROLLER.returnResponseCheck());
                            console.log("responseMessages", responseMessages)
                            responseMessages.isValid && navigate('/');
                        }}>
                            <input
                                type="text"
                                placeholder="Username"
                                className="form-input"
                                required
                                onChange={(e) => setName(e.target.value)}>
                            </input>
                            {
                                (responseMessages.errorMessage && responseMessages.errorType === 'username') 
                                && <span className="error-message">{responseMessages.errorMessage}</span>
                            }
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-input"
                                required
                                onChange={(e) => setPassword(e.target.value)}>
                            </input>
                            {
                                (responseMessages.errorMessage && responseMessages.errorType === 'password') 
                                && <span className="error-message">{responseMessages.errorMessage}</span>
                            }
                            <a className="forgot-password">Forgot password?</a>
                            <button className="button auth-button">Sign in</button>
                        </form>
                        <p>Or <a className="signup-link" onClick={()=> navigate('/signup')}>Create new account</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
