import api from "./api.service";

export const getProjectsService = async () => {
    try {
        const response = await api.get("/api/projects");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateProjectsService = async (projects) => {
    try {
        const response = await api.put("/api/projects", { projects });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const uploadImageService = async (file) => {
    try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await api.post("/api/projects/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};