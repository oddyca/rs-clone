import React, { useState } from 'react'
import { Link } from "react-router-dom";

import "../../../style/auth-modal.css";
import Controller from "../../../lib/Controller";

const APP_CONTROLLER = new Controller();
const [userEmail, setEmail] = useState('');
const [userPassword, setPassword] = useState('');

function signInVerification() {
    console.log(userEmail, userPassword)
    return undefined;
}

function SignIn() {
  return (
    <div className="auth-window">
        <div className="auth-modal">
            <div className="hero-shot"></div>
            <div className="auth-block">
                <div className="auth-wrapper">
                    <h3>Sign in</h3>
                    <form className="auth-form" onSubmit={() => signInVerification()}>
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}>
                        </input>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}>
                        </input>
                        <button /*onClick={(e) => e.preventDefault()}*/>Sign in</button>
                    </form>
                    <p>Or <Link to="/signup">Create new account</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}
export default SignIn
