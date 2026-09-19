import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GiDandelionFlower } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import { fetchAboutData } from '../service/abouttab.service';
import { TbBrandAdobeIllustrator, TbBrandAdobePhotoshop } from 'react-icons/tb';
import { TiHtml5 } from 'react-icons/ti';
import { FaCss3Alt } from 'react-icons/fa6';
import signature from "../../assets/signature.webp";

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
                // console.log("About API Data:", response);
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
        {
            icon: (
                <FaCss3Alt className="w-8 h-8 text-[#1572B6]" />
            ),
            name: "CSS3"
        },
        {
            icon: (
                <TiHtml5 className="w-8 h-8 text-[#E34F26]" />
            ),
            name: "HTML5"
        },
        {
            icon: (
                <TbBrandAdobePhotoshop className="w-8 h-8 text-[#001E36]" />
            ),
            name: "Photoshop"
        },
        {
            icon: (
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 38 57"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Top Left - Red */}
                    <path
                        d="M0 9.5C0 4.25 4.25 0 9.5 0H19V19H9.5C4.25 19 0 14.75 0 9.5Z"
                        fill="#F24E1E"
                    />

                    {/* Top Right - Orange/Coral */}
                    <path
                        d="M19 0H28.5C33.75 0 38 4.25 38 9.5C38 14.75 33.75 19 28.5 19H19V0Z"
                        fill="#FF7262"
                    />

                    {/* Middle Left - Purple */}
                    <path
                        d="M0 28.5C0 23.25 4.25 19 9.5 19H19V38H9.5C4.25 38 0 33.75 0 28.5Z"
                        fill="#A259FF"
                    />

                    {/* Middle Right - Blue */}
                    <path
                        d="M19 19H28.5C33.75 19 38 23.25 38 28.5C38 33.75 33.75 38 28.5 38C23.25 38 19 33.75 19 28.5V19Z"
                        fill="#1ABCFE"
                    />

                    {/* Bottom - Green */}
                    <path
                        d="M0 47.5C0 42.25 4.25 38 9.5 38H19V47.5C19 52.75 14.75 57 9.5 57C4.25 57 0 52.75 0 47.5Z"
                        fill="#0ACF83"
                    />
                </svg>
            ),
            name: "Figma"
        },
        {
            icon: (
                <TbBrandAdobeIllustrator className="w-8 h-8 text-[#FF9A00]" />
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
                <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="md:col-span-3 bg-white rounded-[22px] p-3 md:p-2 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(35,45,80,0.08)] flex items-center justify-center group overflow-hidden min-h-47.5 md:h-75 transition-all duration-300"
                >
                    <div className="w-full h-full max-w-60 max-h-70 rounded-[18px] bg-linear-to-tr from-[#3b82f6] to-[#61c6e8] overflow-hidden">
                        <img
                            src={aboutData?.imageUrl}
                            alt={aboutData?.fullName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </motion.div>

                <div className="md:col-span-8 flex flex-col min-h-50">
                    <div className="w-full flex items-center justify-between mb-8">
                        <span className="text-[#5870EE] text-[42px] sm:text-[52px] leading-none font-light animate-pulse shrink-0">
                            <GiDandelionFlower />
                        </span>

                        <h2 className="text-[48px] sm:text-[64px] md:text-[76px] lg:text-[88px] xl:text-[96px] font-bold tracking-[-4px] uppercase leading-[0.9] text-[#0F0F0F] whitespace-nowrap">
                            SELF-SUMMARY
                        </h2>

                        <span className="text-[#5870EE] text-[42px] sm:text-[52px] leading-none font-light animate-pulse shrink-0">
                            <GiDandelionFlower />
                        </span>
                    </div>


                    <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="w-full sm:w-225 bg-white rounded-[22px] px-5 py-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(35,45,80,0.08)] flex flex-col justify-center relative overflow-hidden transition-all duration-300">

                        <div className="absolute left-8 top-0 h-13.75 w-0.5 bg-[#d9deea] pointer-events-none" />

                        <div className="absolute left-4.5 top-10 h-8 w-8 pointer-events-none">
                            <motion.svg
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                viewBox="0 0 32 32"
                                className="h-full w-full"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16 0 C16.8 8.5 23.5 15.2 32 16 C23.5 16.8 16.8 23.5 16 32 C15.2 23.5 8.5 16.8 0 16 C8.5 15.2 15.2 8.5 16 0Z"
                                    fill="white"
                                    stroke="#cfd5e2"
                                    strokeWidth="1.5"
                                />
                            </motion.svg>
                        </div>


                        <h1 className="text-[21px] sm:text-[23px] font-medium tracking-[-0.6px] text-[#0F0F0F] mb-1.5 mt-16">
                            {aboutData?.fullName}
                        </h1>

                        <p className="text-[10px] sm:text-[13px] text-gray-600 font-normal leading-[1.55] max-w-none">
                            {aboutData?.bio}
                        </p>
                    </motion.div>
                </div>


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
                                <p className="text-xs text-gray-600 font-medium mb-1">
                                    {experience.period}
                                </p>

                                <h3 className="text-lg font-bold text-[#5B78F6]">
                                    {experience.role}
                                </h3>

                                <p className="text-xs text-gray-500 font-medium mb-3">
                                    {experience.company}
                                </p>

                                <ul className="text-xs text-gray-600 leading-relaxed">
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

                                    <p className="text-xs text-gray-600 font-regular mt-0.5">
                                        {education.institution}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>


                <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="md:col-span-3 h-55 bg-white rounded-[22px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(35,45,80,0.08)] flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all duration-300"
                >

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


                    <div>
                        <p className="text-[12px] uppercase tracking-widest text-gray-600 font-medium mb-0.5">
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


                    <div className="absolute left-8 top-0 h-13.75 w-0.5 bg-[#d9deea] pointer-events-none" />

                    <div className="absolute left-4.5 top-10 h-8 w-8 pointer-events-none">
                        <motion.svg
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            viewBox="0 0 32 32"
                            className="h-full w-full"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16 0 C16.8 8.5 23.5 15.2 32 16 C23.5 16.8 16.8 23.5 16 32 C15.2 23.5 8.5 16.8 0 16 C8.5 15.2 15.2 8.5 16 0Z"
                                fill="white"
                                stroke="#cfd5e2"
                                strokeWidth="1.5"
                            />
                        </motion.svg>
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


                <motion.div
                    whileHover={{
                        y: -6,
                        scale: 1.01,
                        transition: { duration: 0.25 },
                    }}
                    transition={{ duration: 0.25 }}
                    className="md:col-span-3 h-55 bg-white rounded-[22px] p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(35,45,80,0.08)] flex flex-col justify-between group cursor-pointer relative transition-all duration-300"
                >
                    {/* Signature */}
                    <div className="flex justify-center items-center">
                        <motion.div
                            animate={{
                                rotate: [0, 3, -3, 0],
                                y: [0, -4, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <img
                                src={signature}
                                alt="Signature"
                                className="block w-36 sm:w-70 h-auto object-contain opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                            />
                        </motion.div>
                    </div>

                    <div className="mt-1">
                        <p className="text-[12px] uppercase tracking-widest text-gray-600 font-medium mb-0.5">
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