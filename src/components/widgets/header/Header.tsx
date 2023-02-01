import React from "react";

function Header(props: any) {
  const { title } = props;
  return (
    <div className="Header">
      <div>{title}</div>
    </div>
  );
};

export default Header;
