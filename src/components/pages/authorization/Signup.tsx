import { useState } from "react"
import { useNavigate } from "react-router-dom";

import "../../../style/auth-modal.css";
import Controller from "../../../lib/Controller";

interface UsernamePassword {
    [username: string]: string
}

export default function SignUp() {
    const APP_CONTROLLER = new Controller();
    const fetchedData = APP_CONTROLLER.loadData();

    const [userName, setUsername] = useState('');
    const [userPassword, setPassword] = useState('');
    const [userRepeatPassword, setRepeatPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false)
    const navigate = useNavigate();

    function isTheSame(repeatedPassword: string) {
        setRepeatPassword(repeatedPassword);
        if (userPassword !== userRepeatPassword) {
            setPasswordsMatch(false)
        } else {
            setPasswordsMatch(true);
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
                            const response = await APP_CONTROLLER.signUpVerification(userName, userPassword);
                            typeof response === 'string' && navigate('/signin')
                            console.log(response)
                        }}>
                            <input
                                type="text"
                                placeholder="Username"
                                className="form-input"
                                required
                                onChange={(e) => setUsername(e.target.value)}>
                            </input>
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-input"
                                min={4}
                                required
                                onChange={(e) => setPassword(e.target.value)}>
                            </input>
                            <input
                                type="password"
                                placeholder="Repeat password"
                                className="form-input"
                                min={4}
                                required
                                onChange={(e) => isTheSame(e.target.value)}>
                            </input>
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
                                disabled={!passwordsMatch}
                            >Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
