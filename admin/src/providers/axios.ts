import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json, text/plain, */*",
    "Apollo-Require-Preflight": "true",
  },
});
// use interceptors here...
