import React from "react";
import { Link } from "react-router-dom";

function Header(props: any) {
  const { title, userWorkSpace } = props;

  return (
    <div className="Header">
      {userWorkSpace.map((d: any, index: number) => {
        /* console.log(d) */
        return (
          <Link
          className="link" to={`/workspace-${index}`}>{d.WORKSPACE_TITLE}</Link>
        )
      })}
      <div>{title}</div>
    </div>
  );
};

export default Header;
