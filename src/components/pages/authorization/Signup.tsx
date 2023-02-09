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
    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        repeatPassword: ''
    });
    const [passwordsMatch, setPasswordsMatch] = useState(false)
    const navigate = useNavigate();

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name, value)
        setUserInput(prev => ({
          ...prev,
          [name]: value
        }));
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
                            const response = await APP_CONTROLLER.signUpVerification(userInput.username, userInput.password);
                            typeof response === 'string' && navigate('/signin')
                            console.log(response)
                        }}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={userInput.username}
                                name="username"
                                className="form-input"
                                required
                                onChange={(e) => onInputChange(e)}>
                            </input>
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
                            <input
                                type="password"
                                placeholder="Repeat password"
                                name="repeatPassword"
                                value={userInput.repeatPassword}
                                className="form-input"
                                min={4}
                                required
                                onChange={(e) => {
                                    onInputChange(e);
                                }}>
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
                                disabled={userInput.password === userInput.repeatPassword ? false : true}
                            >Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
