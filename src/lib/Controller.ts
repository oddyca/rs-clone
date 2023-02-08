import USER_DEFAULT_DATA from "./config";

export default class Controller {
  public currentUser: any;

  constructor(defaultUser = JSON.parse(JSON.stringify(USER_DEFAULT_DATA))) {
    this.currentUser = defaultUser;
  }

  loadData() {
    return this.currentUser;
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

  async getUserData(id: string) {
    return await fetch(`http://localhost:3008/api/userdata?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
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
        console.log('LOG IN _NOT_ SUCCESSFUL')
      } else {
        console.log('LOG IN SUCCESSFUL', parsedResponse);
        localStorage.setItem('isLoggedIn', 'true');
        this.currentUser = await this.getUserData(parsedResponse);
      }
      return parsedResponse;
    } catch(e) {
      throw e;
    }
  }

  async signUpVerification(username: string, password: string) {
    try {
      const response = await this.userRegistration(username, password);
      if (!response.ok) {
        console.log('SIGN UP _NOT_ SUCCESSFUL')
      } else {
        console.log('Sign Up SUCCESSFUL', response.json());
        // this.currentUser = await this.getUserData(await response.json());
      }
      return response.json();
    } catch(e) {
      throw e;
    }
  }
}

