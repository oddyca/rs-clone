import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISignIn } from "../../../AppTypes";

import "../../../style/auth-modal.css";
import logo_ellipse from "../../../assets/logo_ellipse.svg";
import hero_logo from "../../../assets/hero_logo.svg"

export default function SignIn(props: ISignIn) {
  const { setUserData, APP_CONTROLLER, setViewErrorModal, setErrorMessage } = props
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
        <div className="hero-shot">
          <div className="hero-top">
            <div className="top-ellipse">
              <img src={logo_ellipse} alt="logo ellipse" />
              <div className="hero_logo">
                <img src={hero_logo} alt="logo icon" />
                <p className="logo_text">Ollert</p>
              </div>
            </div>
          </div>
          <div className="hero-mid">
            <h4 className="hero_subtitle">Bring all your tasks, teammates, and tools together</h4>
            <p className="hero_paragraph">Keep everything in the same place—even if your team isn&apos;t.</p>
          </div>
        </div>
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
                } else {
                  console.log(returnResponseCheck)
                  setViewErrorModal(true);
                  setErrorMessage(returnResponseCheck.errorMessage);
                }
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
              <button className="button auth-button" type="submit">
                Sign in
              </button>
            </form>
            <p>
              Or&nbsp;
              <button
                className="signup-link"
                onClick={() => navigate("/signup")}
              >
                create new account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}