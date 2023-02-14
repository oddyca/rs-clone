import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props: any) {
  const { setUserData } = props;
  const { APP_CONTROLLER } = props;
  const { setIsLogged } = props;

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  async function login(username: string, password: string) {
    const response = await APP_CONTROLLER.userLogin(username, password);
    if (response.ok) {
      return response.json();
    } else {
      return `Ошибка:  ${response.status}`;
    }
  };

  async function getData(id: string) {
    const response = await APP_CONTROLLER.getUserData(id);
    if (response.ok) {
      return response.json();
    } else {
      return `Ошибка:  ${response.status}`;
    }
  };

  function setName(e: any) {
    setUserName(e.target.value);
  };

  function setPass(e: any) {
    setUserPassword(e.target.value);
  }


  return (
    <div>
      USERNAME
      <input
        onChange={setName}
        value={userName}
      />
      PASSWORD
      <input
        onChange={setPass}
        value={userPassword}
      />
      <button onClick={() => {
        login(userName, userPassword).then(
          result => getData(result).then(
            result => {
              APP_CONTROLLER.setUser(result);
              setUserData(APP_CONTROLLER.loadData());
              setIsLogged(true);
              navigate("/");
            },
            error => console.log(error)
          ),
          error => console.log(error)
        );
      }}>LOGIN
      </button>
    </div>
  );
};

export default Login;
