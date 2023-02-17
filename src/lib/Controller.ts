import { nanoid } from "nanoid";
import USER_DEFAULT_DATA from "./config";
import { TUser, TUserWorkspace } from "../AppTypes";

export default class Controller {
  public currentUser: TUser;
  // public currentUser: any;

  constructor(defaultUser = JSON.parse(JSON.stringify(USER_DEFAULT_DATA))) {
    this.currentUser = defaultUser;
  }

  getIndexWorkspace(workspaceId: string): number {
    return this.currentUser.USER_WORKSPACES.findIndex(
      (elem: TUserWorkspace) => elem.WORKSPACE_ID === workspaceId,
    );
  }

  getIndexBoard(workspaceId: string, boardId: string): number {
    return this.currentUser.USER_WORKSPACES[
      this.getIndexWorkspace(workspaceId)
    ].WORKSPACE_BOARDS.findIndex((elem: any) => elem.BOARD_ID === boardId);
  }

  getBoards(workspaceId: string, boardId: string): object[] {
    return this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS[
      this.getIndexBoard(workspaceId, boardId)
    ].BOARD_LISTS;
  }

  loadData() {
    return this.currentUser;
  }

  deleteBoard(userData: any) {
    const workspaceId = userData.WORKSPACE_ID;
    const boardId = userData.BOARD_ID;

    this.getIndexWorkspace(workspaceId);
    this.getIndexBoard(workspaceId, boardId);
    this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS.splice(
      this.getIndexBoard(workspaceId, boardId),
      1,
    );
  }

  sortList(userData: any) {
    const workspaceId = userData.WORKSPACE_ID;
    const boardId = userData.BOARD_ID;
    const { dragList } = userData;
    const { dropList } = userData;

    const currentListArr = this.getBoards(workspaceId, boardId);
    const newListArr = currentListArr.map((elem: any) => {
      if (elem.LIST_ID === dropList.LIST_ID) {
        return { ...elem, LIST_ORDER: dragList.LIST_ORDER };
      }
      if (elem.LIST_ID === dragList.LIST_ID) {
        return { ...elem, LIST_ORDER: dropList.LIST_ORDER };
      }
      return elem;
    });
    this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS[
      this.getIndexBoard(workspaceId, boardId)
    ].BOARD_LISTS = structuredClone(newListArr);
  }

  sortListCard(userData: any) {
    const workspaceId = userData.WORKSPACE_ID;
    const boardId = userData.BOARD_ID;
    const { dragList } = userData;
    const { dragTask } = userData;
    const { dropList } = userData;
    const currentListArr = this.getBoards(workspaceId, boardId);

    dropList.LIST_CARDS.push(dragTask);
    const currentIndexList = dragList.LIST_CARDS.indexOf(dragTask);
    dragList.LIST_CARDS.splice(currentIndexList, 1);
    const newListEmpty = currentListArr.map((elem: any) => {
      if (elem.LIST_ID === dropList.LIST_ID) {
        return dropList;
      }
      if (elem.LIST_ID === dragList.LIST_ID) {
        return dragList;
      }
      return elem;
    });
    this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS[
      this.getIndexBoard(workspaceId, boardId)
    ].BOARD_LISTS = structuredClone(newListEmpty);
  }

  sortCard(userData: any) {
    // todo описать в AppTypes @cumPositor#7629
    const workspaceId = userData.WORKSPACE_ID;
    const boardId = userData.BOARD_ID;
    const { dragList } = userData;
    const { dropList } = userData;
    const { dragCard } = userData;
    const { dropCard } = userData;

    const dragIndexCard = dragList.LIST_CARDS.indexOf(dragCard);
    const dropIndexCard = dropList.LIST_CARDS.indexOf(dropCard);
    //
    // console.log("dragIndexCard = ", dragIndexCard);
    // console.log("dropIndexCard = ", dropIndexCard);

    dragList.LIST_CARDS.splice(dragIndexCard, 1);
    dropList.LIST_CARDS.splice(dropIndexCard, 0, dragCard);

    const currentListArr = this.getBoards(workspaceId, boardId);
    const newListArr = currentListArr.map((elem: any) => {
      if (elem.LIST_ID === dropList.LIST_ID) return dropList;
      if (elem.LIST_ID === dragList.LIST_ID) return dragList;
      return elem;
    });
    this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS[
      this.getIndexBoard(workspaceId, boardId)
    ].BOARD_LISTS = structuredClone(newListArr);
  }

  async userRegistration(username: string, password: string) {
    const newUser = {
      username,
      password,
      workspaces: USER_DEFAULT_DATA.USER_WORKSPACES,
    };
    return fetch("http://localhost:3008/api/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newUser),
    });
  }

  async userLogin(username: string, password: string) {
    const newUser = {
      username,
      password,
    };
    return fetch("http://localhost:3008/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newUser),
    });
  }

  async getUserData(id: string) {
    return fetch(`http://localhost:3008/api/userdata?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // async setUserData(id) {
  //
  // }

  async signInVerification(username: string, password: string): Promise<Response> {
    try {
      const response = await this.userLogin(username, password);
      const parsedResponse = await response.json();
      if (!response.ok) {
        const responseMessage = Object.values(parsedResponse)[0] as string;
        this.responseMessageHandler(responseMessage);
      } else {
        this.responseCheck.isValid = true;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userID", `${parsedResponse}`); // When session is reloaded laod data of this user from the server
        await this.setCurrentUser(parsedResponse);
      }
      return parsedResponse;
    } catch (e) {
      throw e;
    }
  }

  async signUpVerification(username: string, password: string) {
    try {
      const response = await this.userRegistration(username, password);
      const parsedResponse = await response.json();
      if (!response.ok) {
        const responseMessage = Object.values(parsedResponse)[0] as string;
        this.responseMessageHandler(responseMessage);
      } else {
        console.log("Sign Up SUCCESSFUL");
        this.responseCheck.isValid = true;
      }
      return response;
    } catch (e) {
      throw e;
    }
  }

  responseCheck = {
    errorType: "",
    errorMessage: "",
    isValid: false,
  };

  responseMessageHandler(data: string) {
    if (data.includes("not found")) {
      this.responseCheck = {
        ...this.responseCheck,
        errorType: "username",
        errorMessage: "User not found!",
      };
    } else if (data.includes("Password")) {
      this.responseCheck = {
        ...this.responseCheck,
        errorType: "password",
        errorMessage: "Password incorrect!",
      };
    } else if (data.includes("exists")) {
      this.responseCheck = {
        ...this.responseCheck,
        errorType: "userSignUp",
        errorMessage: "User already exists!",
      };
    }
  }

  async setParticipant(currentWorkspaceId: string, participant: string, act: string) {
    const newParticipant = {
      idWorkspace: currentWorkspaceId,
      nameParticipant: participant,
      act: act
    };
    const response = await fetch("http://localhost:3008/api/userdata", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newParticipant),
    });
    if (response.ok) {
      return response.json();
    } else {
      return `Ошибка:  ${response.status}`;
    }
  }

  addParticipant(participant: string, currentWorkspaceId: string) {
    const wIndex = this.getIndexWorkspace(currentWorkspaceId);
    this.currentUser.USER_WORKSPACES[wIndex].WORKSPACE_PS.push(participant);
  }

  delParticipant(participant: string, currentWorkspaceId: string) {
    const wIndex = this.getIndexWorkspace(currentWorkspaceId);
    const pIndex = this.currentUser.USER_WORKSPACES[wIndex].WORKSPACE_PS
      .findIndex((part) => part === participant);
    if (pIndex !== -1) {
      this.currentUser.USER_WORKSPACES[wIndex].WORKSPACE_PS.splice(pIndex, 1);
    }
  }

  async delUser(id: string) {
    return fetch(`http://localhost:3008/api/userdata`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ id }),
    });
  }

  returnResponseCheck() {
    return this.responseCheck;
  }

  async setCurrentUser(id: string) {
    try {
      const loggedUserRequest = await this.getUserData(id);
      if (!loggedUserRequest.ok) {
        throw new Error("User not found");
      }
      const parsedUserData = await loggedUserRequest.json();
      const newUser = {
        USER_ID: id,
        USER_NAME: parsedUserData.username,
        USER_PASSWORD: parsedUserData.password,
        USER_WORKSPACES: parsedUserData.workspaces,
      };
      this.currentUser = newUser;
    } catch (e) {
      console.log(e);
    }
  }
}
