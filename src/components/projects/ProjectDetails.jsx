import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectDetailService, getProjectsService } from "../service/projecttab.service";
import { FiServer, FiDatabase, FiCloud, FiCpu, FiShare2, FiShield, FiZap } from "react-icons/fi";
import { FiCheckCircle, FiTrendingUp, FiAward, FiStar, FiTarget, FiLayers, FiPieChart, } from "react-icons/fi";


// ANIMATIONS
const fadeUp = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: "easeOut",
        },
    },
};

const fadeIn = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const scaleIn = {
    hidden: {
        opacity: 0,
        scale: 0.96,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: "easeOut",
        },
    },
};


const ProjectDetails = ({ card, index, fadeUp }) => {
    const { projectId } = useParams();
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const DEFAULT_ICONS = [FiServer, FiDatabase, FiCloud, FiCpu, FiLayers, FiShare2, FiShield, FiZap,];
    const DEFAULT_CARD_ICONS = [FiZap, FiCheckCircle, FiTrendingUp, FiAward, FiStar, FiTarget, FiLayers, FiPieChart,];

    const getEcosystemIcon = (title = "", index = 0) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes("db") || lowerTitle.includes("data")) return FiDatabase;
        if (lowerTitle.includes("cloud") || lowerTitle.includes("api")) return FiCloud;
        if (lowerTitle.includes("server") || lowerTitle.includes("backend")) return FiServer;
        if (lowerTitle.includes("security") || lowerTitle.includes("auth")) return FiShield;
        return DEFAULT_ICONS[index % DEFAULT_ICONS.length];
    };


    const getCardIcon = (title = "", index = 0) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes("speed") || lowerTitle.includes("fast") || lowerTitle.includes("quick")) return FiZap;
        if (lowerTitle.includes("result") || lowerTitle.includes("success") || lowerTitle.includes("done")) return FiCheckCircle;
        if (lowerTitle.includes("growth") || lowerTitle.includes("scale") || lowerTitle.includes("increase")) return FiTrendingUp;
        if (lowerTitle.includes("quality") || lowerTitle.includes("award") || lowerTitle.includes("best")) return FiAward;
        if (lowerTitle.includes("goal") || lowerTitle.includes("target")) return FiTarget;
        return DEFAULT_CARD_ICONS[index % DEFAULT_CARD_ICONS.length];
    };


    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                setLoading(true);
                setError("");
                // console.log("Fetching Project ID:", projectId);
                if (!projectId) {
                    throw new Error("Project ID is missing.");
                }
                const data = await getProjectDetailService(projectId);
                // console.log("PROJECT DETAIL API RESPONSE:", data);
                let projectData;
                if (Array.isArray(data)) {
                    projectData = data.find(
                        (project) => project._id === projectId
                    );
                } else {
                    projectData =
                        data?.project ||
                        data?.data ||
                        data;
                }
                // console.log("SELECTED PROJECT:", projectData);
                if (!projectData) {
                    throw new Error("Project details not found.");
                }
                setDetails(projectData);
            } catch (err) {
                console.error(
                    "Project details fetch error:",
                    err
                );
                setError(
                    err?.message ||
                    err?.response?.data?.message ||
                    "Failed to load project details."
                );
            } finally {
                setLoading(false);
            }
        }
        fetchProjectDetails();
    }, [projectId]);

    const IconComponent = getCardIcon(card?.title, index);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjectsService();
                const projectList =
                    Array.isArray(response)
                        ? response
                        : response?.data || [];
                setProjects(projectList);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        };
        fetchProjects();
    }, []);


    if (loading) {
        return (
            <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-[#1A65FF]/20 border-t-[#1A65FF] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sm text-[#434656]">
                        Loading project...
                    </p>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <h2 className="text-2xl font-bold text-[#191C1D] mb-3">
                        Unable to load project
                    </h2>
                    <p className="text-sm text-red-500">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!details) {
        return (
            <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
                <p className="text-gray-500">
                    No project details found.
                </p>
            </div>
        );
    }


    const currentIndex = projects.findIndex(
        (project) => project._id === projectId
    );

    const nextProject =
        currentIndex !== -1 && projects.length > 0
            ? projects[(currentIndex + 1) % projects.length]
            : null;


    return (
        <div className="bg-[#F7F9FC] text-[#191C1D] font-sans selection:bg-[#191C1D] selection:text-white">
            <motion.header
                className="max-w-7xl mx-auto px-6 pt-12 pb-8 text-center"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
            >
                <span className="text-xs font-semibold tracking-widest text-[#1A65FF] uppercase">
                    {details.category || "UI/UX Design"}
                </span>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mt-3 mb-4">
                    {details.projectName || "Project"}
                </h1>

                <p className="text-sm text-[#434656] max-w-xl mx-auto mb-8">
                    {details.description || ""}
                </p>

                {/* Metadata */}
                <motion.div
                    className="flex flex-wrap justify-center gap-8 sm:gap-16 py-4 text-xs tracking-wider uppercase text-[#434656]"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={fadeUp}>
                        <p className="font-bold text-[#191C1D] mb-1">
                            Role
                        </p>

                        <p>
                            {details.role || "-"}
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <p className="font-bold text-[#191C1D] mb-1">
                            Category
                        </p>

                        <p>
                            {details.subtitle || "-"}
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <p className="font-bold text-[#191C1D] mb-1">
                            Year
                        </p>

                        <p>
                            {details.year || "-"}
                        </p>
                    </motion.div>
                </motion.div>
            </motion.header>


            {details.heroImage && (
                <motion.div
                    className="w-full px-0"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                >
                    {details.heroImage ? (
                        <img
                            src={details.heroImage}
                            alt={`${details.projectName || "Project"} Hero`}
                            className="w-full h-87.5 sm:h-112.5 object-cover shadow-sm"
                        />
                    ) : (
                        <div className="w-full h-87.5 sm:h-112.5  bg-gray-100  flex items-center justify-center text-gray-400 text-sm border border-gray-200">
                            No Hero Image Available
                        </div>
                    )}
                </motion.div>
            )}


            {/* 3. PROJECT METADATA*/}

            <section className="container py-10">
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-sm justify-center"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                >

                    <motion.div
                        className="space-y-2"
                        variants={fadeUp}
                    >
                        <h4 className="font-bold text-[#434656] uppercase tracking-wider text-xs">
                            Project
                        </h4>

                        <p className="font-medium text-[#191C1D]">
                            {details.projectName || "-"}
                        </p>
                    </motion.div>


                    <motion.div
                        className="space-y-2"
                        variants={fadeUp}
                    >
                        <h4 className="font-bold text-[#434656] uppercase tracking-wider text-xs">
                            Role
                        </h4>

                        <p className="font-medium text-[#191C1D]">
                            {details.role || "-"}
                        </p>
                    </motion.div>


                    <motion.div
                        className="space-y-2"
                        variants={fadeUp}
                    >
                        <h4 className="font-bold text-[#434656] uppercase tracking-wider text-xs">
                            Platform
                        </h4>

                        <p className="font-medium text-[#191C1D]">
                            {details.platform || "-"}
                        </p>
                    </motion.div>


                    <motion.div
                        className="space-y-2"
                        variants={fadeUp}
                    >
                        <h4 className="font-bold text-[#434656] uppercase tracking-wider text-xs">
                            Tools
                        </h4>

                        <p className="font-medium text-[#191C1D]">
                            {details.tools || "-"}
                        </p>
                    </motion.div>


                    <motion.div
                        className="col-span-2 sm:col-span-1 space-y-2"
                        variants={fadeUp}
                    >
                        <h4 className="font-bold text-[#434656] uppercase tracking-wider text-xs">
                            Scope
                        </h4>

                        <p className="font-medium text-[#191C1D]">
                            {details.scope || "-"}
                        </p>
                    </motion.div>

                </motion.div>

            </section>


            {/*  4. BRAND + EDITORIAL + PRODUCT */}

            <section className="w-full py-8 bg-[#F7F9FC]">

                <div className="container">

                    {/* BRAND + EDITORIAL */}

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                    >

                        {/* Brand */}

                        <motion.div
                            className="h-72 sm:h-96 bg-neutral-200 rounded-3xl overflow-hidden shadow-md flex items-center justify-center relative group"
                            variants={scaleIn}
                            whileHover={{ y: -5 }}
                        >
                            {details.brandImage ? (
                                <img
                                    src={details.brandImage}
                                    alt="Brand"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-[#434656] font-medium text-sm">
                                    No Brand Image
                                </span>
                            )}
                        </motion.div>


                        {/* Editorial */}

                        <motion.div
                            className="h-72 sm:h-96 bg-[#191C1D] rounded-3xl overflow-hidden shadow-md flex items-center justify-center relative group"
                            variants={scaleIn}
                            whileHover={{ y: -5 }}
                        >
                            {details.editorialImage ? (
                                <img
                                    src={details.editorialImage}
                                    alt="Editorial"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-neutral-400 font-medium text-sm">
                                    No Editorial Image
                                </span>
                            )}
                        </motion.div>

                    </motion.div>


                    {/* PRODUCT */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                        {/* PRODUCT CONTENT (50% Width on Large Screens) */}
                        <motion.div
                            className="lg:col-span-6 space-y-5 lg:pt-4"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                        >
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#191C1D]">
                                {details.productTitle || "THE PRODUCT"}
                            </h2>

                            <p className="text-[#434656] text-sm sm:text-base leading-relaxed max-w-xl">
                                {details.productDescription || ""}
                            </p>

                            <p className="text-[#434656] text-xs sm:text-sm leading-relaxed max-w-xl">
                                {details.productDescriptionTwo || ""}
                            </p>
                        </motion.div>


                        {/* PLATFORM ECOSYSTEM (50% Width on Large Screens) */}
                        <motion.div
                            className="lg:col-span-6 bg-white border border-[#C3C5D9]/30 rounded-2xl p-6 sm:p-8"
                            variants={scaleIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                        >
                            <h3 className="text-sm sm:text-[15px] font-bold text-[#191C1D] mb-7 text-center">
                                Platform Ecosystem Map
                            </h3>

                            <div className="w-full max-w-xs mx-auto flex flex-col items-center">
                                {details.ecosystem?.map((item, index) => {
                                    const IconComponent = getEcosystemIcon(item.title, index);

                                    return (
                                        <React.Fragment key={item._id || index}>
                                            <motion.div
                                                className="w-48 min-h-20 bg-white border border-[#C3C5D9]/30 rounded-xl flex flex-col items-center justify-center text-center p-3 shadow-xs"
                                                whileHover={{
                                                    scale: 1.03,
                                                }}
                                            >
                                                <div className="text-[#5870EE] mb-1.5 p-1.5 bg-[#5870EE]/10 rounded-lg">
                                                    <IconComponent className="w-4 h-4" />
                                                </div>

                                                <div className="text-[13px] font-bold text-[#191C1D] leading-tight">
                                                    {item.title || ""}
                                                </div>

                                                {item.description && (
                                                    <p className="text-[10px] text-[#434656] leading-tight mt-1">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </motion.div>

                                            {index < details.ecosystem.length - 1 && (
                                                <div className="w-px h-8 border-l border-dashed border-[#D5D9E2]" />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                </div>

            </section>


            {/* 5. CHALLENGE + APPROACH */}
            <section className="container py-6 relative">
                <motion.div
                    className="relative container py-8 bg-white"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                >

                    {/* Vertical line */}

                    <motion.div
                        className="absolute left-1/2 top-0 h-9.5 w-0.5 -translate-x-1/2 bg-[#5870EE]"
                        initial={{
                            scaleY: 0,
                        }}
                        whileInView={{
                            scaleY: 1,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                        style={{
                            transformOrigin: "top",
                        }}
                    />


                    {/* Diamond */}

                    <motion.div
                        className="absolute left-1/2 top-8 h-8 w-8 -translate-x-1/2 pointer-events-none"
                        initial={{
                            opacity: 0,
                            scale: 0,
                            rotate: -45,
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.5,
                            ease: "backOut",
                        }}
                    >

                        <svg
                            viewBox="0 0 32 32"
                            className="h-full w-full"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16 0
                                C16.8 8.5 23.5 15.2 32 16
                                C23.5 16.8 16.8 23.5 16 32
                                C15.2 23.5 8.5 16.8 0 16
                                C8.5 15.2 15.2 8.5 16 0Z"
                                fill="white"
                                stroke="#5870EE"
                                strokeWidth="1.5"
                            />
                        </svg>

                    </motion.div>


                    {/* Content */}

                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-0"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                    >

                        {/* Challenge */}

                        <motion.div
                            className="bg-gray-100 rounded-4xl p-8 sm:p-12 shadow-[0_4px_20px_rgba(35,45,80,0.02)] flex flex-col justify-between"
                            variants={fadeUp}
                            whileHover={{ y: -5 }}
                        >

                            <div>

                                <span className="text-[11px] font-bold tracking-[0.2em] text-[#111827] uppercase block mb-4">
                                    {details.challenge?.title ||
                                        "THE CHALLENGE"}
                                </span>

                                <div className="space-y-4 text-[#4B5563] text-sm sm:text-base leading-relaxed">

                                    {details.challenge?.paragraphs?.map(
                                        (paragraph, index) => (
                                            <p key={index}>
                                                {paragraph}
                                            </p>
                                        )
                                    )}

                                </div>

                            </div>

                        </motion.div>


                        {/* Approach */}

                        <motion.div
                            className="bg-gray-100 rounded-4xl p-8 sm:p-12 shadow-[0_4px_20px_rgba(35,45,80,0.02)] flex flex-col justify-between"
                            variants={fadeUp}
                            whileHover={{ y: -5 }}
                        >

                            <div>

                                <span className="text-[11px] font-bold tracking-[0.2em] text-[#111827] uppercase block mb-4">
                                    {details.approach?.title ||
                                        "THE APPROACH"}
                                </span>

                                <div className="space-y-4 text-[#4B5563] text-sm sm:text-base leading-relaxed">

                                    {details.approach?.paragraphs?.map(
                                        (paragraph, index) => (
                                            <p key={index}>
                                                {paragraph}
                                            </p>
                                        )
                                    )}

                                </div>

                            </div>

                        </motion.div>

                    </motion.div>

                </motion.div>


                {/* SECTION IMAGES */}

                {details.sectionImages?.length > 0 && (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                    >

                        {details.sectionImages.map(
                            (image, index) => (
                                <motion.div
                                    key={index}
                                    className="h-72 sm:h-96 bg-neutral-100 border border-neutral-200 rounded-3xl overflow-hidden shadow-md"
                                    variants={scaleIn}
                                    whileHover={{
                                        scale: 1.015,
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`Project section ${index + 1
                                            }`}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            )
                        )}

                    </motion.div>
                )}

            </section>


            {/*  6. STRATEGIC OVERVIEW */}
            <section className="container py-4">
                <motion.div
                    className="bg-white border border-[#C3C5D9]/30 rounded-3xl p-8 sm:p-14 shadow-sm mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                >

                    <span className="text-[11px] font-bold tracking-widest text-[#1A65FF] uppercase block mb-2">
                        {details.strategicOverview?.label ||
                            "Strategic Overview"}
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191C1D] mb-10">
                        {details.strategicOverview?.title ||
                            "Project Deep Dive"}
                    </h2>


                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 sm:pl-14 pl-0"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                        }}
                    >

                        {/* Goal */}

                        <motion.div
                            className="space-y-3"
                            variants={fadeUp}
                        >
                            <h3 className="font-bold text-[#191C1D] text-base">
                                {details.strategicOverview
                                    ?.goal?.title ||
                                    "The Goal"}
                            </h3>

                            <p className="text-[#434656] text-sm leading-relaxed">
                                {details.strategicOverview
                                    ?.goal?.description ||
                                    ""}
                            </p>
                        </motion.div>


                        {/* Process */}

                        <motion.div
                            className="space-y-3"
                            variants={fadeUp}
                        >
                            <h3 className="font-bold text-[#191C1D] text-base">
                                {details.strategicOverview
                                    ?.process?.title ||
                                    "The Process"}
                            </h3>

                            <p className="text-[#434656] text-sm leading-relaxed">
                                {details.strategicOverview
                                    ?.process?.description ||
                                    ""}
                            </p>
                        </motion.div>


                        {/* Impact */}

                        <motion.div
                            className="space-y-3"
                            variants={fadeUp}
                        >
                            <h3 className="font-bold text-[#191C1D] text-base">
                                {details.strategicOverview
                                    ?.impact?.title ||
                                    "The Impact"}
                            </h3>

                            <p className="text-[#434656] text-sm leading-relaxed">
                                {details.strategicOverview
                                    ?.impact?.description ||
                                    ""}
                            </p>
                        </motion.div>

                    </motion.div>

                </motion.div>


                {/* METADATA + EXPERIENCE */}

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                >

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl shadow-sm p-6 sm:p-10 border border-neutral-100">

                        {/* METADATA */}

                        <div className="lg:col-span-4 w-full">

                            <motion.div
                                className="bg-gray-100 border border-[#C3C5D9]/20 rounded-3xl p-8 relative shadow-sm"
                                whileHover={{ y: -4 }}
                            >

                                <div className="absolute right-11.5 top-0 h-10 w-0.5 bg-[#5870EE]" />

                                <div className="absolute right-8 top-8 h-8 w-8 pointer-events-none">

                                    <svg
                                        viewBox="0 0 32 32"
                                        className="h-full w-full"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16 0 
                                            C16.8 8.5 23.5 15.2 32 16 
                                            C23.5 16.8 16.8 23.5 16 32 
                                            C15.2 23.5 8.5 16.8 0 16 
                                            C8.5 15.2 15.2 8.5 16 0Z"
                                            fill="white"
                                            stroke="#5870EE"
                                            strokeWidth="1.5"
                                        />
                                    </svg>

                                </div>


                                <div className="space-y-6 text-sm text-left pt-2">

                                    <div>
                                        <p className="text-[#434656] uppercase tracking-wider text-[10px] font-bold mb-1">
                                            Year
                                        </p>

                                        <p className="text-[#1A65FF] font-semibold">
                                            {details.year || "-"}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-[#434656] uppercase tracking-wider text-[10px] font-bold mb-1">
                                            Client
                                        </p>

                                        <p className="text-[#1A65FF] font-semibold">
                                            {details.client || "-"}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-[#434656] uppercase tracking-wider text-[10px] font-bold mb-1">
                                            Category
                                        </p>

                                        <p className="text-[#1A65FF] font-semibold">
                                            {details.metadataCategory ||
                                                details.category ||
                                                "-"}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-[#434656] uppercase tracking-wider text-[10px] font-bold mb-1">
                                            Tools
                                        </p>

                                        <p className="text-[#1A65FF] font-semibold">
                                            {details.metadataTools ||
                                                details.tools ||
                                                "-"}
                                        </p>
                                    </div>

                                </div>

                            </motion.div>

                        </div>


                        {/* EXPERIENCE */}

                        <div className="lg:col-span-8 space-y-6 lg:pl-4">

                            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#A5A5A5] uppercase">
                                {details.experienceTitle || ""}
                            </h3>


                            <motion.div
                                className="space-y-5"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{
                                    once: true,
                                }}
                            >

                                {details.achievements?.map(
                                    (achievement, index) => (
                                        <motion.div
                                            key={
                                                achievement?._id ||
                                                index
                                            }
                                            className="flex items-start gap-4"
                                            variants={fadeUp}
                                        >

                                            <div className="w-6 h-6 rounded-full bg-[#4F46E5]/20 text-[#1A65FF] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border border-[#4F46E5]/30">
                                                ✓
                                            </div>

                                            <p className="text-[#888888] text-sm sm:text-base leading-relaxed">
                                                {typeof achievement ===
                                                    "string"
                                                    ? achievement
                                                    : achievement?.description ||
                                                    achievement?.title ||
                                                    ""}
                                            </p>

                                        </motion.div>
                                    )
                                )}

                            </motion.div>

                        </div>

                    </div>

                </motion.div>

            </section>


            {/* 7. SECTION 7 IMAGE */}
            {details.section7Image && (
                <motion.div
                    className="w-full px-0"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                >
                    <img
                        src={details.section7Image}
                        alt={`${details.projectName || "Project"} Section 7`}
                        className="w-full h-87.5 sm:h-112.5 object-cover shadow-sm"
                    />
                </motion.div>
            )}


            {/* 8. CHALLENGE CARDS */}
            <section className="container py-8">

                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                    }}
                >

                    <span className="text-xs font-bold tracking-widest text-[#1A65FF] uppercase block mb-3">
                        {details.challengeSection?.label ||
                            "The Challenge"}
                    </span>

                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#191C1D]">
                        {details.challengeSection?.title ||
                            ""}
                    </h2>

                </motion.div>


                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                >

                    {details.challengeSection?.cards?.map(
                        (card, index) => (
                            <motion.div
                                key={
                                    card?._id ||
                                    index
                                }
                                className="bg-white border border-[#C3C5D9]/20 rounded-xl p-8 shadow-sm flex flex-col"
                                variants={fadeUp}
                                whileHover={{
                                    y: -5,
                                }}
                            >

                                <div className="w-10 h-10 rounded-full bg-[#0055FF]/10 flex items-center justify-center text-[#1A65FF] mb-6">
                                    {card.icon ||
                                        "⚡"}
                                </div>

                                <h3 className="text-lg font-semibold text-[#191C1D] mb-3">
                                    {card.title || ""}
                                </h3>

                                <p className="text-[#434656] text-sm leading-relaxed">
                                    {card.description ||
                                        ""}
                                </p>

                            </motion.div>
                        )
                    )}

                </motion.div>

            </section>


            {/* 9. SECTION 9 IMAGE */}

            {details.section9Image && (
                <motion.div
                    className="w-full px-0"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                >
                    <img
                        src={details.section9Image}
                        alt={`${details.projectName || "Project"} Section 9`}
                        className="w-full h-87.5 sm:h-112.5 object-cover shadow-sm"
                    />
                </motion.div>
            )}


            {/*  10. OUTCOME */}
            <section className="container py-8">

                <motion.div
                    className="text-center max-w-xl mx-auto mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                    }}
                >

                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191C1D] mb-4">
                        {details.outcome?.title ||
                            "THE OUTCOME"}
                    </h2>

                    <p className="text-[#434656] text-sm font-regular leading-relaxed">
                        {details.outcome?.description ||
                            ""}
                    </p>
                </motion.div>


                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.2,
                    }}
                >

                    {details.outcome?.cards?.map(
                        (card, index) => (
                            <motion.div
                                key={card?._id || index}
                                className="bg-white border border-[#C3C5D9]/20 rounded-xl p-8 shadow-xs flex flex-col"
                                variants={fadeUp}
                                whileHover={{
                                    y: -5,
                                }}
                            >
                                <div className="w-10 h-10 rounded-full bg-[#5870EE]/10 flex items-center justify-center text-[#5870EE] mb-6 shrink-0">
                                    <IconComponent className="w-5 h-5" />
                                </div>

                                <h3 className="text-lg font-semibold text-[#191C1D] mb-3">
                                    {card?.title || ""}
                                </h3>

                                <p className="text-[#434656] text-sm leading-relaxed">
                                    {card?.description || ""}
                                </p>
                            </motion.div>
                        )
                    )}

                </motion.div>

            </section>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <motion.div
                className="bg-[#F3F4F5] border border-[#C3C5D9]/20 py-20 px-6 text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{
                    once: true,
                    amount: 0.2,
                }}
            >

                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#191C1D] max-w-4xl mx-auto mb-12 leading-tight">
                    {details.footerTitle || ""}
                </h2>

            </motion.div>


            {/* ==================================================
                NEXT PROJECT
            ================================================== */}

            <motion.div
                className="flex justify-center py-30"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{
                    once: true,
                }}
            >

                {nextProject && (
                    <motion.button
                        type="button"
                        onClick={() =>
                            navigate(`/projects/${nextProject._id}`)
                        }
                        className="bg-neutral-800 hover:bg-[#191C1D] text-white font-medium px-8 py-4 rounded-2xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                        whileHover={{
                            y: -3,
                            scale: 1.02,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                    >
                        Next Project
                    </motion.button>
                )}
            </motion.div>

        </div>
    );
};

export default ProjectDetails;