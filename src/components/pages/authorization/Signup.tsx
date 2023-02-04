import { useState } from "react"
import { useNavigate } from "react-router-dom";

import "../../../style/auth-modal.css";
import Controller from "../../../lib/Controller";

interface UsernamePassword {
    [username: string]: string
}

export default function SignUp() {
    const APP_CONTROLLER = new Controller();
    const fetchedData = APP_CONTROLLER.loadData(); // only first user. Must be an array of users

    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userRepeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();

    const  signInVerification = () => {
        const userNamePass: UsernamePassword = {
            'username': fetchedData.USER_NAME,
            'password': fetchedData.USER_PASSWORD
        }

        if (userEmail // will check if it exists already 
            && (userRepeatPassword === userPassword)) {
            navigate('/signin');
        } else {
            alert('password don\'t match');
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
                            <input
                                type="password"
                                placeholder="Repeat password"
                                className="form-input"
                                required
                                onChange={(e) => setRepeatPassword(e.target.value)}>
                            </input>
                            <label htmlFor="privacy">
                            <input
                                type="checkbox"
                                id="privacy"
                                required>
                            </input>
                            I agree with the Privacy policy
                            </label>
                            
                            <button className="button auth-button">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
