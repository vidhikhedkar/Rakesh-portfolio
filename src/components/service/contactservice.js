import api from "./api.service";

export const getContactService = async () => {
    try {
        const response = await api.get("/api/contact"); // Adjust endpoint route matching your backend setup
        return response.data.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch contact details";
    }
};

export const updateContactService = async (contactData) => {
    try {
        const response = await api.put("/api/contact", contactData);
        return response.data.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update contact details";
    }
};