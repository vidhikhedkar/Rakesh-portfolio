import api from "./api.service";

export const loginService = async (credentials) => {
    try {
        const response = await api.post("/api/auth/login", credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "An unexpected error occurred during login." };
    }
};

export const registerService = async (userData) => {
    try {
        const response = await api.post("/api/auth/register", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "An unexpected error occurred during registration." };
    }
};

export const logoutService = async () => {
    try {
        const response = await api.post("/api/auth/logout");
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "An unexpected error occurred during logout." };
    }
};