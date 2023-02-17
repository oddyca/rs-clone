import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import search_icon from "../../../assets/search_icon.svg";
import logouser from "../../../assets/usericon.png";
import myaccount from "../../../assets/myaccount.svg";
import settings from "../../../assets/settings.svg";
import support from "../../../assets/support.svg";
import logout from "../../../assets/logout.svg";
import "./index.css";
import WorkSpaceModal from "../list/WorkSpaceModal";

function Header(props: any) {
  const { title, userWorkSpace, APP_CONTROLLER, setUserData } = props;
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openDropDownUser, setOpenDropDownUser] = useState(false);
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] = useState(false);

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <div className="header__logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="header__dropdown">
            <button /* Сделал кнопки чтобы ESLint не ругался */
              type="submit"
              onClick={() => setOpenDropDown(!openDropDown)}
              className="header__dropdownTitle  btn__dropdown"
            >
              My workspaces
            </button>
            {openDropDown && (
              <ul className="dropdownBg">
                {userWorkSpace.map((d: any) => {
                  return (
                    /* Сделал кнопки чтобы ES Lint не ругался */
                    <li className="dropdownList">
                      <button
                        type="submit"
                        onClick={() => setOpenDropDown(false)}
                        className="header__dropdownChild  btn__dropdown  dropdownBtn"
                      >
                        <Link className="link  dropdownLink" to={`/workspace-${d.WORKSPACE_ID}`}>
                          {d.WORKSPACE_TITLE}
                        </Link>
                      </button>
                    </li>
                  );
                })}
                <li className="dropdownList">
                  <button
                    type="submit"
                    className="header__dropdownChild  btn__dropdown  dropdownBtn"
                    onClick={(e) => {
                      setShowNewWorkspaceModal(true);
                    }}
                  >
                    Add workspace
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="header__search">
          <input className="searchInput" type="text" />
          <button className="btn__custom" type="submit">
            <img src={search_icon} alt="" />
          </button>
        </div>
        <div className="header__right  user">
          <button
            className="btn__dropdown  userDrop  dropdownBtnUser"
            onClick={() => setOpenDropDownUser(!openDropDownUser)}
            type="submit"
          >
            <div className="user__icon">
              <img className="userIcon" src={logouser} alt="" />
            </div>
            <div>{title}</div>
            {openDropDownUser && (
              <ul className="dropdownBg  dropdownBgUser">
                <li className="dropdownBgUserList">
                  <button
                    type="submit"
                    onClick={() => setOpenDropDownUser(false)}
                    className="header__dropdownChild  btn__dropdown  dropdownBtn  dropdownBtnUser"
                  >
                    <div className="user__list-inner">
                      <img src={myaccount} alt="" />
                      <div>My account</div>
                    </div>
                  </button>
                </li>
                <div className="br_border" />
                <li className="dropdownBgUserList">
                  <button
                    type="submit"
                    onClick={() => setOpenDropDownUser(false)}
                    className="header__dropdownChild  btn__dropdown  dropdownBtn  dropdownBtnUser"
                  >
                    <div className="user__list-inner">
                      <img src={settings} alt="" />
                      <div>Settings</div>
                    </div>
                  </button>
                </li>
                <li className="dropdownBgUserList">
                  <button
                    type="submit"
                    onClick={() => setOpenDropDownUser(false)}
                    className="header__dropdownChild  btn__dropdown  dropdownBtn  dropdownBtnUser"
                  >
                    <div className="user__list-inner">
                      <img src={support} alt="" />
                      <div>Support</div>
                    </div>
                  </button>
                </li>
                <div className="br_border" />
                <li className="dropdownBgUserList">
                  <button
                    type="submit"
                    onClick={() => setOpenDropDownUser(false)}
                    className="header__dropdownChild  btn__dropdown  dropdownBtn  dropdownBtnUser"
                  >
                    <Link className="link" to="/signin">
                      <div className="user__list-inner">
                        <img src={logout} alt="" />
                        <div
                          onClick={() => {
                            localStorage.clear();
                          }}
                        >
                          Log out
                        </div>
                      </div>
                    </Link>
                  </button>
                </li>
              </ul>
            )}
          </button>
        </div>
      </div>
      {showNewWorkspaceModal && (
        <WorkSpaceModal
          showModal={showNewWorkspaceModal}
          setShowModal={setShowNewWorkspaceModal}
          APP_CONTROLLER={APP_CONTROLLER}
          setUserData={setUserData}
        />
      )}
    </header>
  );
}

export default Header;
