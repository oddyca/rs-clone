import React, { useState } from "react";
import "./App.css";
import Workspace from "./components/pages/Workspace";
import Page404 from "./components/pages/Page404";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import { Controller } from "./lib/Controller";
import Board from "./components/pages/Board";


const APP_CONTROLLER = new Controller();

function App() {
  const [appView, setAppView] = useState(APP_CONTROLLER.loadData());

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/workspace" />}>
        </Route>
        <Route path="/workspace" element={<Workspace
          appView={appView}
        />}>
        </Route>
        <Route path={'/workspace/:id'} element={<Board />}>
        </Route>
        <Route path="/404" element={<Page404 />}>
        </Route>
        <Route path="*" element={<Navigate replace to="/404" />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
