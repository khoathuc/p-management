import axios from "axios";

// const API_BASE_URL = "http://localhost:3001";

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    // Example: Check if the user is authenticated by making a request to an endpoint
    const response = await axios.get(
      `${process.env.API_BASE_URL}/auth/status`,
      {
        // Include authentication token if needed
        // headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.status === 200; // Assuming 200 means authenticated
  } catch (error) {
    return false; // If there's an error, consider the user as not authenticated
  }
};
