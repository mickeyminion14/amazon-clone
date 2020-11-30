import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:5001/clone-98394/us-central1/api", //dev
  baseURL: "https://us-central1-clone-98394.cloudfunctions.net/api", //prod
});
