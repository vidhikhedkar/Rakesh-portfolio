import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiX } from 'react-icons/fi';

const ProjectTab = () => {
    const [deleteId, setDeleteId] = useState(null);

    const [projects, setProjects] = useState([
        {
            id: 1,
            title: "Beauty Bay Academy",
            category: "EDUCATION • WEB DESIGN",
            image: "BeautyBayAcademy",
        },
        {
            id: 2,
            title: "Online DB Extractor",
            category: "SAAS • DASHBOARD",
            image: "OnlineDBExtractor",
        },
        {
            id: 3,
            title: "Siddha Thirthham",
            category: "WEB DESIGN • BOOKING PLATFORM",
            image: "SiddhaThirthham",
        },
        {
            id: 4,
            title: "KBK Business Solutions",
            category: "CORPORATE • WEB DESIGN",
            image: "KBKBusinessSolutions",
        },
        {
            id: 5,
            title: "WCC",
            category: "SPORTS • DIGITAL EXPERIENCE",
            image: "WCC",
        },
        {
            id: 6,
            title: "CRM Dashboard",
            category: "DASHBOARD • BUSINESS PRODUCT",
            image: "CRMDashboard",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', category: '', image: '' });

    const handleOpenAdd = () => {
        setEditingId(null);
        setFormData({ title: '', category: '', image: '' });
        setIsModalOpen(true);
    };

    const handleOpenEdit = (project) => {
        setEditingId(project.id);
        setFormData({ title: project.title, category: project.category, image: project.image });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setProjects(projects.filter(p => p.id !== id));
        setDeleteId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setProjects(projects.map(p => p.id === editingId ? { ...p, ...formData } : p));
        } else {
            const newProject = {
                id: Date.now(),
                ...formData
            };
            setProjects([...projects, newProject]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="w-full ">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3 bg-white p-3 rounded-2xl">
                <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0F0F0F]">Manage Projects</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Add, edit, or remove portfolio items displayed on the main projects grid.</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#5B78FF] text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-[#5B78FF]/20 hover:brightness-105 transition-all cursor-pointer shrink-0"
                >
                    <FiPlus /> Add New Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md">
                        <div>
                            <div className="h-40 rounded-xl bg-gray-50 border border-gray-100 mb-4 flex items-center justify-center text-gray-400 font-medium text-xs overflow-hidden relative group">
                                <div className="absolute inset-0 bg-[#5B78FF]/5 flex items-center justify-center text-[#5B78FF] font-semibold text-xs">
                                    {project.image || "Image Reference"}
                                </div>
                            </div>
                            <span className="text-[10px] tracking-wider uppercase bg-blue-50 text-[#5B78FF] font-semibold px-2.5 py-1 rounded-full">
                                {project.category}
                            </span>
                            <h4 className="text-base font-bold text-[#0F0F0F] mt-2">{project.title}</h4>
                        </div>
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                            <span className="text-xs text-gray-400">ID: {project.id}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleOpenEdit(project)}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                                >
                                    <FiEdit2 size={12} /> Edit
                                </button>


                                <div className="relative">
                                    <button
                                        onClick={() => setDeleteId(project.id)}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                                    >
                                        <FiTrash2 size={12} /> Delete
                                    </button>

                                    {deleteId === project.id && (
                                        <>
                                            {/* Backdrop for mobile devices to handle outside clicks cleanly */}
                                            <div
                                                className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] sm:hidden"
                                                onClick={() => setDeleteId(null)}
                                            />

                                            {/* Responsive popup: centered modal on mobile, absolute popover on tablet/desktop */}
                                            <div className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 bottom-4 sm:bottom-full sm:mb-2 z-50 w-auto sm:w-64 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 space-y-3 animate-in fade-in zoom-in-95 duration-150 mx-auto sm:mx-0">
                                                <div className="space-y-0.5">
                                                    <h4 className="text-xs font-bold text-[#0F0F0F]">Delete Project?</h4>
                                                    <p className="text-[11px] text-gray-500">This action cannot be undone.</p>
                                                </div>
                                                <div className="flex gap-2 pt-1">
                                                    <button
                                                        onClick={() => setDeleteId(null)}
                                                        className="flex-1 px-3 py-2 sm:py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(deleteId)}
                                                        className="flex-1 px-3 py-2 sm:py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Add / Edit Project */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-gray-100 relative animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-base font-bold text-[#0F0F0F]">
                                {editingId ? "Edit Project Details" : "Add New Project"}
                            </h4>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg cursor-pointer"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Project Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. HealthTech Mobile App"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#5B78FF]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Category String</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="e.g. MOBILE APP • UI/UX DESIGN"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#5B78FF]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase text-gray-400 font-semibold mb-2 tracking-wider">Project Image</label>
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                                    <div className="flex items-center gap-3.5">
                                        <div className="relative h-14 w-14 rounded-xl bg-white overflow-hidden shrink-0 border border-gray-200 shadow-xs">
                                            {formData.image ? (
                                                <img
                                                    src={formData.image}
                                                    alt="Project Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-medium bg-gray-100">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-[#0F0F0F]">Project Asset</h5>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {formData.image ? "Image uploaded successfully" : "Upload a PNG or JPG file"}
                                            </p>
                                        </div>
                                    </div>

                                    <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5B78FF] hover:bg-[#4a65e0] text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer transition-all shrink-0">
                                        <span>Browse File</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const imageUrl = URL.createObjectURL(file);
                                                    setFormData({ ...formData, image: imageUrl });
                                                }
                                            }}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 text-xs font-medium text-white bg-[#5B78FF] hover:bg-[#4a66e5] rounded-xl shadow-md shadow-[#5B78FF]/20 cursor-pointer"
                                >
                                    {editingId ? "Save Changes" : "Create Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectTab;