import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AccountSettings(props: any) {
  const { userData } = props;
  const { setUserData } = props;
  const { APP_CONTROLLER } = props;

  const navigate = useNavigate();

  const imgFileInput = useRef<null | HTMLInputElement>(null);

  const loadImgFile = () => {
    if (imgFileInput.current?.files) {
      const blob = new Blob([imgFileInput.current.files[0]], {
        type: "image/png"
      });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const newUser = userData;
          newUser.USER_SETTINGS.USER_LOGO = reader.result;
          APP_CONTROLLER.setData(newUser);
          setUserData(structuredClone(APP_CONTROLLER.loadData()));
        }
      };
    }
  };

  return (
    <div className="account-settings-page">
      <input
        type="file"
        id="custom-file-upload"
        onChange={loadImgFile}
        ref={imgFileInput}
      />
      <div className="user-logo">
        <img src={userData.USER_SETTINGS.USER_LOGO} />
        <div
          className="user-logo-btn"
          onClick={() => {
            document.getElementById("custom-file-upload")?.click();
          }}
        >Select user logo
        </div>
      </div>
      <div className="user-name">Username {userData.USER_NAME}</div>
      <div className="user-del" onClick={() => {
        localStorage.clear();
        APP_CONTROLLER.delUser(userData.USER_ID).then(
          async (result: Response) => {
            console.log( await result.json());
            navigate("/signin");
          },
          async (error: Response) => {
            console.log(await error.json());
          }
        );
      }}>Delete account
      </div>
    </div>
  );
}

export default AccountSettings;
