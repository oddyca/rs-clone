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
import ErrorModal from "./components/widgets/error/ErrorModal";

const APP_CONTROLLER = new Controller();

function App() {
  const [userData, setUserData] = useState(APP_CONTROLLER.loadData());
  const [errorMessage, setErrorMessage] = useState("");
  const [viewErrorModal, setViewErrorModal] = useState(false);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState("");
  const [viewPartModal, setViewPartModal] = useState(false);
  const navigate = useNavigate();
  localStorage.clear();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loggedUserID = localStorage.getItem("userID") as string;

  useEffect(() => {
    async function getUser() {
      try {
        await APP_CONTROLLER.setCurrentUser(loggedUserID);
        setUserData(structuredClone(APP_CONTROLLER.loadData()));
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
              users={userData.USER_SETTINGS.USER_PARTICIPANTS}
              userLogo={userData.USER_SETTINGS.USER_LOGO}
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
                userData={userData}
              />
            }
          />
        );
      });
    });
  };

  const setParticipant = (workspaceId: string, participant: string, act: string) => {
    if (act === "add") {
      const indexWorkSpace = APP_CONTROLLER.getIndexWorkspace(workspaceId);
      if (userData.USER_WORKSPACES[indexWorkSpace].WORKSPACE_PS.includes(participant)) {
        setErrorMessage(`${participant} already was added!`);
        setViewErrorModal(true);
        return;
      }
      APP_CONTROLLER.setParticipant(currentWorkspaceId, participant, act).then(
        (result) => {
          APP_CONTROLLER.addParticipant(participant, currentWorkspaceId);
          setUserData(structuredClone(APP_CONTROLLER.loadData()));
        },
        (error) => console.log(error)
      );
    }
    if (act === "del") {
      if (participant === userData.USER_NAME) return;
      APP_CONTROLLER.setParticipant(workspaceId, participant, act).then(
        (result) => {
          APP_CONTROLLER.delParticipant(participant, currentWorkspaceId);
          setUserData(structuredClone(APP_CONTROLLER.loadData()));
        },
        (error) => console.log(error)
      );
    }
  };

  return (
    <div className="App">
      <ErrorModal
        errorMessage={errorMessage}
        viewErrorModal={viewErrorModal}
        setViewErrorModal={setViewErrorModal}
      />
      <PartModal
        viewPartModal={viewPartModal}
        setViewPartModal={setViewPartModal}
        setParticipant={setParticipant}
        currentWorkspaceId={currentWorkspaceId}
        users={userData.USER_SETTINGS.USER_PARTICIPANTS}
      />
      {isLoggedIn === "true" && (
        <Header
          APP_CONTROLLER={APP_CONTROLLER}
          userWorkSpace={userData.USER_WORKSPACES}
          title={userData.USER_NAME}
          setUserData={setUserData}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <AllWorkspaces
              APP_CONTROLLER={APP_CONTROLLER}
              setUserData={setUserData}
              user={userData}
            />
          }
        />
        {getWorkspaces()}
        {getBoards()}
        <Route path="/signin" element={<SignIn setUserData={setUserData} APP_CONTROLLER={APP_CONTROLLER} setViewErrorModal={setViewErrorModal} setErrorMessage={setErrorMessage}/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;