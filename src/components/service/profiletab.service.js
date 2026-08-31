import api from './api.service';

export const getProfileService = async () => {
    try {
        const response = await api.get('/api/profile');
        console.log("profileeee",response.data)
        return response.data;
    } catch (error) {
        console.error('Get Profile Error:', error);
        throw error.response?.data || error;
    }
};

export const updateProfileService = async (profile) => {
    try {
        const response = await api.put('/api/profile', profile);
        return response.data;
    } catch (error) {
        console.error('Update Profile Error:', error.response?.data || error);
        throw error.response?.data || error;
    }
};