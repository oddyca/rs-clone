import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Board from "./components/pages/Board";
import Workspace from "./components/pages/Workspace";
import Page404 from "./components/pages/Page404";
import Header from "./components/widgets/header/Header";
import Controller from "./lib/Controller";
import SignIn from "./components/pages/authorization/Signin";
import SignUp from "./components/pages/authorization/Signup";
import AllWorkspaces from "./components/pages/AllWorkspaces";
import PartModal from "./components/widgets/participant/PartModal";

const APP_CONTROLLER = new Controller();

function App() {
  const [userData, setUserData] = useState(APP_CONTROLLER.loadData());

  const [currentWorkspaceId, setCurrentWorkspaceId] = useState("");
  const [viewPartModal, setViewPartModal] = useState(false);
  const navigate = useNavigate();
  // localStorage.clear();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loggedUserID = localStorage.getItem("userID") as string;

  useEffect(() => {
    async function getUser() {
      try {
        await APP_CONTROLLER.setCurrentUser(loggedUserID);
        const freshUser = APP_CONTROLLER.currentUser;
        setUserData({
          USER_ID: loggedUserID,
          USER_NAME: freshUser.USER_NAME,
          USER_PASSWORD: freshUser.USER_PASSWORD,
          USER_WORKSPACES: freshUser.USER_WORKSPACES,
        });
      } catch (e) {
        localStorage.clear();
        navigate("/signin");
      }
    }
    loggedUserID && getUser();
    isLoggedIn === "true" ? navigate("/") : navigate("/signin", { replace: true });
  }, []);

  const getWorkspaces = () => {
    return userData.USER_WORKSPACES.map((workspace: any, index: number) => {
      const getIndexBoard = workspace.WORKSPACE_BOARDS.map((index: number) => {
        return workspace.WORKSPACE_BOARDS[index];
      });
      return (
        <Route
          path={`/workspace-${workspace.WORKSPACE_ID}/`}
          element={
            <Workspace
              setUserData={setUserData}
              WORKSPACE_ID={workspace.WORKSPACE_ID}
              BOARD={getIndexBoard}
              setAddParticipantModal={setViewPartModal}
              setCurrentWorkspaceId={setCurrentWorkspaceId}
              APP_CONTROLLER={APP_CONTROLLER}
              WORKSPACE={userData.USER_WORKSPACES[index]}
              setParticipant={setParticipant}
            />
          }
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
            element={
              <Board
                setUserData={setUserData}
                WORKSPACE_ID={workspace.WORKSPACE_ID}
                APP_CONTROLLER={APP_CONTROLLER}
                BOARD={workspace.WORKSPACE_BOARDS[ind]}
              />
            }
          />
        );
      });
    });
  };

  const setParticipant = (workspaceId: string, participant: string, act: string) => {
    if (act === "add") {
      APP_CONTROLLER.setParticipant(currentWorkspaceId, participant, act).then(
        result => {
          APP_CONTROLLER.addParticipant(participant, currentWorkspaceId);
          setUserData(structuredClone(APP_CONTROLLER.loadData()));
        },
        error => console.log(error))
    }
    if (act === "del") {
      if (participant === userData.USER_NAME) return;
      APP_CONTROLLER.setParticipant(workspaceId, participant, act).then(
        result => {
          APP_CONTROLLER.delParticipant(participant, currentWorkspaceId);
          setUserData(structuredClone(APP_CONTROLLER.loadData()));
        },
        error => console.log(error))
    }
  };

  return (
    <div className="App">
      <PartModal
        viewPartModal={viewPartModal}
        setViewPartModal={setViewPartModal}
        setParticipant={setParticipant}
        currentWorkspaceId={currentWorkspaceId}
      />
      {isLoggedIn === "true" && (
        <Header userWorkSpace={userData.USER_WORKSPACES} title={userData.USER_NAME} />
      )}
      <Routes>
        <Route path="/" element={<AllWorkspaces user={userData} />} />
        {getWorkspaces()}
        {getBoards()}
        <Route path="/signin" element={<SignIn setUserData={setUserData} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
