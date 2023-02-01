import { DEF_USER } from "./config";

export class Controller {
  public workspace: any;
  constructor(workspace = JSON.parse(JSON.stringify(DEF_USER))) {
    this.workspace = workspace;
  }

  loadData() {
    return this.workspace;
  }
}
