import axios from "axios";

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      withCredentials: true,
    });
  }
  //Auth

  login(body) {
    return this.apiClient.post("/login", body);
  }

  logout() {
    return this.apiClient.get("/logout");
  }

  whoami() {
    return this.apiClient.get("/whoami");
  }

  signup(body) {
    return this.apiClient.post('/signup', body);
  }

  getProtected() {
    return this.apiClient.get("/protected");
  }
  //Brands
  brands() {
    return this.apiClient.get("/brands")
  }
  oneBrand(id) {
    return this.apiClient.get(`/brands/${id}`)
  }
  //Sneakers
  sneakers() {
    return this.apiClient.get("/sneakers");
  }

  addSneaker(body) {
    return this.apiClient.post("/sneakers/", body);
  }

  oneSneaker(id) {
    return this.apiClient.get(`/sneakers/${id}`)
  }
}

const apiClient = new ApiClient();
export default apiClient;
