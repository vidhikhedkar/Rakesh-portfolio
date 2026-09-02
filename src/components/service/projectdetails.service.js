


import api from "./api.service";





export const getProjectsService = async () => {
    try {
        const response = await api.get("/api/projects");

        console.log("ALL PROJECTS:", response.data);

        return response.data;
    } catch (error) {
        console.error(
            "Get Projects Error:",
            error.response?.data || error
        );

        throw error.response?.data || error;
    }
};


export const getProjectDetailsService = async () => {
    try {
        const response = await api.get("/api/project-details");

        return response.data;
    } catch (error) {
        console.error(
            "Error fetching project details:",
            error
        );

        throw error;
    }
};


// ============================================================
// GET DETAILS FOR ONE PROJECT
// GET /api/project-details/:projectId
// ============================================================

export const getProjectDetailService = async (projectId) => {
    try {
        if (!projectId) {
            throw new Error("Project ID is required.");
        }

        const response = await api.get(
            `/api/project-details/${projectId}`
        );

        return response.data;
    } catch (error) {
        console.error(
            "Error fetching project detail:",
            error
        );

        throw error;
    }
};


// ============================================================
// CREATE PROJECT DETAILS
// POST /api/project-details
// ============================================================

export const createProjectDetailService = async (data) => {
    try {
        const response = await api.post(
            "/api/project-details",
            data
        );

        return response.data;
    } catch (error) {
        console.error(
            "Error creating project details:",
            error
        );

        throw error;
    }
};


// ============================================================
// UPDATE PROJECT DETAILS
// PUT /api/project-details
// ============================================================

export const updateProjectDetailService = async (data) => {
    try {
        const response = await api.put(
            "/api/project-details",
            data
        );

        return response.data;
    } catch (error) {
        console.error(
            "Error updating project details:",
            error
        );

        throw error;
    }
};


// ============================================================
// DELETE PROJECT DETAILS
// DELETE /api/project-details/:projectId
// ============================================================

export const deleteProjectDetailService = async (projectId) => {
    try {
        if (!projectId) {
            throw new Error("Project ID is required.");
        }

        const response = await api.delete(
            `/api/project-details/${projectId}`
        );

        return response.data;
    } catch (error) {
        console.error(
            "Error deleting project details:",
            error
        );

        throw error;
    }
};