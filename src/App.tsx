import React, { useState } from "react";
import "./App.css";
import Workspace from "./components/pages/Workspace";
import { Controller } from "./lib/Controller";
const APP_CONTROLLER = new Controller();

function App() {
  const [appView, setAppView] = useState(APP_CONTROLLER.loadData());

  return (
    <div className="App">
      <Workspace
        title={appView.USER_DATA.USER_WORKSPACES[0].WORKSPACE_TITLE}
      />
    </div>
  );
}

export default App;
