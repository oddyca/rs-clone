import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css"

function Header(props: any) {
  const { title, userWorkSpace } = props;
  const [openDropDown, setOpenDropDown] = useState(false)

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <div className="header__dropdown">
            <p onClick={() => setOpenDropDown(!openDropDown)} className="header__dropdownTitle">My workspaces</p>
            {
              openDropDown && (
              <ul>
                {userWorkSpace.map((d: any) => {
                  return (
                    <li onClick={() => setOpenDropDown(false)}>
                      <Link className="link" to={`/workspace-${d.WORKSPACE_ID}`}>
                        {d.WORKSPACE_TITLE}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              )
            }
          </div>

        </div>
        <div className="header__right  user">
          <div>{title}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
