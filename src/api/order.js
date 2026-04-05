import api from "./api";

export default {

  checkout(data) {
    return api.post("/checkout", data);
  }

};