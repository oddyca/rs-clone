import { USERS_DATA } from "./config";

export default class Controller {
  public workspace: any;

  constructor(workspace = JSON.parse(JSON.stringify(USERS_DATA))) {
    this.workspace = workspace;
  }

  loadData() {
    return this.workspace[0];
  }
}
