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
    const dropList = userData.dropList;
    const indexWorkspace = this.getIndexWorkspace(workspaceId);
    const indexBoard = this.getIndexBoard(workspaceId, boardId);
    const currentListArr = this.currentUser.USER_WORKSPACES[indexWorkspace].WORKSPACE_BOARDS[indexBoard].BOARD_LISTS;
    const newListArr = currentListArr.map((el: any) => {
      if (el.LIST_ID === dropList.LIST_ID) {
        return { ...el, LIST_ORDER: dragList.LIST_ORDER };
      }
      if (el.LIST_ID === dragList.LIST_ID) {
        return { ...el, LIST_ORDER: dropList.LIST_ORDER };
      }
      return el;
    });
    this.currentUser.USER_WORKSPACES[indexWorkspace].WORKSPACE_BOARDS[indexBoard].BOARD_LISTS = structuredClone(newListArr);
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

