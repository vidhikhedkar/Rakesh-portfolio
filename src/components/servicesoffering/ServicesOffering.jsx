import React, { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { SiFigma } from 'react-icons/si';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { fetchServices } from '../service/servicesoffering.service';

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
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M4 3L5.5 18.5L12 20.5L18.5 18.5L20 3H4Z" fill="#264de4" />
                    <path d="M12 4.5V19L17.2 17.4L18.4 4.5H12Z" fill="#2965f1" />
                    <path d="M8.5 8H16L15.7 11.5H8.8L9 14.5H15.5L15.1 17.5L12 18.4L8.9 17.5L8.7 15H6.2L6.6 19.5L12 21L17.4 19.5L18.1 12V8H8.5Z" fill="#ffffff" />
                    <path d="M12 11.5H15.3L15.5 9.5H12V11.5ZM12 17.5V15.5H14.8L15 14H12V12H17.8L17.5 16L12 17.5Z" fill="#ffffff" />
                </svg>
            ),
            name: "CSS3"
        },
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
                                            <span className="mt-1 w-4 shrink-0 text-[10px] font-medium tracking-wide text-[#737688]">
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
                            <motion.span
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.08, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="text-[32px] font-light leading-none text-[#5B78FF] sm:text-[42px]"
                            >
                                ✻
                            </motion.span>

                            <h2 className="whitespace-nowrap text-[38px] font-medium leading-none tracking-[-2px] text-[#111111] sm:text-[48px] lg:text-[54px]">
                                MY OFFERINGS
                            </h2>

                            <motion.span
                                animate={{
                                    rotate: [0, -10, 10, 0],
                                    scale: [1, 1.08, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="text-[32px] font-light leading-none text-[#5B78FF] sm:text-[42px]"
                            >
                                ✻
                            </motion.span>
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
            </div>
        </section>
    );
};

export default ServicesOffering;