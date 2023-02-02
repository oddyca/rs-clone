import React from 'react'
import { Link } from "react-router-dom";

import "../../../style/auth-modal.css";

function SignUp() {
  return (
    <div className="auth-window">
        <div className="auth-modal">
            <div className="hero-shot"></div>
            <div className="auth-block">
                <div className="auth-wrapper">
                    <h3>Sign in</h3>
                    <form className="auth-form">
                        <input
                            type="email"
                            placeholder="Email"
                            required>
                        </input>
                        <input
                            type="password"
                            placeholder="Password"
                            required>
                        </input>
                        <input
                            type="password"
                            placeholder="Repeat password"
                            required>
                        </input>
                        <Link to="/signin">
                            <button>Sign up</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
export default SignUp
