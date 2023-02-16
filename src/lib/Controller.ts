import { nanoid } from "nanoid";
import USER_DEFAULT_DATA from "./config";
import { TUser, TUserWorkspace, TListModalProps, TCard, TListCards } from "../AppTypes";

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

  getIndexList(workspaceId: string, boardId: string, listId: string): number {
    return this.currentUser.USER_WORKSPACES[
      this.getIndexWorkspace(workspaceId)
    ].WORKSPACE_BOARDS[this.getIndexBoard(workspaceId, boardId)].BOARD_LISTS.findIndex((elem) => elem.LIST_ID === listId);
  }

  getIndexTask(workspaceId: string, boardId: string, listId: string, taskId: string): number {
    const taskArr: any = this.currentUser.USER_WORKSPACES[ // :TListCards doesnt work
      this.getIndexWorkspace(workspaceId)
    ].WORKSPACE_BOARDS[this.getIndexBoard(workspaceId, boardId)].BOARD_LISTS[this.getIndexList(workspaceId, boardId, listId)].LIST_CARDS;

    return taskArr.findIndex((elem: TCard) => elem.CARD_ID === taskId);
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
        console.log("LOG IN SUCCESSFUL", parsedResponse);
        this.responseCheck.isValid = true;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userID", `${parsedResponse}`); // When session is reloaded laod data of this user from the server
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

  async addParticipant(currentWorkspaceId: string, participant: string) {
    console.log("currentWorkspaceId", currentWorkspaceId);
    console.log("participant", participant);
    const newParticipant = {
      idWorkspace: currentWorkspaceId,
      nameParticipant: participant,
    };
    return fetch("http://localhost:3008/api/userdata", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newParticipant),
    });
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

  saveTaskModalChanges( args: TListModalProps) {
    const currentWS = args.currentWorkspace;
    const currB = args.currentBoard;
    const currL = args.currentList;
    const currT = args.currentTask;
    const newTitle = args.titleChange;
    const newDescription = args.bodyChange;

    this.currentUser
      .USER_WORKSPACES[this.getIndexWorkspace(currentWS)]
      .WORKSPACE_BOARDS[this.getIndexBoard(currentWS, currB)]
      .BOARD_LISTS[this.getIndexList(currentWS, currB, currL)]
      .LIST_CARDS[this.getIndexTask(currentWS, currB, currL, currT)] = <any>{ // doesnt accept types from AppTypes
        CARD_ID: currT,
        CARD_DATA: newTitle/* ,
        CARD_DESCRITPTION: newDescription */
      }
  }

  addWorkSpace( args: any ) {
    const nameWorkSpace = args.newWorkSpace;

    this.currentUser.USER_WORKSPACES.push({
      WORKSPACE_ID: nanoid(),
      WORKSPACE_TITLE: nameWorkSpace,
      WORKSPACE_PS: [this.currentUser.USER_NAME],
      WORKSPACE_BOARDS: [],
    });
    console.log(this.currentUser);
  }
}