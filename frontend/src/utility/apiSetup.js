import axios from 'axios';
// export const baseURL = 'http://localhost:8081';
// export const baseURL = 'http://0.0.0.0:8081';
//loptop
// export const baseURL = 'http://192.168.5.92:8081';
export const baseURL = 'http://192.168.5.92:8081';
//VM
// export const baseURLclient = 'http://192.168.4.242:3001';
// export const baseURL = 'http://192.168.4.242:3031';
// // //Laptop
// export const baseURL = 'https://dust-collection-1.onrender.com';

// Create a base Axios instance with default configurations
const apiClient = axios.create({
  baseURL: `${baseURL}/api`, // Replace with your API's base URL
  timeout: 5000, // Set a default timeout for requests
  headers: {
    'Content-Type': 'application/json', // Set default Content-Type for requests
  },
});



export default apiClient;
