import { BASE_BACKEND_URL } from "@/utils/urls";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_BACKEND_URL,
  // Add other configuration options if needed
});

api.interceptors.request.use(
  (config) => {
    console.log("axio req use")
    // const accessToken = localStorage.getItem("accessToken");
    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { response } = error;
//     if (response.status === 401 && response.data.message === "Unauthorized") {
//       // Handle token expiration or invalid token
//       return refreshAccessToken()
//         .then((newAccessToken) => {
//           localStorage.setItem("accessToken", newAccessToken);
//           return api(error.config); // Retry the request with the new token
//         })
//         .catch((refreshError) => {
//           // Handle refresh token failure (e.g., logout)
//           console.error("Refresh token failed:", refreshError);
//           // Redirect to login page or handle accordingly
//         });
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
