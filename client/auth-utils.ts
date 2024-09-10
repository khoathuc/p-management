import axios from "axios";

<<<<<<< HEAD
// const API_BASE_URL = "http://localhost:3001";
=======
const API_BASE_URL = "http://localhost:3001"; // Adjust based on your API URL
>>>>>>> 9ac3383ab1c8fc49fb6a99b949833bf8c88a22fb

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    // Example: Check if the user is authenticated by making a request to an endpoint
<<<<<<< HEAD
    const response = await axios.get(
      `${process.env.API_BASE_URL}/auth/status`,
      {
        // Include authentication token if needed
        // headers: { Authorization: `Bearer ${token}` },
      }
    );
=======
    const response = await axios.get(`${API_BASE_URL}/auth/status`, {
      // Include authentication token if needed
      // headers: { Authorization: `Bearer ${token}` },
    });
>>>>>>> 9ac3383ab1c8fc49fb6a99b949833bf8c88a22fb

    return response.status === 200; // Assuming 200 means authenticated
  } catch (error) {
    return false; // If there's an error, consider the user as not authenticated
  }
};
