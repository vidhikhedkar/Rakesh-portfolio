import api from "./api.service";

export const fetchServices = async () => {
    try {
        const response = await api.get('/api/services'); // Added /api
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};

export const updateServices = async (services) => {
    try {
        const response = await api.put('/api/services', { services }); // Added /api
        return response.data;
    } catch (error) {
        console.error('Error updating services:', error);
        throw error;
    }
};

export const deleteService = async (id) => {
    try {
        const response = await api.delete(`/api/services/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting service:', error);
        throw error;
    }
};