import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GiDandelionFlower } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import { fetchAboutData } from '../service/abouttab.service';

const PlusButton = ({ to }) => {
    const content = (
        <motion.div
            initial={{ opacity: 0.9 }}
            whileHover={{ scale: 1.05 }}
            transition={{
                duration: 0.25,
                ease: "easeOut",
            }}
            className="absolute bottom-5 right-5 h-10 w-10 cursor-pointer"
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

    if (to) {
        return <NavLink to={to}>{content}</NavLink>;
    }

    return content;
};


const fadeUp = {
    hidden: {
        opacity: 0,
        y: 35,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAboutData = async () => {
            try {
                const response = await fetchAboutData();

                console.log("About API Data:", response);

                setAboutData(response);
            } catch (error) {
                console.error("Failed to fetch about data:", error);
            } finally {
                setLoading(false);
            }
        };

        getAboutData();
    }, []);


    const toolkitItems = [
        // CSS
        {
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M4 3L5.5 18.5L12 20.5L18.5 18.5L20 3H4Z" fill="#264de4" />
                    <path d="M12 4.5V19L17.2 17.4L18.4 4.5H12Z" fill="#2965f1" />
                    <path d="M8.5 8H16L15.7 11.5H8.8L9 14.5H15.5L15.1 17.5L12 18.4L8.9 17.5L8.7 15H6.2L6.6 19.5L12 21L17.4 19.5L18.1 12V8H8.5Z" fill="#ffffff" />
                    <path d="M12 11.5H15.3L15.5 9.5H12V11.5ZM12 17.5V15.5H14.8L15 14H12V12H17.8L17.5 16L12 17.5Z" fill="#ffffff" />
                </svg>
            ),
            name: "CSS3"
        },
        // HTML
        {
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M4 3L5.5 18.5L12 20.5L18.5 18.5L20 3H4Z" fill="#e44d26" />
                    <path d="M12 4.5V19L17.2 17.4L18.4 4.5H12Z" fill="#f16529" />
                    <path d="M8.5 8H16L15.7 11.5H8.8L9 14.5H15.5L15.1 17.5L12 18.4L8.9 17.5L8.7 15H6.2L6.6 19.5L12 21L17.4 19.5L18.1 12V8H8.5Z" fill="#ffffff" />
                    <path d="M12 11.5H15.3L15.5 9.5H12V11.5ZM12 17.5V15.5H14.8L15 14H12V12H17.8L17.5 16L12 17.5Z" fill="#ffffff" />
                </svg>
            ),
            name: "HTML5"
        },
        // Photoshop
        {
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#001d3d" />
                    <path d="M6 6H9.5C10.8807 6 12 7.11929 12 8.5C12 9.88071 10.8807 11 9.5 11H8V18H6V6ZM8 9.5H9.5C10.0523 9.5 10.5 9.05228 10.5 8.5C10.5 7.94772 10.0523 7.5 9.5 7.5H8V9.5Z" fill="#31a8ff" />
                    <path d="M13.5 12.5C13.5 10.0147 15.5147 8 18 8C19.3807 8 20.6193 8.61929 21.4558 9.57999L20.1066 10.7842C19.5746 10.2227 18.826 9.5 18 9.5C16.3431 9.5 15 10.8431 15 12.5C15 14.1569 16.3431 15.5 18 15.5C18.826 15.5 19.5746 14.7773 20.1066 14.2158L21.4558 15.42C20.6193 16.3807 19.3807 17 18 17C15.5147 17 13.5 14.9853 13.5 12.5Z" fill="#31a8ff" />
                </svg>
            ),
            name: "Photoshop"
        },
        // Figma
        {
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M5 24C3.34315 24 2 22.6569 2 21C2 19.3431 3.34315 18 5 18H8V21C8 22.6569 6.65685 24 5 24Z" fill="#0acf83" />
                    <path d="M2 15C2 13.3431 3.34315 12 5 12H8V18H5C3.34315 18 2 16.6569 2 15Z" fill="#a259ff" />
                    <path d="M2 9C2 7.34315 3.34315 6 5 6H8V12H5C3.34315 12 2 10.6569 2 9Z" fill="#f24e1e" />
                    <path d="M8 3C8 1.34315 9.34315 0 11 0H14V6H11C9.34315 6 8 4.65685 8 3Z" fill="#ff7262" />
                    <path d="M14 0H17C18.6569 0 20 1.34315 20 3C20 4.65685 18.6569 6 17 6H14V0Z" fill="#1abcfe" />
                </svg>
            ),
            name: "Figma"
        },
        // Illustrator
        {
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#330000" />
                    <path d="M5.5 18.5L8.5 10.5L11.5 18.5H9.8L9.2 16.8H7.8L7.2 18.5H5.5ZM8 15.5H9L8.5 13.8L8 15.5Z" fill="#ff9a00" />
                    <path d="M13 11.5C13 10.1193 14.1193 9 15.5 9H19V10.5H15.5C14.9477 10.5 14.5 10.9477 14.5 11.5C14.5 12.0523 14.9477 12.5 15.5 12.5H17.5C18.8807 12.5 20 13.6193 20 15C20 16.3807 18.8807 17.5 17.5 17.5H13V16H17.5C18.0523 16 18.5 15.5523 18.5 15C18.5 14.4477 18.0523 14 17.5 14H15.5C14.1193 14 13 12.8807 13 11.5Z" fill="#ff9a00" />
                </svg>
            ),
            name: "Illustrator"
        }
    ];


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F3F4F8]">
                <p className="text-[#5870EE]">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#F3F4F8] text-[#111111] py-12 flex justify-center items-center font-sans">
            <div className="container grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-5">

                {/* Profile Image Card */}
                <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="md:col-span-3 bg-white rounded-[22px] p-3 md:p-2 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(35,45,80,0.08)] flex items-center justify-center group overflow-hidden min-h-47.5 md:h-75 transition-all duration-300"
                >
                    <div className="w-full h-full max-w-60 max-h-55 rounded-[18px] bg-linear-to-tr from-[#3b82f6] to-[#61c6e8] overflow-hidden">
                        <img
                            src={aboutData?.imageUrl}
                            alt={aboutData?.fullName}
                            className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </motion.div>

                {/* Header & Bio Section */}
                <div className="md:col-span-8 flex flex-col min-h-50">
                    <div className="w-full flex items-center justify-between mb-8">
                        <span className="text-[#5870EE] text-[42px] sm:text-[52px] leading-none font-light animate-pulse shrink-0">
                            <GiDandelionFlower />
                        </span>

                        {/* Heading */}
                        <h2 className="text-[48px] sm:text-[64px] md:text-[76px] lg:text-[88px] xl:text-[96px] font-bold tracking-[-4px] uppercase leading-[0.9] text-[#0F0F0F] whitespace-nowrap">
                            SELF-SUMMARY
                        </h2>

                        {/* Right Flower */}
                        <span className="text-[#5870EE] text-[42px] sm:text-[52px] leading-none font-light animate-pulse shrink-0">
                            <GiDandelionFlower />
                        </span>
                    </div>

                    {/* Summary Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="w-full sm:w-225 bg-white rounded-[22px] px-5 py-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(35,45,80,0.08)] flex flex-col justify-center relative overflow-hidden transition-all duration-300">

                        <div className="absolute left-6 top-0 h-9.5 w-0.5 bg-[#d9deea] group-hover:bg-[#5870EE] transition-colors duration-300" />
                        <div className="absolute left-3 top-8 h-7 w-7">
                            <svg
                                viewBox="0 0 32 32"
                                className="h-full w-full"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="
                                        M16 0
                                        C16.8 8.5 23.5 15.2 32 16
                                        C23.5 16.8 16.8 23.5 16 32
                                        C15.2 23.5 8.5 16.8 0 16
                                        C8.5 15.2 15.2 8.5 16 0Z
                                    "
                                    fill="white"
                                    stroke="#cfd5e2"
                                    strokeWidth="1.5"
                                    className="group-hover:stroke-[#5870EE] transition-colors duration-300"
                                />
                            </svg>
                        </div>

                        <h1 className="text-[21px] sm:text-[23px] font-medium tracking-[-0.6px] text-[#0F0F0F] mb-1.5 mt-16">
                            {aboutData?.fullName}
                        </h1>
                        <p className="text-[10px] sm:text-[13px] text-[#BCBCBC] font-normal leading-[1.55] max-w-none">
                            {aboutData?.bio}
                        </p>
                    </motion.div>
                </div>

                {/* Experience Card */}
                <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="md:col-span-6 bg-white rounded-[22px] p-4 md:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(35,45,80,0.08)] min-h-43.75 md:h-65 flex flex-col transition-all duration-300"
                >
                    <p className="text-[11px] uppercase tracking-wider text-[#0F0F0F] font-medium mb-4">
                        EXPERIENCE
                    </p>
                    <div className="space-y-4">
                        {aboutData?.experiences?.map((experience) => (
                            <div key={experience._id}>
                                <p className="text-xs text-[#BCBCBC] font-medium mb-1">
                                    {experience.period}
                                </p>

                                <h3 className="text-lg font-bold text-[#5B78F6]">
                                    {experience.role}
                                </h3>

                                <p className="text-xs text-gray-500 font-medium mb-3">
                                    {experience.company}
                                </p>

                                <ul className="text-xs text-[#BCBCBC] leading-relaxed">
                                    {experience.points
                                        ?.split("\n")
                                        .map((point, index) => (
                                            <li key={index}>• {point}</li>
                                        ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Education Card */}
                <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="md:col-span-6 bg-white rounded-[22px] p-4 md:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(35,45,80,0.08)] min-h-43.75 md:h-65 flex flex-col transition-all duration-300"
                >
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-[#0F0F0F] font-bold mb-6">EDUCATION</p>
                        <div className="space-y-6">
                            {aboutData?.education?.map((education) => (
                                <div key={education._id}>
                                    <h3 className="text-base font-semibold text-[#5B78F6] leading-snug">
                                        {education.degree}
                                    </h3>

                                    <p className="text-xs text-[#BCBCBC] font-regular mt-0.5">
                                        {education.institution}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Toolkit Card */}
                <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="md:col-span-3 h-55 bg-white rounded-[22px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(35,45,80,0.08)] flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all duration-300"
                >
                    {/* Scrolling Toolkit */}
                    <div className="bg-[#FBFBFC] rounded-2xl p-4 h-25 border border-gray-100 overflow-hidden relative flex items-center group-hover:border-[#5870EE]/30 transition-colors duration-300">

                        <motion.div
                            animate={{
                                x: ["0%", "-50%"],
                            }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="flex w-max"
                        >
                            {/* FIRST SET */}
                            <div className="flex items-center gap-3 pr-3 shrink-0">
                                {toolkitItems.map((item, index) => (
                                    <div
                                        key={`set1-${index}`}
                                        className="w-15 h-15 shrink-0 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow duration-300"
                                    >
                                        {item.icon}
                                    </div>
                                ))}
                            </div>

                            {/* SECOND IDENTICAL SET */}
                            <div className="flex items-center gap-3 pr-3 shrink-0">
                                {toolkitItems.map((item, index) => (
                                    <div
                                        key={`set2-${index}`}
                                        className="w-15 h-15 shrink-0 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow duration-300"
                                    >
                                        {item.icon}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Content */}
                    <div>
                        <p className="text-[12px] uppercase tracking-widest text-[#BCBCBC] font-medium mb-0.5">
                            HAVE AN EYE
                        </p>

                        <div className="flex items-center justify-between">
                            <h3 className="text-[20px] font-medium text-[#0F0F0F] tracking-tight group-hover:text-[#5870EE] transition-colors duration-300">
                                MY TOOLKIT
                            </h3>

                            <PlusButton />
                        </div>
                    </div>
                </motion.div>

                {/* Let's Work Together Card */}
                <motion.section
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    transition={{
                        delay: 0.4,
                    }}
                    whileHover={{
                        y: -4,
                    }}
                    className="md:col-span-6 h-55 group relative flex items-center overflow-hidden rounded-[22px] bg-white p-5 shadow-[0_15px_50px_rgba(35,45,80,0.04)] hover:shadow-[0_20px_40px_rgba(88,112,238,0.12)] transition-all duration-300 cursor-pointer"
                >
                    <NavLink to="/contact" className="absolute inset-0 z-0" aria-label="Go to Contact Page" />


                    <div className="absolute left-6 top-0 h-9.5 w-0.5 bg-[#d9deea] group-hover:bg-[#5870EE] transition-colors duration-300" />
                    <div className="absolute left-3 top-8 h-7 w-7">
                        <svg
                            viewBox="0 0 32 32"
                            className="h-full w-full"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="
                                    M16 0
                                    C16.8 8.5 23.5 15.2 32 16
                                    C23.5 16.8 16.8 23.5 16 32
                                    C15.2 23.5 8.5 16.8 0 16
                                    C8.5 15.2 15.2 8.5 16 0Z
                                "
                                fill="white"
                                stroke="#cfd5e2"
                                strokeWidth="1.5"
                                className="group-hover:stroke-[#5870EE] transition-colors duration-300"
                            />
                        </svg>
                    </div>

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -15,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.6,
                        }}
                        className="relative z-10"
                    >
                        <p className="text-[35px] font-medium leading-[1.1] tracking-[-1px] text-[#151619] pt-16">
                            Let's
                            <br />
                            work{" "}
                            <span className="text-[#5b78ff] group-hover:brightness-110 transition-all">
                                together.
                            </span>
                        </p>
                    </motion.div>
                    <PlusButton to="/contact" />

                </motion.section>



                {/* Credentials / More About Me Card */}
                <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="md:col-span-3 h-55 bg-white rounded-[22px] p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(35,45,80,0.08)] flex flex-col justify-between group cursor-pointer relative transition-all duration-300"
                >
                    <div className="flex justify-center items-center h-17">
                        <span className="font-serif italic text-[20px] text-[#BCBCBC] font-light tracking-wider group-hover:text-[#5870EE] transition-colors duration-300">
                            Rakesh P.
                        </span>
                    </div>

                    <div>
                        <p className="text-[12px] uppercase tracking-widest text-[#BCBCBC] font-medium mb-0.5">
                            MORE ABOUT ME
                        </p>
                        <div className="flex items-center justify-between">
                            <h3 className="text-[20px] font-medium text-[#0F0F0F] tracking-tight group-hover:text-[#5870EE] transition-colors duration-300">
                                Credentials
                            </h3>
                            <PlusButton />
                        </div>
                    </div>
                </motion.div>

            </div>
        </div >
    );
};