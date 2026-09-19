import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { fetchServices } from '../service/servicesoffering.service';
import { GiDandelionFlower } from 'react-icons/gi';
import { FaCss3Alt } from 'react-icons/fa6';
import { TiHtml5 } from 'react-icons/ti';
import { TbBrandAdobeIllustrator, TbBrandAdobePhotoshop } from 'react-icons/tb';
import { PiFigmaLogoDuotone } from 'react-icons/pi';

const ServicesOffering = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchServices();
                // Assuming the API returns either an array directly or an object containing the array
                setServices(Array.isArray(data) ? data : data.services || []);
            } catch (error) {
                console.error('Failed to load services:', error);
            } finally {
                setLoading(false);
            }
        };

        loadServices();
    }, []);

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

    return (
        <section className="bg-[#F8F9FA] py-10">
            <div className="container">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start space-y-2">
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -25,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.2,
                        }}
                        transition={{
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="order-2 rounded-3xl bg-white px-7 py-7 lg:order-1 lg:col-span-4 lg:min-h-130 lg:px-8 lg:py-8"
                    >
                        <div className="flex h-full flex-col justify-between space-y-8">
                            {loading ? (
                                <div className="text-center text-sm text-gray-400 py-10">Loading services...</div>
                            ) : services.length === 0 ? (
                                <div className="text-center text-sm text-gray-400 py-10">No services available</div>
                            ) : (
                                services.map((service, idx) => (
                                    <motion.div
                                        key={service.num || idx}
                                        initial={{
                                            opacity: 0,
                                            y: 15,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                        }}
                                        transition={{
                                            delay: idx * 0.1,
                                            duration: 0.5,
                                        }}
                                        whileHover={{
                                            x: 4,
                                        }}
                                        className="group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className="mt-1 w-4 shrink-0 text-[10px] font-medium tracking-wide text-gray-600">
                                                {service.num || `0${idx + 1}`}
                                            </span>

                                            <div className="min-w-0">
                                                <h3 className="text-[18px] font-medium leading-[1.35] tracking-[-0.2px] text-[#191C1D]">
                                                    {service.title}
                                                </h3>

                                                <p className="mt-1 max-w-52.5 text-[13px] font-normal leading-[1.6] text-[#5F5E5E]">
                                                    {service.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>

                    <div className="order-1 lg:order-2 lg:col-span-8">
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                duration: 0.7,
                            }}
                            className="mb-8 flex items-center justify-center gap-1.5 sm:gap-2"
                        >
                            <span className="text-[#5870EE] text-[42px] sm:text-[52px] leading-none font-light animate-pulse"><GiDandelionFlower /></span>
                            <h2 className="whitespace-nowrap  leading-none ext-[88px] xl:text-[80px] font-bold tracking-[-4px]">
                                MY OFFERINGS
                            </h2>

                            <span className="text-[#5870EE] text-[42px] sm:text-[52px] leading-none font-light animate-pulse"><GiDandelionFlower /></span>
                        </motion.div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 25,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{
                                once: true,
                                amount: 0.2,
                            }}
                            transition={{
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="grid grid-cols-1 gap-4 rounded-3xl bg-white p-5 sm:grid-cols-2 sm:p-8"
                        >
                            {loading ? (
                                <div className="col-span-2 text-center text-sm text-gray-400 py-10">Loading grid items...</div>
                            ) : services.map((card, idx) => (
                                <motion.div
                                    key={card.title || idx}
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        delay: idx * 0.08,
                                        duration: 0.5,
                                    }}
                                    whileHover={{
                                        y: -5,
                                    }}
                                    className="min-h-48 rounded-[20px] bg-gray-100 p-6 transition-all duration-300 hover:bg-[#F9F9FC] hover:shadow-[0_12px_35px_rgba(35,45,80,0.06)]"
                                >
                                    <h4 className="text-[10px] font-medium uppercase leading-normal tracking-wide text-[#191C1D] sm:text-[15px]">
                                        {card.title}
                                    </h4>

                                    <p className="mt-2 max-w-57.5 text-[10px] font-normal leading-[1.7] text-[#5F5E5E] sm:text-[13px]">
                                        {card.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Row: 3 Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
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
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="md:col-span-3 h-55 bg-white rounded-[22px] p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(35,45,80,0.08)] flex flex-col justify-between group cursor-pointer relative transition-all duration-300"
                    >
                        <div className="flex justify-center items-center h-17">
                            <span className="font-serif italic text-[20px] text-gray-600 font-light tracking-wider group-hover:text-[#5870EE] transition-colors duration-300">
                                Rakesh P.
                            </span>
                        </div>

                        <div>
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
            </div>
        </section>
    );
};

export default ServicesOffering;