import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Board from "./components/pages/Board";
import Workspace from "./components/pages/Workspace";
import Page404 from "./components/pages/Page404";
import Header from "./components/widgets/header/Header";
import Controller from "./lib/Controller";

const APP_CONTROLLER = new Controller();

function App() {
  const [userData, setUserData] = useState(APP_CONTROLLER.loadData());
  const [viewData, setViewData] = useState({
    user: "",
    workspace: 0,
    board: 0,
  });

  const getWorkspaces = () => {
    return userData.USER_WORKSPACES.map((workspace: any, index: number) => {
      return (
        <Route path={`/workspace-${index}/`} element={<Workspace
          workIndex={index}
          WORKSPACE={userData.USER_WORKSPACES[index]}
        />}></Route>
      )
    })
  }

  const getBoards = () => {
    return userData.USER_WORKSPACES.map((workspace: any, index: number) => {
    return workspace.WORKSPACE_BOARDS.map((board: any, ind: number) => {
      return (
        <Route
          path={`/workspace-${index}/board-${ind}/`}
          element={
            <Board
              BOARD={workspace.WORKSPACE_BOARDS[ind]
              }
            />
          }
        ></Route>
      )
    })})
  }

  return (
    <div className="App">
      <Header
        userWorkSpace={userData.USER_WORKSPACES}
        title={userData.USER_NAME}
      />
      <Routes>
        <Route path="/" element={<Navigate replace to={`/workspace-${viewData.workspace}/`} />}></Route>
        {getWorkspaces()}
        {getBoards()}
        <Route path="/404" element={<Page404 />}></Route>
        <Route path="*" element={<Navigate replace to="/404" />}></Route>
      </Routes>
    </div>
  );
}

export default App;
