import React from "react";
import Header from "../widgets/header/Header";

function Workspace(props: any) {
  const { title } = props;
  return (
    <div className="workspace-window">
      <Header
        props={title}
      />
    </div>
  );
};

export default Workspace;
