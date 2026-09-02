import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiSave, FiPlus, FiTrash2, FiUploadCloud, FiX, FiLoader, } from "react-icons/fi";
import { getProjectDetailService, getProjectsService, updateProjectDetailService, uploadImageService } from "../../service/projecttab.service";


const emptyDetails = {
    subtitle: "",
    description: "",
    role: "",
    category: "",
    year: "",

    projectName: "",
    platform: "",
    tools: "",
    scope: "",

    heroImage: "",
    brandImage: "",
    editorialImage: "",

    productTitle: "THE PRODUCT",
    productDescription: "",
    productDescriptionTwo: "",

    ecosystem: [],

    challenge: {
        title: "THE CHALLENGE",
        paragraphs: [],
    },

    approach: {
        title: "THE APPROACH",
        paragraphs: [],
    },

    sectionImages: [],

    strategicOverview: {
        label: "Strategic Overview",
        title: "Project Deep Dive",

        goal: {
            title: "The Goal",
            description: "",
        },

        process: {
            title: "The Process",
            description: "",
        },

        impact: {
            title: "The Impact",
            description: "",
        },
    },

    client: "",
    metadataCategory: "",
    metadataTools: "",

    experienceTitle: "",
    achievements: [],

    section7Image: "",

    challengeSection: {
        label: "The Challenge",
        title: "",
        cards: [],
    },

    section9Image: "",

    outcome: {
        title: "THE OUTCOME",
        description: "",
        cards: [],
    },

    footerTitle: "",
};



const normalizeDetails = (data) => {
    if (!data) {
        return {
            ...emptyDetails,
            ecosystem: [],
            sectionImages: [],
            achievements: [],
        };
    }

    return {
        ...emptyDetails,
        ...data,

        ecosystem: Array.isArray(data.ecosystem)
            ? data.ecosystem
            : [],

        challenge: {
            ...emptyDetails.challenge,
            ...(data.challenge || {}),

            paragraphs: Array.isArray(
                data.challenge?.paragraphs
            )
                ? data.challenge.paragraphs
                : [],
        },

        approach: {
            ...emptyDetails.approach,
            ...(data.approach || {}),

            paragraphs: Array.isArray(
                data.approach?.paragraphs
            )
                ? data.approach.paragraphs
                : [],
        },

        sectionImages: Array.isArray(
            data.sectionImages
        )
            ? data.sectionImages
            : [],

        strategicOverview: {
            ...emptyDetails.strategicOverview,
            ...(data.strategicOverview || {}),

            goal: {
                ...emptyDetails.strategicOverview.goal,
                ...(data.strategicOverview?.goal || {}),
            },

            process: {
                ...emptyDetails.strategicOverview.process,
                ...(data.strategicOverview?.process || {}),
            },

            impact: {
                ...emptyDetails.strategicOverview.impact,
                ...(data.strategicOverview?.impact || {}),
            },
        },

        achievements: Array.isArray(
            data.achievements
        )
            ? data.achievements
            : [],

        challengeSection: {
            ...emptyDetails.challengeSection,
            ...(data.challengeSection || {}),

            cards: Array.isArray(
                data.challengeSection?.cards
            )
                ? data.challengeSection.cards
                : [],
        },

        outcome: {
            ...emptyDetails.outcome,
            ...(data.outcome || {}),

            cards: Array.isArray(
                data.outcome?.cards
            )
                ? data.outcome.cards
                : [],
        },
    };
};


const ProjectDetailsTab = () => {
    const { projectId } = useParams();
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(projectId || "");
    const [details, setDetails] = useState(normalizeDetails(null));
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    const fetchProjects = async () => {
        try {
            const response =
                await getProjectsService();
            // console.log("PROJECTS FROM API:", response);
            const projectList = Array.isArray(
                response
            )
                ? response
                : Array.isArray(response?.data)
                    ? response.data
                    : [];
            setProjects(projectList);
            return projectList;
        } catch (err) {
            console.error(
                "Fetch projects error:",
                err
            );
            throw err;
        }
    };


    const fetchProjectDetail = async (id) => {
        if (!id) {
            setDetails(
                normalizeDetails(null)
            );
            return;
        }
        try {
            setLoading(true);
            setError("");
            setMessage("");
            // console.log("Fetching project details:", id);
            const response =
                await getProjectDetailService(id);
            // console.log("SINGLE PROJECT DETAIL API:", response);
            if (response?.success) {
                const normalized =
                    normalizeDetails(
                        response.data
                    );
                setDetails(normalized);
            } else {
                setError(
                    response?.message ||
                    "Project details not found."
                );
                setDetails(
                    normalizeDetails(null)
                );
            }
        } catch (err) {
            console.error(
                "Fetch project detail error:",
                err
            );
            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Failed to load project details."
            );
            setDetails(
                normalizeDetails(null)
            );
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const initialize = async () => {
            try {
                setLoading(true);
                setError("");
                const projectList =
                    await fetchProjects();
                if (!projectList.length) {
                    setSelectedProjectId("");
                    setDetails(
                        normalizeDetails(null)
                    );
                    setLoading(false);
                    return;
                }
                if (projectId) {
                    const exists =
                        projectList.some(
                            (project) =>
                                project._id ===
                                projectId
                        );
                    if (exists) {
                        setSelectedProjectId(
                            projectId
                        );
                        await fetchProjectDetail(
                            projectId
                        );
                        return;
                    }
                }
                const firstProjectId =
                    projectList[0]?._id;

                if (firstProjectId) {
                    setSelectedProjectId(
                        firstProjectId
                    );
                    await fetchProjectDetail(
                        firstProjectId
                    );
                }
            } catch (err) {
                console.error(
                    "Project initialization error:",
                    err
                );
                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to load projects."
                );
                setLoading(false);
            }
        };
        initialize();
    }, [projectId]);



    const handleProjectSelect = async (e) => {
        const id = e.target.value;
        if (!id) {
            setSelectedProjectId("");
            setDetails(
                normalizeDetails(null)
            );
            setMessage("");
            setError("");
            return;
        }
        setSelectedProjectId(id);
        setMessage("");
        setError("");
        await fetchProjectDetail(id);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleNestedChange = (
        section,
        field,
        value
    ) => {
        setDetails((prev) => ({
            ...prev,
            [section]: {
                ...(prev[section] || {}),
                [field]: value,
            },
        }));
    };


    const handleDeepNestedChange = (
        section,
        subSection,
        field,
        value
    ) => {
        setDetails((prev) => ({
            ...prev,
            [section]: {
                ...(prev[section] || {}),
                [subSection]: {
                    ...(prev[section]?.[
                        subSection
                    ] || {}),
                    [field]: value,
                },
            },
        }));
    };


    const addArrayItem = (
        field,
        value = ""
    ) => {
        setDetails((prev) => ({
            ...prev,

            [field]: [
                ...(prev[field] || []),
                value,
            ],
        }));
    };



    const updateArrayItem = (
        field,
        index,
        value
    ) => {
        setDetails((prev) => {
            const updated = [
                ...(prev[field] || []),
            ];
            updated[index] = value;
            return {
                ...prev,
                [field]: updated,
            };
        });
    };



    const deleteArrayItem = (
        field,
        index
    ) => {
        setDetails((prev) => ({
            ...prev,
            [field]: (
                prev[field] || []
            ).filter(
                (_, i) => i !== index
            ),
        }));
    };


    const addParagraph = (section) => {
        setDetails((prev) => ({
            ...prev,
            [section]: {
                ...(prev[section] || {}),
                paragraphs: [
                    ...(prev[section]
                        ?.paragraphs || []),

                    "",
                ],
            },
        }));
    };


    const updateParagraph = (
        section,
        index,
        value
    ) => {
        setDetails((prev) => {
            const paragraphs = [
                ...(prev[section]
                    ?.paragraphs || []),
            ];
            paragraphs[index] = value;
            return {
                ...prev,

                [section]: {
                    ...(prev[section] || {}),
                    paragraphs,
                },
            };
        });
    };


    const deleteParagraph = (
        section,
        index
    ) => {
        setDetails((prev) => ({
            ...prev,

            [section]: {
                ...(prev[section] || {}),
                paragraphs: (
                    prev[section]
                        ?.paragraphs || []
                ).filter(
                    (_, i) => i !== index
                ),
            },
        }));
    };



    const addEcosystemItem = () => {
        setDetails((prev) => ({
            ...prev,
            ecosystem: [
                ...(prev.ecosystem || []),
                {
                    title: "",
                    description: "",
                    icon: "",
                    position: "",
                },
            ],
        }));
    };


    const updateEcosystemItem = (
        index,
        field,
        value
    ) => {
        setDetails((prev) => {
            const updated = [
                ...(prev.ecosystem || []),
            ];
            updated[index] = {
                ...updated[index],
                [field]: value,
            };
            return {
                ...prev,
                ecosystem: updated,
            };
        });
    };


    const deleteEcosystemItem = (
        index
    ) => {
        setDetails((prev) => ({
            ...prev,
            ecosystem: (
                prev.ecosystem || []
            ).filter(
                (_, i) => i !== index
            ),
        }));
    };



    const addChallengeCard = () => {
        setDetails((prev) => ({
            ...prev,
            challengeSection: {
                ...(prev.challengeSection || {}),
                cards: [
                    ...(prev.challengeSection
                        ?.cards || []),
                    {
                        icon: "",
                        title: "",
                        description: "",
                    },
                ],
            },
        }));
    };


    const updateChallengeCard = (
        index,
        field,
        value
    ) => {
        setDetails((prev) => {
            const cards = [
                ...(prev.challengeSection
                    ?.cards || []),
            ];
            cards[index] = {
                ...cards[index],
                [field]: value,
            };
            return {
                ...prev,
                challengeSection: {
                    ...(prev.challengeSection ||
                        {}),

                    cards,
                },
            };
        });
    };


    const deleteChallengeCard = (
        index
    ) => {
        setDetails((prev) => ({
            ...prev,
            challengeSection: {
                ...(prev.challengeSection ||
                    {}),
                cards: (
                    prev.challengeSection
                        ?.cards || []
                ).filter(
                    (_, i) => i !== index
                ),
            },
        }));
    };


    const addOutcomeCard = () => {
        setDetails((prev) => ({
            ...prev,
            outcome: {
                ...(prev.outcome || {}),
                cards: [
                    ...(prev.outcome
                        ?.cards || []),
                    {
                        title: "",
                        description: "",
                    },
                ],
            },
        }));
    };


    const updateOutcomeCard = (
        index,
        field,
        value
    ) => {
        setDetails((prev) => {
            const cards = [
                ...(prev.outcome?.cards ||
                    []),
            ];
            cards[index] = {
                ...cards[index],
                [field]: value,
            };
            return {
                ...prev,

                outcome: {
                    ...(prev.outcome || {}),
                    cards,
                },
            };
        });
    };


    const deleteOutcomeCard = (
        index
    ) => {
        setDetails((prev) => ({
            ...prev,
            outcome: {
                ...(prev.outcome || {}),
                cards: (
                    prev.outcome?.cards || []
                ).filter(
                    (_, i) => i !== index
                ),
            },
        }));
    };


    const uploadImage = async (
        file,
        field,
        arrayField = null,
        arrayIndex = null
    ) => {
        if (!file) return;
        try {
            setError("");
            setMessage("");
            // console.log("Uploading image to Cloudinary:", file.name);
            const response =
                await uploadImageService(file);
            // console.log("Cloudinary response:", response);
            if (
                !response?.success ||
                !response?.imageUrl
            ) {
                throw new Error(
                    response?.message ||
                    "Cloudinary image URL was not returned."
                );
            }
            const imageUrl =
                response.imageUrl;
            // console.log("Cloudinary image URL:", imageUrl);
            if (!arrayField) {
                setDetails((prev) => ({
                    ...prev,
                    [field]: imageUrl,
                }));
            }
            else {
                updateArrayItem(
                    arrayField,
                    arrayIndex,
                    imageUrl
                );
            }
            setMessage("Image uploaded to Cloudinary successfully.");
            setTimeout(() => {
                setMessage("");
            }, 3000);

        } catch (err) {
            console.error("Cloudinary image upload error:", err);
            setError(
                err?.message ||
                err?.response?.data?.message ||
                "Image upload failed."
            );
        }
    };



    const handleSave = async () => {
        if (!selectedProjectId) {
            setError("Please select a project first.");
            return;
        }
        setSaving(true);
        setError("");
        setMessage("");
        try {
            // console.log("Saving Project ID:", selectedProjectId);
            // console.log("Saving Project Details:", details);
            const response = await updateProjectDetailService(
                selectedProjectId,
                details
            );
            // console.log("SAVE RESPONSE:", response);
            if (response?.success) {
                setMessage(
                    response.message || "Project details saved successfully."
                );

                if (response.data) {
                    const normalized = normalizeDetails(response.data);
                    setDetails(normalized);
                }

                setTimeout(() => {
                    setMessage("");
                }, 3000);
            } else {
                setError(
                    response?.message || "Failed to save project details."
                );
            }
        } catch (err) {
            console.error("Save project details error:", err);
            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Failed to save project details."
            );
        } finally {
            setSaving(false);
        }
    };


    const ImageField = ({ label, field }) => {
        const handleImageUpload = async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            await uploadImage(file, field);
            e.target.value = "";
        };

        const handleRemoveImage = () => {
            setDetails((prev) => ({
                ...prev,
                [field]: "",
            }));
        };

        return (
            <div className="pt-3 border-t border-gray-100">
                <label className="block text-xs uppercase text-gray-400 font-semibold mb-2 tracking-wider">
                    {label}
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-linear-to-r from-gray-50 to-white p-3 rounded-2xl border border-gray-200 shadow-inner">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border-2 border-white shadow-md">
                            {details[field] ? (
                                <img
                                    src={details[field]}
                                    alt={label}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-gray-400 font-medium bg-gray-50">
                                    <span>No</span>
                                    <span>Image</span>
                                </div>
                            )}

                            {details[field] && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors cursor-pointer"
                                    title="Remove Image"
                                >
                                    <FiX size={12} />
                                </button>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-bold text-[#0F0F0F]">
                                {label}
                            </h5>

                            <p className="text-xs text-gray-500 mt-0.5">
                                {details[field]
                                    ? "Active image uploaded."
                                    : "No image uploaded yet."}
                            </p>
                        </div>
                    </div>

                    <div className="w-full sm:w-auto">
                        <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5B78FF] hover:bg-[#4a65e0] text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer transition-all w-full sm:w-auto">
                            <FiUploadCloud size={14} />
                            <span>Choose File</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            </div>
        );
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-[#5870EE]/20 border-t-[#5870EE] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[#191C1D] text-sm font-medium">
                        Loading project details...
                    </p>
                </div>
            </div>
        );
    }


    return (
        <div className="">
            <div className="w-full">
                {/*  PROJECT SELECT*/}
                <div className="w-full bg-white border border-gray-200 rounded-2xl p-4   mb-2 shadow-sm transition-all duration-200">
                    <label
                        htmlFor="project-select"
                        className="block text-xs sm:text-sm font-semibold text-[#191C1D] mb-2 tracking-wide"
                    >
                        Select Project
                    </label>

                    <div className="relative w-full">
                        <select
                            id="project-select"
                            value={selectedProjectId}
                            onChange={handleProjectSelect}
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-xl border border-[#C3C5D9] bg-white text-gray-900 outline-none focus:border-[#5870EE] focus:ring-2 focus:ring-[#5870EE]/20 transition-all cursor-pointer appearance-none pr-10 truncate"
                        >
                            <option value="" disabled className="text-gray-400">
                                Select Project
                            </option>

                            {projects.map((project) => (
                                <option
                                    key={project._id}
                                    value={project._id}
                                    className="py-1 text-gray-800"
                                >
                                    {project.title}
                                </option>
                            ))}
                        </select>

                        {/* Custom Dropdown Arrow */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {message && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                        {error}
                    </div>
                )}


                <div className="space-y-2">
                    <Section title="1. Header">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Subtitle */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Subtitle
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={details.category}
                                    onChange={handleChange}
                                    placeholder="SaaS Product • UI/UX Design"
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    value={details.role}
                                    onChange={handleChange}
                                    placeholder="UI/UX Designer"
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="subtitle"
                                    value={details.subtitle}
                                    onChange={handleChange}
                                    placeholder="SaaS Product Design"
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>

                            {/* Year */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Year
                                </label>
                                <input
                                    type="text"
                                    name="year"
                                    value={details.year}
                                    onChange={handleChange}
                                    placeholder="2026"
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    rows={3}
                                    value={details.description}
                                    onChange={handleChange}
                                    placeholder="Project description..."
                                    className="w-full p-3 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE] resize-none"
                                />
                            </div>
                        </div>
                    </Section>


                    {/*3 HERO IMAGE */}

                    <Section title="2. Hero Image">

                        <ImageField
                            label="Hero Image"
                            field="heroImage"
                        />

                    </Section>

                    {/* 3. PROJECT INFORMATION */}
                    <Section title="3. Project Information">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Project Name */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    name="projectName"
                                    value={details.projectName}
                                    onChange={handleChange}
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>

                            {/* Platform */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Platform
                                </label>
                                <input
                                    type="text"
                                    name="platform"
                                    value={details.platform}
                                    onChange={handleChange}
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>

                            {/* Tools */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Tools
                                </label>
                                <input
                                    type="text"
                                    name="tools"
                                    value={details.tools}
                                    onChange={handleChange}
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>

                            {/* Scope */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Scope
                                </label>
                                <input
                                    type="text"
                                    name="scope"
                                    value={details.scope}
                                    onChange={handleChange}
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>
                        </div>
                    </Section>


                    {/*    4. BRAND & EDITORIAL*/}
                    <Section title="4. Brand & Editorial Images">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <ImageField
                                label="Brand Image"
                                field="brandImage"
                            />

                            <ImageField
                                label="Editorial Image"
                                field="editorialImage"
                            />

                        </div>

                    </Section>

                    {/*  5. PRODUCT */}
                    <Section title="5. Product">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Product Title
                                </label>
                                <input
                                    type="text"
                                    name="productTitle"
                                    value={details.productTitle}
                                    onChange={handleChange}
                                    placeholder="THE PRODUCT"
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>

                            {/* Product Description */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Product Description
                                </label>
                                <textarea
                                    name="productDescription"
                                    rows={3}
                                    value={details.productDescription}
                                    onChange={handleChange}
                                    placeholder="First paragraph of product description..."
                                    className="w-full p-3 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE] resize-none"
                                />
                            </div>

                            {/* Product Description Two */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Product Description Two
                                </label>
                                <textarea
                                    name="productDescriptionTwo"
                                    rows={3}
                                    value={details.productDescriptionTwo}
                                    onChange={handleChange}
                                    placeholder="Second paragraph of product description..."
                                    className="w-full p-3 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE] resize-none"
                                />
                            </div>
                        </div>
                    </Section>

                    {/*  6. ECOSYSTEM */}
                    <Section
                        title="6. Platform Ecosystem"
                        action={
                            <AddButton
                                onClick={addEcosystemItem}
                                text="Add Item"
                            />
                        }
                    >
                        <div className="space-y-4">
                            {details.ecosystem.map((item, index) => (
                                <div
                                    key={item._id || index}
                                    className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-sm font-semibold text-gray-800">
                                            Ecosystem Item {index + 1}
                                        </h3>

                                        <button
                                            type="button"
                                            onClick={() => deleteEcosystemItem(index)}
                                            className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {/* Title */}
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) =>
                                                    updateEcosystemItem(index, "title", e.target.value)
                                                }
                                                placeholder="e.g. Marketing"
                                                className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                            />
                                        </div>

                                        {/* Icon Name */}
                                        {/* <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                Icon Name
                                            </label>
                                            <input
                                                type="text"
                                                value={item.icon || ""}
                                                onChange={(e) =>
                                                    updateEcosystemItem(index, "icon", e.target.value)
                                                }
                                                placeholder="e.g. CiGlobe"
                                                className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                            />
                                        </div> */}

                                        {/* Position */}
                                        {/* <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                Position
                                            </label>
                                            <input
                                                type="text"
                                                value={item.position}
                                                onChange={(e) =>
                                                    updateEcosystemItem(index, "position", e.target.value)
                                                }
                                                placeholder="e.g. top-left"
                                                className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                            />
                                        </div> */}

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={item.description}
                                                onChange={(e) =>
                                                    updateEcosystemItem(index, "description", e.target.value)
                                                }
                                                placeholder="Brief item description..."
                                                className="w-full p-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE] resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* 7. CHALLENGE & APPROACH */}
                    <Section title="7. Challenge & Approach">
                        <div className="space-y-6">
                            <div className="p-4 border border-gray-200 rounded-xl space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Challenge Title
                                    </label>
                                    <input
                                        type="text"
                                        value={details.challenge.title}
                                        onChange={(e) =>
                                            handleNestedChange("challenge", "title", e.target.value)
                                        }
                                        placeholder="Enter challenge title..."
                                        className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-xs font-semibold text-gray-700">
                                        Challenge Paragraphs
                                    </label>
                                    {details.challenge.paragraphs.map((paragraph, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <textarea
                                                rows={2}
                                                value={paragraph}
                                                onChange={(e) =>
                                                    updateParagraph("challenge", index, e.target.value)
                                                }
                                                placeholder="Challenge paragraph..."
                                                className="w-full p-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE] resize-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => deleteParagraph("challenge", index)}
                                                className="text-red-500 hover:text-red-700 p-1 transition-colors cursor-pointer"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Reduced size wrapper for AddButton */}
                                    <div className="inline-block text-xs [&_button]:h-8 [&_button]:px-3 [&_button]:py-1 [&_button]:text-xs">
                                        <AddButton
                                            onClick={() => addParagraph("challenge")}
                                            text="Add Paragraph"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* APPROACH SECTION */}
                            <div className="p-4 border border-gray-200 rounded-xl space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Approach Title
                                    </label>
                                    <input
                                        type="text"
                                        value={details.approach.title}
                                        onChange={(e) =>
                                            handleNestedChange("approach", "title", e.target.value)
                                        }
                                        placeholder="Enter approach title..."
                                        className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-xs font-semibold text-gray-700">
                                        Approach Paragraphs
                                    </label>
                                    {details.approach.paragraphs.map((paragraph, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <textarea
                                                rows={2}
                                                value={paragraph}
                                                onChange={(e) =>
                                                    updateParagraph("approach", index, e.target.value)
                                                }
                                                placeholder="Approach paragraph..."
                                                className="w-full p-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE] resize-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => deleteParagraph("approach", index)}
                                                className="text-red-500 hover:text-red-700 p-1 transition-colors cursor-pointer"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Reduced size wrapper for AddButton */}
                                    <div className="inline-block text-xs [&_button]:h-8 [&_button]:px-3 [&_button]:py-1 [&_button]:text-xs">
                                        <AddButton
                                            onClick={() => addParagraph("approach")}
                                            text="Add Paragraph"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Section>

                    {/*  8. SECTION IMAGES */}
                    <Section
                        title="8. Section Images"
                        action={
                            <div className="inline-block text-xs [&_button]:h-8 [&_button]:px-3 [&_button]:py-1 [&_button]:text-xs">
                                <AddButton
                                    onClick={() => addArrayItem("sectionImages")}
                                    text="Add Image"
                                />
                            </div>
                        }
                    >
                        <div className="space-y-3">
                            {details.sectionImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row items-center gap-2"
                                >
                                    {/* Image URL Input */}
                                    <input
                                        type="text"
                                        value={image}
                                        onChange={(e) =>
                                            updateArrayItem("sectionImages", index, e.target.value)
                                        }
                                        placeholder="Image URL"
                                        className="flex-1 w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                    />

                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        {/* Upload Button */}
                                        <label className="cursor-pointer h-9 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-gray-200 flex-1 sm:flex-none">
                                            <FiUploadCloud className="w-4 h-4 text-gray-500" />
                                            <span>Upload</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    uploadImage(
                                                        e.target.files?.[0],
                                                        null,
                                                        "sectionImages",
                                                        index
                                                    )
                                                }
                                            />
                                        </label>

                                        {/* Delete Button */}
                                        <button
                                            type="button"
                                            onClick={() => deleteArrayItem("sectionImages", index)}
                                            className="h-9 px-2 text-red-500 hover:text-red-700 transition-colors flex items-center justify-center cursor-pointer"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/*   9. STRATEGIC OVERVIEW */}
                    <Section title="9. Strategic Overview">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Label
                                </label>
                                <input
                                    type="text"
                                    value={details.strategicOverview.label}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "strategicOverview",
                                            "label",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter label..."
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={details.strategicOverview.title}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "strategicOverview",
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter title..."
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>
                        </div>

                        {/* STRATEGY CARDS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                            {["goal", "process", "impact"].map((item) => (
                                <div
                                    key={item}
                                    className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3"
                                >
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 border-b border-gray-200 pb-2">
                                        {item}
                                    </h3>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={
                                                    details.strategicOverview[item]?.title || ""
                                                }
                                                onChange={(e) =>
                                                    handleDeepNestedChange(
                                                        "strategicOverview",
                                                        item,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={`${item} title...`}
                                                className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg bg-white outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={
                                                    details.strategicOverview[item]?.description ||
                                                    ""
                                                }
                                                onChange={(e) =>
                                                    handleDeepNestedChange(
                                                        "strategicOverview",
                                                        item,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={`${item} description...`}
                                                className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-white outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE] resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* 10. METADATA */}
                    <Section title="10. Project Metadata">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Client
                                </label>
                                <input
                                    type="text"
                                    name="client"
                                    value={details.client}
                                    onChange={handleChange}
                                    placeholder="Client name..."
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="metadataCategory"
                                    value={details.metadataCategory}
                                    onChange={handleChange}
                                    placeholder="Category..."
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Tools
                                </label>
                                <input
                                    type="text"
                                    name="metadataTools"
                                    value={details.metadataTools}
                                    onChange={handleChange}
                                    placeholder="Tools used..."
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>
                        </div>
                    </Section>

                    {/*  11. EXPERIENCE */}
                    <Section
                        title="11. Experience / Results"
                        action={
                            <div className="inline-block text-xs [&_button]:h-8 [&_button]:px-3 [&_button]:py-1 [&_button]:text-xs">
                                <AddButton
                                    onClick={() => addArrayItem("achievements")}
                                    text="Add Achievement"
                                />
                            </div>
                        }
                    >
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Experience Title
                            </label>
                            <input
                                type="text"
                                name="experienceTitle"
                                value={details.experienceTitle}
                                onChange={handleChange}
                                placeholder="Enter experience title..."
                                className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                            />
                        </div>

                        <div className="space-y-3 mt-4">
                            <label className="block text-xs font-semibold text-gray-700">
                                Achievements
                            </label>
                            {details.achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <textarea
                                        rows={2}
                                        value={achievement}
                                        onChange={(e) =>
                                            updateArrayItem("achievements", index, e.target.value)
                                        }
                                        placeholder="Achievement..."
                                        className="w-full p-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE] resize-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => deleteArrayItem("achievements", index)}
                                        className="text-red-500 hover:text-red-700 p-1 transition-colors cursor-pointer"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/*  12. SECTION 7 IMAGE*/}
                    <Section title="12. Section 7 Image">

                        <ImageField
                            label="Section 7 Image"
                            field="section7Image"
                        />

                    </Section>

                    {/* 13. CHALLENGE CARDS */}
                    <Section
                        title="13. Challenge Cards"
                        action={
                            <div className="inline-block text-xs [&_button]:h-8 [&_button]:px-3 [&_button]:py-1 [&_button]:text-xs">
                                <AddButton onClick={addChallengeCard} text="Add Card" />
                            </div>
                        }
                    >
                        {/* MAIN SECTION INPUTS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Label
                                </label>
                                <input
                                    type="text"
                                    value={details.challengeSection.label}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "challengeSection",
                                            "label",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter section label..."
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Title
                                </label>
                                <textarea
                                    rows={1}
                                    value={details.challengeSection.title}
                                    onChange={(e) =>
                                        handleNestedChange(
                                            "challengeSection",
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter section title..."
                                    className="w-full min-h-9 px-3 py-1.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE] resize-none"
                                />
                            </div>
                        </div>

                        {/* DYNAMIC CARDS LIST */}
                        <div className="space-y-4 mt-5">
                            {details.challengeSection.cards.map((card, index) => (
                                <div
                                    key={card._id || index}
                                    className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3"
                                >
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                                            Card {index + 1}
                                        </h3>

                                        <button
                                            type="button"
                                            onClick={() => deleteChallengeCard(index)}
                                            className="text-red-500 hover:text-red-700 p-1 transition-colors cursor-pointer"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={card.title || ""}
                                                onChange={(e) =>
                                                    updateChallengeCard(
                                                        index,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Card title..."
                                                className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg bg-white outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={card.description || ""}
                                                onChange={(e) =>
                                                    updateChallengeCard(
                                                        index,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Card description..."
                                                className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-white outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE] resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/*  14. SECTION 9 IMAGE */}
                    <Section title="14. Section 9 Image">
                        <ImageField
                            label="Section 9 Image"
                            field="section9Image"
                        />

                    </Section>

                    {/*  15. OUTCOME */}
                    <Section
                        title="15. Outcome"
                        action={
                            <div className="inline-block text-xs [&_button]:h-8 [&_button]:px-3 [&_button]:py-1 [&_button]:text-xs">
                                <AddButton onClick={addOutcomeCard} text="Add Outcome Card" />
                            </div>
                        }
                    >
                        {/* MAIN SECTION INPUTS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Outcome Title
                                </label>
                                <input
                                    type="text"
                                    value={details.outcome.title}
                                    onChange={(e) =>
                                        handleNestedChange("outcome", "title", e.target.value)
                                    }
                                    placeholder="Enter outcome title..."
                                    className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Outcome Description
                                </label>
                                <textarea
                                    rows={1}
                                    value={details.outcome.description}
                                    onChange={(e) =>
                                        handleNestedChange("outcome", "description", e.target.value)
                                    }
                                    placeholder="Enter outcome description..."
                                    className="w-full min-h-9 px-3 py-1.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE] resize-none"
                                />
                            </div>
                        </div>

                        {/* DYNAMIC CARDS LIST */}
                        <div className="space-y-4 mt-5">
                            {details.outcome.cards.map((card, index) => (
                                <div
                                    key={card._id || index}
                                    className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3"
                                >
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                                            Outcome Card {index + 1}
                                        </h3>

                                        <button
                                            type="button"
                                            onClick={() => deleteOutcomeCard(index)}
                                            className="text-red-500 hover:text-red-700 p-1 transition-colors cursor-pointer"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={card.title || ""}
                                                onChange={(e) =>
                                                    updateOutcomeCard(
                                                        index,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Card title..."
                                                className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-lg bg-white outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={card.description || ""}
                                                onChange={(e) =>
                                                    updateOutcomeCard(
                                                        index,
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Card description..."
                                                className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-white outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE] resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/*  16. FOOTER */}
                    <Section title="16. Footer">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Footer Title
                            </label>
                            <textarea
                                rows={2}
                                name="footerTitle"
                                value={details.footerTitle || ""}
                                onChange={handleChange}
                                placeholder="DESIGNED TO MAKE COMPLEX DATA WORKFLOWS FEEL SIMPLE."
                                className="w-full p-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#5870EE] focus:ring-1 focus:ring-[#5870EE] resize-none uppercase"
                            />
                        </div>
                    </Section>

                    {/*  FINAL SAVE */}

                    <div className="flex justify-end pb-10">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-[#191C1D] text-white px-6
                             py-3 rounded-xl hover:bg-black transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <FiLoader className="w-5 h-5 animate-spin" />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <FiSave className="w-5 h-5" />
                                    <span>Save Project Details</span>
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};



const Section = ({
    title,
    children,
    action,
}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">

                <h2 className="text-lg sm:text-lg font-bold text-[#191C1D]">
                    {title}
                </h2>

                {action}

            </div>

            <div className="space-y-5">
                {children}
            </div>

        </div>
    );
};



const AddButton = ({
    onClick,
    text,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition cursor-pointer"
        >
            <FiPlus />

            {text}
        </button>
    );
};

export default ProjectDetailsTab;

