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
  updateSneaker(id, body) {
    return this.apiClient.put(`/sneakers/${id}`, body)
  }
  deleteSneaker(id) {
    return this.apiClient.delete(`/sneakers/${id}`)
  }
  oneSneaker(id) {
    return this.apiClient.get(`/sneakers/${id}`)
  }
  //reviews
  reviews() {
    return this.apiClient.get("/reviews");
  }
  reviewsFilterByUser(id){
    return this.apiClient.get(`/reviews/user/${id}`)
  }
  addReview(body) {
    return this.apiClient.post("/reviews/", body)
  }
  updateReview(id, body) {
    return this.apiClient.put(`/reviews/${id}`, body)
  }
  deleteReview(id) {
    return this.apiClient.delete(`/reviews/${id}`)
  }
  reviewFilterSneaker(id) {
    return this.apiClient.get(`/reviews/sneaker/${id}`)
  }
  reviewFilterUser(id) {
    return this.apiClient.get(`/reviews/user/${id}`)
  }
  reviewFilterBrand(id) {
    return this.apiClient.get(`/reviews/brand/${id}`)
  }
  oneReview(id) {
    return this.apiClient.get(`/reviews/${id}`)
  }
 
}

const apiClient = new ApiClient();
export default apiClient;
