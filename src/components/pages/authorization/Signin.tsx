import { useState } from "react"
import { useNavigate } from "react-router-dom";

import "../../../style/auth-modal.css";
import Controller from "../../../lib/Controller";

interface UsernamePassword {
    [username: string]: string
}

export default function SignIn() {
    const APP_CONTROLLER = new Controller();
    const fetchedData = APP_CONTROLLER.loadData(); // only first user. Must be an array of users

    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const navigate = useNavigate();

    const  signInVerification = () => {
        const userNamePass: UsernamePassword = {
            'username': fetchedData.USER_NAME,
            'password': fetchedData.USER_PASSWORD
        }

        if (userEmail === userNamePass['username'] && userPassword === userNamePass['password']) {
            navigate('/');
        } else {
            alert('wrong user-password');
            return undefined
        }
    }

    return (
        <div className="auth-window">
            <div className="auth-modal">
                <div className="hero-shot"></div>
                <div className="auth-block">
                    <div className="auth-wrapper">
                        <h3>Sign in</h3>
                        <form className="auth-form" onSubmit={(e) => {
                            e.preventDefault()
                            signInVerification()}}>
                            <input
                                type="text"
                                placeholder="Username"
                                className="form-input"
                                required
                                onChange={(e) => setEmail(e.target.value)}>
                            </input>
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-input"
                                required
                                onChange={(e) => setPassword(e.target.value)}>
                            </input>
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
