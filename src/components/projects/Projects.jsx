import React from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import BeautyBayAcademy from '../../assets/Beauty-Bay-Academy.jpg';
import OnlineDBExtractor from '../../assets/Online-DB-Extractor.jpg';
import SiddhaThirthham from '../../assets/Siddha-Thirthham.jpg';
import KBKBusinessSolutions from '../../assets/KBK-Business-Solutions.jpg';
import WCC from '../../assets/WCC.jpg';
import CRMDashboard from '../../assets/CRM-Dashboard.jpg';
import { GiDandelionFlower } from "react-icons/gi";

const projects = [
    {
        title: "Beauty Bay Academy",
        category: "EDUCATION • WEB DESIGN",
        image: BeautyBayAcademy,
    },
    {
        title: "Online DB Extractor",
        category: "SAAS • DASHBOARD",
        image: OnlineDBExtractor,
    },
    {
        title: "Siddha Thirthham",
        category: "WEB DESIGN • BOOKING PLATFORM",
        image: SiddhaThirthham,
    },
    {
        title: "KBK Business Solutions",
        category: "CORPORATE • WEB DESIGN",
        image: KBKBusinessSolutions,
    },
    {
        title: "WCC",
        category: "SPORTS • DIGITAL EXPERIENCE",
        image: WCC,
    },
    {
        title: "CRM Dashboard",
        category: "DASHBOARD • BUSINESS PRODUCT",
        image: CRMDashboard,
    },
];

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
    className = "",
    imageClassName = "",
}) => {
    return (
        <motion.article
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{
                duration: 0.5,
                delay: index * 0.08,
            }}
            whileHover={{
                y: -3,
            }}
            className={`group relative overflow-hidden rounded-[20px] bg-white p-4 shadow-[0_4px_20px_rgba(35,45,80,0.025)] transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(35,45,80,0.08)] ${className}`}
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
    return (
        <section className="bg-[#f4f6f8] px-2.5 py-12">
            <div className="mx-auto max-w-7xl">
                {/* Desktop Layout - Unchanged structurally */}
                <div className="hidden md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-4 items-start">
                    <div className="flex flex-col gap-4">
                        <ProjectCard
                            project={projects[0]}
                            index={0}
                            className=""
                            imageClassName="h-[210px]"
                        />
                        <ProjectCard
                            project={projects[3]}
                            index={3}
                            className=""
                            imageClassName="h-[335px]"
                        />
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
                            <h1 className="flex items-center gap-2 whitespace-nowrap text-[30px] font-bold leading-none tracking-[-1.5px] text-[#111111]">
                                <span className="text-[#5870EE] text-[34px] leading-none font-light"><GiDandelionFlower /></span> 
                                <span>ALL PROJECTS</span>
                                <span className="text-[#5870EE] text-[28px] leading-none font-light"><GiDandelionFlower /></span>
                            </h1>
                        </motion.div>

                        <ProjectCard
                            project={projects[1]}
                            index={1}
                            className=""
                            imageClassName="h-[240px]"
                        />
                        <ProjectCard
                            project={projects[4]}
                            index={4}
                            className=""
                            imageClassName="h-[240px]"
                        />
                    </div>

                    <div className="flex flex-col gap-4 pt-16">
                        <ProjectCard
                            project={projects[2]}
                            index={2}
                            className=""
                            imageClassName="h-[240px]"
                        />
                        <ProjectCard
                            project={projects[5]}
                            index={5}
                            className=""
                            imageClassName="h-[240px]"
                        />
                    </div>
                </div>

                {/* Tablet Layout (2-column grid for intermediate screens) */}
                <div className="hidden sm:grid sm:grid-cols-2 md:hidden gap-4">
                    <div className="col-span-2 flex items-center justify-center py-2">
                        <h1 className="flex items-center gap-2 text-[28px] font-bold leading-none tracking-[-1.5px] text-[#111111]">
                            <span className="text-[#5870EE] text-[28px] leading-none font-light"><GiDandelionFlower /></span>
                            <span>ALL PROJECTS</span>
                            <span className="text-[#5870EE] text-[28px] leading-none font-light"><GiDandelionFlower /></span>
                        </h1>
                    </div>
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
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

                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                            className="w-full"
                            imageClassName="h-[180px]"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;