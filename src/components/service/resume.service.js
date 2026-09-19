import api from "./api.service";

// Upload Resume
export const uploadResumeService = async (file) => {
    const formData = new FormData();

    formData.append("resume", file);

    const response = await api.post(
        "/api/resume/upload",
        formData
    );

    return response.data;
};

// Download Resume
export const downloadResumeService = () => {
    return `${import.meta.env.VITE_BACKEND_URL}/resume/download`;
};

// View Resume
export const viewResumeService = () => {
    return `${import.meta.env.VITE_BACKEND_URL}/resume/view`;
};