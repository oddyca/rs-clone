import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";

import Board from "./components/pages/Board";
import Workspace from "./components/pages/Workspace";
import Page404 from "./components/pages/Page404";
import Header from "./components/widgets/header/Header";
import Controller from "./lib/Controller";
import SignIn from "./components/pages/authorization/Signin";
import SignUp from "./components/pages/authorization/Signup";
import AllWorkspaces from "./components/pages/AllWorkspaces";

const APP_CONTROLLER = new Controller();

function App() {
  const [userData, setUserData] = useState(APP_CONTROLLER.loadData());
  const [viewData /* setViewData */] = useState({
    user: "",
    workspace: 0,
    board: 0
  });

const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loggedUserID = localStorage.getItem("userID") as string;

  useEffect(() => {
    async function getUser() {
      const userDATA = await (await APP_CONTROLLER.getUserData(loggedUserID)).json()
      const freshUsername = userDATA.username;
      const freshUserPass = userDATA.password;
      const freshUserWorkspaces = userDATA.workspaces;
      setUserData({
        USER_ID: loggedUserID,
        USER_NAME: freshUsername,
        USER_PASSWORD: freshUserPass,
        USER_WORKSPACES: freshUserWorkspaces
      });
    }
    loggedUserID && getUser();
    isLoggedIn === 'true' ? navigate('/') : navigate('/signin', {replace: true});
  }, []);
  // localStorage.removeItem('isLoggedIn')

  const getWorkspaces = () => {
    return userData.USER_WORKSPACES.map((workspace: any, index: number) => {
      const getIndexBoard = workspace.WORKSPACE_BOARDS.map((index: number) => {
        return (
          workspace.WORKSPACE_BOARDS[index]
        )
      });
      return (
        <Route
          path={`/workspace-${workspace.WORKSPACE_ID}/`}
          element={<Workspace setUserData={setUserData} WORKSPACE_ID={workspace.WORKSPACE_ID} BOARD={getIndexBoard} APP_CONTROLLER={APP_CONTROLLER} WORKSPACE={userData.USER_WORKSPACES[index]} />}
        />
      );
    });
  };

  const getBoards = () => {
    return userData.USER_WORKSPACES.map((workspace: any, index: number) => {
      return workspace.WORKSPACE_BOARDS.map((board: any, ind: number) => {
        return (
          <Route
            path={`/workspace-${workspace.WORKSPACE_ID}/board-${board.BOARD_ID}/`}
            element={<Board setUserData={setUserData} WORKSPACE_ID={workspace.WORKSPACE_ID} APP_CONTROLLER={APP_CONTROLLER} BOARD={workspace.WORKSPACE_BOARDS[ind]} />}
          />
        );
      });
    });
  };

  return (
    <div className="App">
      {isLoggedIn === "true" && (<Header userWorkSpace={userData.USER_WORKSPACES} title={userData.USER_NAME} />)}
      <Routes>
        <Route
          path="/"
          element={<AllWorkspaces allWorkSpaces={userData.USER_WORKSPACES}/>} />
        {getWorkspaces()}
        {getBoards()}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
