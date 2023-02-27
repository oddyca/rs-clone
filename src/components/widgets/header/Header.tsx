import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import myAccount from "../../../assets/myaccount.svg";
import settings from "../../../assets/settings.svg";
import support from "../../../assets/support.svg";
import logout from "../../../assets/logout.svg";
import "./index.css";
import WorkSpaceModal from "../list/WorkSpaceModal";
import USER_DEFAULT_DATA from "../../../lib/config";

function Header(props: any) {
  const { title, userWorkSpace, APP_CONTROLLER, setUserData, userLogo } = props;
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
              </ul>
            )}
          </div>
        </div>
        <div className="header__right  user">
          <button
            className="btn__dropdown  userDrop  dropdownBtnUser"
            onClick={() => setOpenDropDownUser(!openDropDownUser)}
            type="submit"
          >
            <div className="user__icon">
              <img className="userIcon" src={userLogo} alt="322" />
            </div>
            <div className="user__title">{title}</div>
            {openDropDownUser && (
              <ul className="dropdownBg  dropdownBgUser">
                <li className="dropdownBgUserList">
                  <button
                    type="submit"
                    onClick={() => setOpenDropDownUser(false)}
                    className="header__dropdownChild  btn__dropdown  dropdownBtn  dropdownBtnUser"
                  >
                    <Link className="link" to="/accountsettings">
                      <div className="user__list-inner">
                        <img src={myAccount} alt="" />
                        <div>My account</div>
                      </div>
                    </Link>
                  </button>
                </li>
                <div className="br_border" />
                <li className="dropdownBgUserList">
                  <button
                    type="submit"
                    onClick={() => setOpenDropDownUser(false)}
                    className="header__dropdownChild  btn__dropdown  dropdownBtn  dropdownBtnUser"
                  >
                    <Link className="link" to="/appsettings">
                      <div className="user__list-inner">
                        <img src={settings} alt="" />
                        <div>Settings</div>
                      </div>
                    </Link>
                  </button>
                </li>
                <li className="dropdownBgUserList">
                  <button
                    type="submit"
                    onClick={() => setOpenDropDownUser(false)}
                    className="header__dropdownChild  btn__dropdown  dropdownBtn  dropdownBtnUser"
                  >
                    <Link className="link" to="/help">
                      <div className="user__list-inner">
                        <img src={support} alt="" />
                        <div>Support</div>
                      </div>
                    </Link>
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
                            APP_CONTROLLER.setUserData().then(
                              async (result: Response) => {
                                console.log( await result.json());
                                APP_CONTROLLER.currentUser = USER_DEFAULT_DATA;
                                setUserData(structuredClone(APP_CONTROLLER.loadData()));
                              },
                              async (error: Response) => {
                                console.log(await error.json());
                              }
                            );
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
