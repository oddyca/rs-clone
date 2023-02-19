import { nanoid } from "nanoid";
import USER_DEFAULT_DATA from "./config";
import { TUser, TUserWorkspace, TListModalProps, TCard, TBoardLists } from "../AppTypes";

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
    return this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS[
      this.getIndexBoard(workspaceId, boardId)
    ].BOARD_LISTS.findIndex((elem) => elem.LIST_ID === listId);
  }

  getIndexTask(workspaceId: string, boardId: string, listId: string, taskId: string): number {
    const taskArr: any =
      this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS[ // :TListCards doesnt work
        this.getIndexBoard(workspaceId, boardId)
      ].BOARD_LISTS[this.getIndexList(workspaceId, boardId, listId)].LIST_CARDS;

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
      settings: USER_DEFAULT_DATA.USER_SETTINGS,
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
      }
    } else if (data.includes("error")) {
      this.responseCheck = {
        isValid: false,
        errorType: "server",
        errorMessage: "Server error",
      }
    }
  }

  async setParticipant(currentWorkspaceId: string, participant: string, act: string) {
    const newParticipant = {
      idWorkspace: currentWorkspaceId,
      nameParticipant: participant,
      act: act,
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
    const pIndex = this.currentUser.USER_WORKSPACES[wIndex].WORKSPACE_PS.findIndex(
      (part) => part === participant,
    );
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
      let parsedUserData = await loggedUserRequest.json();
      if (!loggedUserRequest.ok) {
        const responseMessage = Object.values(parsedUserData)[0] as string;
        this.responseMessageHandler(responseMessage);
      }
      this.currentUser = {
        USER_ID: id,
        USER_NAME: parsedUserData.username,
        USER_PASSWORD: parsedUserData.password,
        USER_WORKSPACES: parsedUserData.workspaces,
        USER_SETTINGS: parsedUserData.settings,
      };
    } catch (e) {
      console.log(e);
    }
  }

  saveModalChanges(args: TListModalProps, whichModal: string, color?: string, list?: TBoardLists) {
    const currentWS = args.currentWorkspace;
    const currB = args.currentBoard;
    const currL = args.currentList;
    const currT = args.currentTask;
    const newTitle = args.titleChange;
    const newDescription = args.bodyChange;

    if (whichModal === "task"){
      this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(currentWS)].WORKSPACE_BOARDS[
        this.getIndexBoard(currentWS, currB)
      ].BOARD_LISTS[this.getIndexList(currentWS, currB, currL)].LIST_CARDS[
        this.getIndexTask(currentWS, currB, currL, currT)
      ] = <any>{
        // doesnt accept types from AppTypes
        CARD_ID: currT,
        CARD_DATA: newTitle,
        CARD_DESCRIPTION: newDescription,
      };
    } else {
      this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(currentWS)].WORKSPACE_BOARDS[
        this.getIndexBoard(currentWS, currB)
      ].BOARD_LISTS[this.getIndexList(currentWS, currB, currL)] = <TBoardLists>{
        LIST_ID: currL,
        LIST_TITLE: newTitle,
        LIST_ORDER: list?.LIST_ORDER,
        LIST_CARDS: list?.LIST_CARDS,
        LIST_COLOR: color,
      };
    }
  }

  addWorkSpace(new_work_space: any) {
    const nameWorkSpace = new_work_space;

    this.currentUser.USER_WORKSPACES.push({
      WORKSPACE_ID: nanoid(),
      WORKSPACE_TITLE: nameWorkSpace,
      WORKSPACE_PS: [this.currentUser.USER_NAME],
      WORKSPACE_BOARDS: [],
    });
    console.log(this.currentUser);
  }

  addBoard(new_board: any, workspace_id: any) {
    const nameBoard = new_board;
    const workSpaceId = workspace_id;

    this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workSpaceId)].WORKSPACE_BOARDS.push({
      BOARD_ID: nanoid(),
      BOARD_TITLE: nameBoard,
      BOARD_LISTS: [],
    });
  }

  addListOnBoard(new_list: any, workspace_id: any, current_board: any) {
    const nameList = new_list;
    const workSpaceId = workspace_id;
    const boardId = current_board;
    const boardArr =
      this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workSpaceId)].WORKSPACE_BOARDS[
        this.getIndexBoard(workSpaceId, boardId)
      ].BOARD_LISTS;
    /*     let lastOrder = 0;
    if(boardArr) {
      lastOrder = boardArr[boardArr.length-1].LIST_ORDER;
    } */

    this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workSpaceId)].WORKSPACE_BOARDS[
      this.getIndexBoard(workSpaceId, boardId)
    ].BOARD_LISTS.push({
      LIST_ID: nanoid(),
      /* LIST_ORDER: boardArr.length > 1 ? lastOrder + 1 : 1, */
      LIST_ORDER: boardArr.length + 1,
      LIST_TITLE: nameList,
      LIST_CARDS: [],
    });
  }

  deleteList(userData: any) {
    const workspaceId = userData.currentWorkspace;
    const boardId = userData.BOARD_ID;
    const listId = userData.CURRENTLIST;

    this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS[
      this.getIndexBoard(workspaceId, boardId)
    ].BOARD_LISTS.splice(this.getIndexList(workspaceId, boardId, listId), 1);
  }

  deleteWorkSpace(userData: any) {
    const workspaceId = userData.WORKSPACE_ID;

    this.currentUser.USER_WORKSPACES.splice(this.getIndexWorkspace(workspaceId), 1);
  }
  pushNewTask(workspaceID: string, boardID: string, incomingList: TBoardLists, newTaskTitle: string) {
    const currentListID = incomingList.LIST_ID;
    const lastTaskID = incomingList.LIST_CARDS.length + 1;
    const newTask: /* TCard */any = {
      CARD_ID: `${lastTaskID}`,
      CARD_DATA: newTaskTitle ? newTaskTitle : "New Task"
    };

    this.currentUser
      .USER_WORKSPACES[this.getIndexWorkspace(workspaceID)]
      .WORKSPACE_BOARDS[this.getIndexBoard(workspaceID, boardID)]
      .BOARD_LISTS[this.getIndexList(workspaceID, boardID, currentListID)]
      .LIST_CARDS.push(newTask);
  }
  deleteTask(workspaceID: string, curreboardIDntBoard: string, listID: string, taskID: string) {
    this.currentUser
      .USER_WORKSPACES[this.getIndexWorkspace(workspaceID)]
      .WORKSPACE_BOARDS[this.getIndexBoard(workspaceID, curreboardIDntBoard)]
      .BOARD_LISTS[this.getIndexList(workspaceID, curreboardIDntBoard, listID)]
      .LIST_CARDS.splice(this.getIndexTask(workspaceID, curreboardIDntBoard, listID, taskID), 1);
  }
}