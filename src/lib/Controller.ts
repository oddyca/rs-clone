import { DEF_USER } from "./config";

export class Controller {
  public workspace: any;
  constructor(workspace = JSON.parse(JSON.stringify(DEF_USER))) {
    this.workspace = workspace;
  }

  createTask(data: string) {
    console.log("data = ", data);
  }




  loadData() {
    return this.workspace;
  }
}
