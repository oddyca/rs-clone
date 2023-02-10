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
        const responseMessage = Object.values(parsedResponse)[0] as string;
        this.responseMessageHandler(responseMessage);
      } else {
        console.log('LOG IN SUCCESSFUL', parsedResponse);
        this.responseCheck.isValid = true;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userID', `${parsedResponse}`); // When session is reloaded laod data of this user from the server
      }
      return parsedResponse;
    } catch(e) {
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
        console.log('Sign Up SUCCESSFUL');
        this.responseCheck.isValid = true;
      }
      return response;
    } catch(e) {
      throw e;
    }
  }

  responseCheck = {
    errorType: '',
    errorMessage: '',
    isValid: false
  }

  responseMessageHandler(data: string) {
    if (data.includes('not found')) {
      this.responseCheck = {
        ...this.responseCheck,
        errorType: 'username',
        errorMessage: 'User not found!'
      }
    } else if (data.includes('Password')) {
      this.responseCheck = {
        ...this.responseCheck,
        errorType: 'password',
        errorMessage: 'Password incorrect!'
      }
    } else if (data.includes('exists')) {
      this.responseCheck = {
        ...this.responseCheck,
        errorType: 'userSignUp',
        errorMessage: 'User already exists!'
      }
    }
  }

  returnResponseCheck() {
    return this.responseCheck;
  }
}

