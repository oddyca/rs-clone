import React from "react";

function AccountSettings(props: any) {
  const { userData } = props;

  return (
    <div className="account-settings-page">
      <div className="user-logo">
        <img src={userData.USER_SETTINGS.USER_LOGO} />
      </div>
      <div className="user-name">Username {userData.USER_NAME}</div>
      <div className="user-del">Delete account</div>

    </div>
  );
}

export default AccountSettings;
