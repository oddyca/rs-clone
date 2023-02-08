import USER_DEFAULT_DATA from "./config";

export default class Controller {
  public currentUser: any;

  constructor(defaultUser = JSON.parse(JSON.stringify(USER_DEFAULT_DATA))) {
    this.currentUser = defaultUser;
  }

  loadData() {
    return this.currentUser;
  }

  deleteBoard(userData: any) {
    const workspaceId = userData.WORKSPACE_ID;
    const boardId = userData.BOARD_ID;

    const indexWorkspace = this.currentUser.USER_WORKSPACES.findIndex((elem: string) => elem.WORKSPACE_ID === workspaceId);
    const indexBoard = this.currentUser.USER_WORKSPACES[indexWorkspace].WORKSPACE_BOARDS.findIndex((elem: string) => elem.BOARD_ID === boardId);

    this.currentUser.USER_WORKSPACES[indexWorkspace].WORKSPACE_BOARDS.splice(indexBoard, 1);
  }

/*   sortList(userData: any) {
    const workspaceId = userData.WORKSPACE_ID;
    const boardId = userData.BOARD_ID;
    const listOrder = userData.LIST_ORDER;

    const indexWorkspace = this.currentUser.USER_WORKSPACES.findIndex((elem: string) => elem.WORKSPACE_ID === workspaceId);
    const indexBoard = this.currentUser.USER_WORKSPACES[indexWorkspace].WORKSPACE_BOARDS.findIndex((elem: string) => elem.BOARD_ID === boardId);

    const currentListArray = this.currentUser.USER_WORKSPACES[indexWorkspace].WORKSPACE_BOARDS[indexBoard].BOARD_LISTS;

    console.log(currentListArray)
  } */

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

