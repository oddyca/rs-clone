import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import USER_DEFAULT_DATA from "../../lib/config";
import { TAccountSettingsProps } from "../../AppTypes";
import "../../style/account-settings.css";

function AccountSettings(props: TAccountSettingsProps) {
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
      <div className="page-title">
        <h3>Account Settings</h3>

      </div>
      <div className="account-settings_main">
        <div className="account-setting_window">
          <input
            type="file"
            id="custom-file-upload"
            onChange={loadImgFile}
            ref={imgFileInput}
          />
          <div className="user-logo">
            <div 
              className="user-logo_container"
              style={{backgroundImage: `url(${userData.USER_SETTINGS.USER_LOGO})`}}
            />
            <h3>{userData.USER_NAME}</h3>
          </div>
          <div className="account-settings_settings">
            <div
                className="settings-btn"
                onClick={() => {
                  document.getElementById("custom-file-upload")?.click();
                }}
              >Select user logo
            </div>
            <div
              className="settings-btn"
              onClick={() => {
                localStorage.clear();
                APP_CONTROLLER.currentUser = USER_DEFAULT_DATA
                setUserData(structuredClone(APP_CONTROLLER.loadData()));
                navigate("/signin", { replace: true });
              }}
            >Log out
            </div>
            <div className="user-del settings-btn" onClick={() => {
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
              }}>DELTE ACCOUNT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
