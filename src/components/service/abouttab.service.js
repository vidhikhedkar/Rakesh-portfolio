import api from "./api.service";

export const fetchAboutData = async () => {
    try {
        const response = await api.get("/api/about");
        return response.data;
    } catch (error) {
        console.error("Error fetching about data:", error);
        throw error;
    }
};

export const updateAboutData = async (data) => {
    try {
        const response = await api.put("/api/about", data);
        return response.data;
    } catch (error) {
        console.error("Error updating about data:", error);
        throw error;
    }
};