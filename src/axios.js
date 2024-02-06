import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}api`,
  // headers: {
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "http://localhost:3000",
  // },
});

export const appServerUrl = `${process.env.REACT_APP_API_BASE_URL}`;

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    console.log("axios response:", response);
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("TOKEN");
      window.location.reload();
      // AppRouter.navigate("/");
      return error;
    }
    throw error;
  }
);
export default axiosClient;
