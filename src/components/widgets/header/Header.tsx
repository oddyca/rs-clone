import React from "react";
import { Link } from "react-router-dom";
import "./index.css"

function Header(props: any) {
  const { title, userWorkSpace } = props;

  return (
    <header className="header">
      {userWorkSpace.map((d: any, index: number) => {
        /* console.log(d) */
        return (
          <Link className="link" to={`/workspace-${index}`}>
            {d.WORKSPACE_TITLE}
          </Link>
        );
      })}
      <div>{title}</div>
    </header>
  );
}

export default Header;
