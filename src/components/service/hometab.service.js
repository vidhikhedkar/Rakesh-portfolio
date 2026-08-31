import api from "./api.service";

export const getHomeContentService = async () => {
    try {
        const response = await api.get("/api/home");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateHomeContentService = async (formData) => {
    try {
        const response = await api.put("/api/home", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};