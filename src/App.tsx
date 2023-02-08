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
  const [userData /* setUserData */] = useState(APP_CONTROLLER.loadData());
  const [viewData /* setViewData */] = useState({
    user: "",
    workspace: 0,
    board: 0
  });
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn")

  useEffect(() => {
    console.log("LOADED, CHECKING isLoggedIn")
    isLoggedIn === 'true' ? navigate('/') : navigate('/signin')
  }, [])
  // localStorage.removeItem('isLoggedIn')

  const getWorkspaces = () => {
    return userData.USER_WORKSPACES.map((workspace: any, index: number) => {
      return (
        <Route
          path={`/workspace-${workspace.WORKSPACE_ID}/`}
          element={<Workspace WORKSPACE={userData.USER_WORKSPACES[index]} />}
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
            element={<Board BOARD={workspace.WORKSPACE_BOARDS[ind]} />}
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
