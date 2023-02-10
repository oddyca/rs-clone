import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import Board from "./components/pages/Board";
import Workspace from "./components/pages/Workspace";
import Page404 from "./components/pages/Page404";
import Header from "./components/widgets/header/Header";
import Controller from "./lib/Controller";
import SignIn from "./components/pages/authorization/Signin";
import SignUp from "./components/pages/authorization/Signup";

const APP_CONTROLLER = new Controller();

function App() {
  const [userData, setUserData] = useState(APP_CONTROLLER.loadData());
  const [viewData /* setViewData */] = useState({
    user: "",
    workspace: 0,
    board: 0
  });

  async function login(username: string, password: string)  {
    const response = await APP_CONTROLLER.userLogin(username, password);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа
      return  response.json();
    } else { // если HTTP-статус в диапазоне 200-299
      // получаем ошибку
      return `Ошибка:  ${response.status}`;
    }
  }

  login("user", "12345").then(
    result => console.log(result), // обработает успешное выполнение
    error => console.log(error) // обработает ошибку
  );

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
      <Header userWorkSpace={userData.USER_WORKSPACES} title={userData.USER_NAME} />
      <Routes>
        <Route
          path="/"
          element={<Navigate replace to={`/workspace-${viewData.workspace}/`} />} />
        {getWorkspaces()}
        {getBoards()}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
      <Link to="/signin">AUTH-MODAL</Link>
    </div>
  );
}

export default App;
