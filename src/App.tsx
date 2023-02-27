import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { TUserWorkspace, TWorkspaceBoards } from "./AppTypes"

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
import AccountSettings from "./components/pages/AccountSettings";
import HelpPage from "./components/pages/HelpPage";
import Footer from "./components/widgets/footer/Footer";

const APP_CONTROLLER = new Controller();

function App() {
  const [userData, setUserData] = useState(APP_CONTROLLER.loadData());
  const [errorMessage, setErrorMessage] = useState("");
  const [viewErrorModal, setViewErrorModal] = useState(false);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState("");
  const [viewPartModal, setViewPartModal] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openDropDownUser, setOpenDropDownUser] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
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

    const outsideClickHandler = (e: MouseEvent) => {
      const { target } = e;
      if (target instanceof HTMLElement) {
        const className = target.className;
        if (!className.includes("dd-link")) {
          setOpenDropDown(false);
          setOpenDropDownUser(false);
        }
      }
    }
    
    document.addEventListener("mousedown", outsideClickHandler);

    return () => {
      document.removeEventListener("mousedown", outsideClickHandler)
    }
  }, []);

  useEffect(() => {
    !isLoggedIn && navigate("/signin");
  }, [location.pathname]);

  const getWorkspaces = () => {
    return userData.USER_WORKSPACES.map((workspace: TUserWorkspace, index: number) => {
      const getIndexBoard = workspace.WORKSPACE_BOARDS.map((board: TWorkspaceBoards, index: number) => {
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
    return userData.USER_WORKSPACES.map((workspace: TUserWorkspace, index: number) => {
      return workspace.WORKSPACE_BOARDS.map((board: TWorkspaceBoards, ind: number) => {
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
      {errorMessage.includes("server") && <ErrorModal
        errorMessage={errorMessage}
        viewErrorModal={viewErrorModal}
        setViewErrorModal={setViewErrorModal}
      />}
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
          userLogo={userData.USER_SETTINGS.USER_LOGO}
          openDropDown={openDropDown}
          setOpenDropDown={setOpenDropDown}
          openDropDownUser={openDropDownUser}
          setOpenDropDownUser={setOpenDropDownUser}
        />
      )}
      <div className="app_wrapper">
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
          <Route path="/accountsettings" element={<AccountSettings userData={userData} APP_CONTROLLER={APP_CONTROLLER} setUserData={setUserData} />} />
          <Route path="/help" element={<HelpPage userName={userData.USER_NAME}/>} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </div>
      {isLoggedIn === "true" && (
        <Footer/>
      )}
    </div>
  );
}

export default App;
