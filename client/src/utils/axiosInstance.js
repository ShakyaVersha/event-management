import axios from "axios"


// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "/",
  timeout: 10000,
 
});

// Request interceptor to add authorization headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    if (token) {
      config.headers.token = token;
      config.headers.email = email;
      config.headers.username = username;
      config.headers.id = id;
      config.headers.role = role;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      
      setTimeout(() => {
        localStorage.clear();
        window.location.href = `/`;

      }, 1500)


    } 
    return Promise.reject(error);
    

  }
);

export default axiosInstance;