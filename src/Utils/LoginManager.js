// Create a separate LoginManager class
class LoginManager {
    constructor() {
      this.state = {
        username: '',
        password: '',
        idOrdonnateur: null,
      };
    }
  
    setUsername(username) {
      this.state.username = username;
    }
  
    setPassword(password) {
      this.state.password = password;
    }
  
    setIdOrdonnateur(idOrdonnateur) {
      this.state.idOrdonnateur = idOrdonnateur;
    }
  
    getLoginState() {
      return this.state;
    }
  }
  
  // Export an instance of the LoginManager class
  export const loginManager = new LoginManager();
  