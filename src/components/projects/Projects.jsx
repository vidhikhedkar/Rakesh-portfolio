import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiDandelionFlower } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { getProjectsService } from "../service/projecttab.service";

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    show: {
        opacity: 1,
        y: 0,
    },
};

const PlusButton = () => {
    return (
        <motion.div
            initial={{ opacity: 0.9 }}
            whileHover={{ scale: 1.05 }}
            transition={{
                duration: 0.25,
                ease: "easeOut",
            }}
            className="absolute bottom-5 right-5 h-8 w-8 cursor-pointer"
        >
            <svg
                viewBox="0 0 56 56"
                className="h-full w-full overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="28"
                    cy="28"
                    r="26"
                    stroke="#EEF1F7"
                    strokeWidth="2"
                    className="transition-all duration-500 ease-out group-hover:stroke-[#DCE2EF]"
                />
                <line
                    x1="0"
                    y1="28"
                    x2="28"
                    y2="28"
                    stroke="#E3E8FA"
                    strokeWidth="2"
                    className="transition-all duration-500 ease-out group-hover:stroke-[#5B78FF]"
                />
                <path
                    d="M28 17
            C28.7 23.5 32.5 27.3 39 28
            C32.5 28.7 28.7 32.5 28 39
            C27.3 32.5 23.5 28.7 17 28
            C23.5 27.3 27.3 23.5 28 17
            Z"
                    fill="#E0E6FA"
                    className="transition-all duration-500 ease-out group-hover:fill-[#5B78FF]"
                />
            </svg>
        </motion.div>
    );
};

const ProjectCard = ({
    project,
    index,
    onClick,
    className = "",
    imageClassName = "",
}) => {
    return (
        <motion.article
            onClick={onClick}
            variants={{
                hidden: { opacity: 0, y: 25, scale: 0.97 },
                show: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: -20, scale: 0.97 }
            }}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{
                duration: 0.4,
                delay: (index % 6) * 0.06,
                ease: [0.25, 1, 0.5, 1],
            }}
            whileHover={{
                y: -3,
            }}
            className={`group relative overflow-hidden rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(35,45,80,0.025)] transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(35,45,80,0.08)] cursor-pointer ${className}`}
        >
            {/* Image */}
            <div
                className={`relative w-full overflow-hidden rounded-[15px] bg-[#eeeeee] ${imageClassName}`}
            >
                <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{
                        scale: 1.035,
                    }}
                    transition={{
                        duration: 0.45,
                        ease: "easeOut",
                    }}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Details */}
            <div className="px-px pt-4">
                <p className="truncate text-[11px] font-normal uppercase leading-none tracking-[0.2px] text-[#BCBCBC]">
                    {project.category}
                </p>

                <h3 className="mt-1.25 truncate pr-7 text-[20px] font-medium leading-none tracking-[-0.1px] text-[#0F0F0F]">
                    {project.title}
                </h3>
            </div>
            <PlusButton />
        </motion.article>
    );
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const data = await getProjectsService();
                setProjects(data);
                setError(null);
            } catch (err) {
                setError("Failed to load projects");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Pagination calculations
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

    const getDesktopImageClassName = (index) => {
        switch (index % 6) {
            case 0:
                return "h-[210px]";
            case 1:
                return "h-[240px]";
            case 2:
                return "h-[240px]";
            case 3:
                return "h-[335px]";
            case 4:
                return "h-[240px]";
            case 5:
                return "h-[240px]";
            default:
                return "h-[240px]";
        }
    };

    const handleCardClick = (project) => {
        const projectId = project._id || project.id;
        navigate(`/projects/${projectId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24 bg-[#f4f6f8]">
                <p className="text-sm text-gray-500 animate-pulse">Loading projects...</p>
            </div>
        );
    }

    if (error || projects.length === 0) {
        return (
            <div className="flex justify-center items-center py-24 bg-[#f4f6f8]">
                <p className="text-sm text-red-500">{error || "No projects found"}</p>
            </div>
        );
    }

    const col1Projects = [currentProjects[0], currentProjects[3]].filter(Boolean);
    const col2Projects = [currentProjects[1], currentProjects[4]].filter(Boolean);
    const col3Projects = [currentProjects[2], currentProjects[5]].filter(Boolean);

    return (
        <section className="bg-[#f4f6f8] px-2.5 py-12 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        {/* Desktop Layout */}
                        <div className="hidden md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-4 items-start">
                            <div className="flex flex-col gap-4">
                                {col1Projects[0] && (
                                    <ProjectCard
                                        project={col1Projects[0]}
                                        index={startIndex + 0}
                                        onClick={() => handleCardClick(col1Projects[0])}
                                        imageClassName={getDesktopImageClassName(0)}
                                    />
                                )}
                                {col1Projects[1] && (
                                    <ProjectCard
                                        project={col1Projects[1]}
                                        index={startIndex + 3}
                                        onClick={() => handleCardClick(col1Projects[1])}
                                        imageClassName={getDesktopImageClassName(3)}
                                    />
                                )}
                            </div>

                            <div className="flex flex-col gap-4">
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate="show"
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.05,
                                    }}
                                    className="flex h-12 items-center justify-center bg-transparent px-2"
                                >
                                    <h1 className="flex items-center gap-2 whitespace-nowrap text-[50px] font-bold leading-none tracking-[-1.5px] text-[#111111] pl-50 mb-10">
                                        <span className="text-[#5870EE] text-[34px] leading-none font-light animate-pulse"><GiDandelionFlower /></span>
                                        <span>ALL PROJECTS</span>
                                        <span className="text-[#5870EE] text-[34px] leading-none font-light animate-pulse"><GiDandelionFlower /></span>
                                    </h1>
                                </motion.div>

                                {col2Projects[0] && (
                                    <ProjectCard
                                        project={col2Projects[0]}
                                        index={startIndex + 1}
                                        onClick={() => handleCardClick(col2Projects[0])}
                                        imageClassName={getDesktopImageClassName(1)}
                                    />
                                )}
                                {col2Projects[1] && (
                                    <ProjectCard
                                        project={col2Projects[1]}
                                        index={startIndex + 4}
                                        onClick={() => handleCardClick(col2Projects[4])}
                                        imageClassName={getDesktopImageClassName(4)}
                                    />
                                )}
                            </div>

                            <div className="flex flex-col gap-4 pt-16">
                                {col3Projects[0] && (
                                    <ProjectCard
                                        project={col3Projects[0]}
                                        index={startIndex + 2}
                                        onClick={() => handleCardClick(col3Projects[0])}
                                        imageClassName={getDesktopImageClassName(2)}
                                    />
                                )}
                                {col3Projects[1] && (
                                    <ProjectCard
                                        project={col3Projects[1]}
                                        index={startIndex + 5}
                                        onClick={() => handleCardClick(col3Projects[1])}
                                        imageClassName={getDesktopImageClassName(5)}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Tablet Layout */}
                        <div className="hidden sm:grid sm:grid-cols-2 md:hidden gap-4">
                            <div className="col-span-2 flex items-center justify-center py-2">
                                <h1 className="flex items-center gap-2 text-[28px] font-bold leading-none tracking-[-1.5px] text-[#111111]">
                                    <span className="text-[#5870EE] text-[28px] leading-none font-light"><GiDandelionFlower /></span>
                                    <span>ALL PROJECTS</span>
                                    <span className="text-[#5870EE] text-[28px] leading-none font-light"><GiDandelionFlower /></span>
                                </h1>
                            </div>
                            {currentProjects.map((project, index) => (
                                <ProjectCard
                                    key={project._id || project.title}
                                    project={project}
                                    index={startIndex + index}
                                    onClick={() => handleCardClick(project)}
                                    className="w-full"
                                    imageClassName="h-[200px]"
                                />
                            ))}
                        </div>

                        {/* Mobile Layout */}
                        <div className="flex sm:hidden flex-col gap-4">
                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                animate="show"
                                className="flex items-center justify-center py-2"
                            >
                                <h1 className="flex items-center gap-1 text-[24px] font-medium leading-none tracking-[-1.5px] text-[#111111]">
                                    <span className="text-[#5870EE] text-[24px] leading-none font-light animate-pulse"><GiDandelionFlower /></span>
                                    <span>ALL PROJECTS</span>
                                    <span className="text-[#5870EE] text-[24px] leading-none font-light animate-pulse"><GiDandelionFlower /></span>
                                </h1>
                            </motion.div>

                            {currentProjects.map((project, index) => (
                                <ProjectCard
                                    key={project._id || project.title}
                                    project={project}
                                    index={startIndex + index}
                                    onClick={() => handleCardClick(project)}
                                    className="w-full"
                                    imageClassName="h-[180px]"
                                />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Animated Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-[#0F0F0F] shadow-sm transition-colors hover:bg-[#5B78FF] cursor-pointer hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Previous
                        </motion.button>

                        <div className="flex items-center gap-1 px-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                const isActive = currentPage === page;
                                return (
                                    <motion.button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.93 }}
                                        className={`relative h-9 w-9 rounded-xl text-sm cursor-pointer font-medium transition-colors ${isActive
                                                ? "text-white"
                                                : "bg-white text-[#0F0F0F] hover:bg-[#E0E6FA]"
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activePaginationIndicator"
                                                className="absolute inset-0 rounded-xl bg-[#5B78FF] shadow-md shadow-[#5B78FF]/20"
                                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{page}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-[#0F0F0F] shadow-sm transition-colors hover:bg-[#5B78FF] cursor-pointer hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;