import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../../style/auth-modal.css";
import { ISetUserData } from "../../../AppTypes"

export default function SignIn(props: ISetUserData) {
  const { setUserData, APP_CONTROLLER } = props
  const [userName, setName] = useState("");
  const [userPassword, setPassword] = useState("");
  const [responseMessages, setResponseMessages] = useState({
    errorType: "",
    errorMessage: "",
    isValid: false,
  });
  const navigate = useNavigate();

  return (
    <div className="auth-window">
      <div className="auth-modal">
        <div className="hero-shot" />
        <div className="auth-block">
          <div className="auth-wrapper">
            <h3>Sign in</h3>
            <form
              className="auth-form"
              onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                await APP_CONTROLLER.signInVerification(userName, userPassword);
                const returnResponseCheck = APP_CONTROLLER.returnResponseCheck();
                setResponseMessages(returnResponseCheck);
                if (returnResponseCheck.isValid) {
                  setUserData(structuredClone(APP_CONTROLLER.loadData()));
                  navigate("/")
                };
              }}
            >
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Username"
                  className="form-input"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                {responseMessages.errorMessage && responseMessages.errorType === "username" && (
                  <span className="error-message">{responseMessages.errorMessage}</span>
                )}
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                {responseMessages.errorMessage && responseMessages.errorType === "password" && (
                  <span className="error-message">{responseMessages.errorMessage}</span>
                )}
              </div>
              <a className="forgot-password" href="/#">
                Forgot password?
              </a>
              <button className="button auth-button" type="submit">
                Sign in
              </button>
            </form>
            <p>
              Or
              <a className="signup-link" onClick={() => navigate("/signup")}>
                Create new account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
