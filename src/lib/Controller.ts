import USER_DEFAULT_DATA from "./config";

export default class Controller {
  public currentUser: any;

  constructor(defaultUser = JSON.parse(JSON.stringify(USER_DEFAULT_DATA))) {
    this.currentUser = defaultUser;
  }

  getIndexWorkspace(workspaceId: string) : number {
    return this.currentUser.USER_WORKSPACES.findIndex((elem: any) => elem.WORKSPACE_ID === workspaceId)
  }

  getIndexBoard(workspaceId: string, boardId: string) : number {
    return this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS.findIndex((elem: any) => elem.BOARD_ID === boardId);
  }

  getBoards(workspaceId: string, boardId: string) : object[] {
    return this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS[this.getIndexBoard(workspaceId, boardId)].BOARD_LISTS;
  }

  loadData() {
    return this.currentUser;
  }

  deleteBoard(userData: any) {
    const workspaceId = userData.WORKSPACE_ID;
    const boardId = userData.BOARD_ID;

    this.getIndexWorkspace(workspaceId);
    this.getIndexBoard(workspaceId, boardId);
    this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS.splice(this.getIndexBoard(workspaceId, boardId), 1);
  }

  sortList(userData: any) {
    const workspaceId = userData.WORKSPACE_ID;
    const boardId = userData.BOARD_ID;
    const dragList = userData.dragList;
    const dragTask = userData.dragTask;
    const dropList = userData.dropList;

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
    this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS[this.getIndexBoard(workspaceId, boardId)].BOARD_LISTS = structuredClone(newListArr);

    dropList.LIST_CARDS.push(dragTask);
    const currentIndexList = dragList.LIST_CARDS.indexOf(dragTask);
    dragList.LIST_CARDS.splice(currentIndexList, 1);
    const newListEmpty = currentListArr.map((elem: any) => {
      if(elem.LIST_ID === dropList.LIST_ID) {
        return dropList;
      }
      if(elem.LIST_ID === dragList.LIST_ID) {
        return dragList;
      }
      return elem;
    });
    this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS[this.getIndexBoard(workspaceId, boardId)].BOARD_LISTS = structuredClone(newListEmpty);
  }

  sortCard(userData: any) {
    const workspaceId = userData.WORKSPACE_ID;
    const boardId = userData.BOARD_ID;
    const dragList = userData.dragList;
    const dragTask = userData.dragTask;
    const dropList = userData.dropList;
    const dropCard = userData.dropCard;

    const currentIndexList = dragList.LIST_CARDS.indexOf(dragTask);
    dragList.LIST_CARDS.splice(currentIndexList, 1);
    const dropIndexList = dropList.LIST_CARDS.indexOf(dropCard);
    dropList.LIST_CARDS.splice(dropIndexList + 1, 0, dragTask);
    const currentListArr = this.getBoards(workspaceId, boardId)
    /* console.log(this.getBoards(workspaceId, boardId)) */
    const newListArr = currentListArr.map((elem: any) => {
      if(elem.LIST_ID === dropList.LIST_ID) {
        return dropList;
      }
      if(elem.LIST_ID === dragList.LIST_ID) {
        return dragList;
      }
      return elem;
    });
    this.currentUser.USER_WORKSPACES[this.getIndexWorkspace(workspaceId)].WORKSPACE_BOARDS[this.getIndexBoard(workspaceId, boardId)].BOARD_LISTS = structuredClone(newListArr);
  }

  async userRegistration(username: string, password: string) {
    const newUser = {
      username: username,
      password: password,
      workspaces: USER_DEFAULT_DATA.USER_WORKSPACES
    };
    return await fetch("http://localhost:3008/api/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(newUser)
    });
  }

  async userLogin(username: string, password: string) {
      const newUser = {
        username: username,
        password: password,
      };
      return await fetch("http://localhost:3008/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(newUser)
      });
  }

  // async getUserData(id) {
  //
  // }

  // async setUserData(id) {
  //
  // }

  static expandTask() {

  }

}

