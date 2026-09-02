import api from "./api.service";

// ============================================================
// GET ALL PROJECTS
// GET /api/projects
// ============================================================

export const getProjectsService = async () => {
    try {
        const response = await api.get("/api/projects");

        console.log("GET ALL PROJECTS:", response.data);

        return response.data;
    } catch (error) {
        console.error(
            "Get Projects Error:",
            error.response?.data || error.message
        );

        throw error.response?.data || error;
    }
};


// ============================================================
// UPDATE PROJECT LIST
// PUT /api/projects
// ============================================================

export const updateProjectsService = async (projects) => {
    try {
        const response = await api.put("/api/projects", {
            projects,
        });

        return response.data;
    } catch (error) {
        console.error(
            "Update Projects Error:",
            error.response?.data || error.message
        );

        throw error.response?.data || error;
    }
};


// ============================================================
// UPLOAD IMAGE TO CLOUDINARY
// POST /api/projects/upload
// ============================================================

export const uploadImageService = async (file) => {
    try {
        if (!file) {
            throw new Error("No image selected.");
        }

        const formData = new FormData();

        formData.append("image", file);

        const response = await api.post(
            "/api/projects/upload",
            formData
        );

        console.log(
            "CLOUDINARY UPLOAD RESPONSE:",
            response.data
        );

        return response.data;
    } catch (error) {
        console.error(
            "Cloudinary Upload Error:",
            error.response?.data || error.message
        );

        throw error.response?.data || error;
    }
};


// ============================================================
// GET SINGLE PROJECT DETAILS
// GET /api/projects/:id
// ============================================================

export const getProjectDetailService = async (projectId) => {
    try {
        const response = await api.get(
            `/api/projects/${projectId}`
        );

        console.log(
            "GET PROJECT DETAIL:",
            response.data
        );

        return response.data;
    } catch (error) {
        console.error(
            "Get Project Detail Error:",
            error.response?.data || error.message
        );

        throw error.response?.data || error;
    }
};


// ============================================================
// UPDATE SINGLE PROJECT DETAILS
// PUT /api/projects/:id
// ============================================================

export const updateProjectDetailService = async (
    projectId,
    projectData
) => {
    try {
        const response = await api.put(
            `/api/projects/${projectId}`,
            projectData
        );

        console.log(
            "UPDATE PROJECT DETAIL:",
            response.data
        );

        return response.data;
    } catch (error) {
        console.error(
            "Update Project Detail Error:",
            error.response?.data || error.message
        );

        throw error.response?.data || error;
    }
};


// ============================================================
// DELETE SINGLE PROJECT
// DELETE /api/projects/:id
// ============================================================

export const deleteProjectDetailService = async (
    projectId
) => {
    try {
        const response = await api.delete(
            `/api/projects/${projectId}`
        );

        return response.data;
    } catch (error) {
        console.error(
            "Delete Project Error:",
            error.response?.data || error.message
        );

        throw error.response?.data || error;
    }
};