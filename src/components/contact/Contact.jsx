import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { FaGlobe, FaTwitter, FaInstagram } from "react-icons/fa";
import { BsGlobe, BsTwitterX } from "react-icons/bs";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const Contact = () => {
    const [copiedPhone, setCopiedPhone] = useState(null);

    const handlePhoneClick = (phoneNumber) => {
        const cleanedNumber = phoneNumber.replace(/\s+/g, "");
        window.location.href = `tel:${cleanedNumber}`;
    };

    const handlePhoneCopy = (e, phoneNumber) => {
        e.stopPropagation();
        navigator.clipboard.writeText(phoneNumber);
        setCopiedPhone(phoneNumber);
        setTimeout(() => setCopiedPhone(null), 2000);
    };

    return (
        <section className="w-full bg-[#f4f6f8] px-4 py-12 md:px-10 lg:px-16 flex items-center justify-center">
            <div className="mx-auto w-full max-w-300 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* Left Side: Contact Info & Socials */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-5 flex flex-col gap-8 pt-2"
                >
                    {/* Contact Info Header */}
                    <div>
                        <h4 className="text-[12px] font-semibold uppercase tracking-[1.5px] text-[#0F0F0F] mb-6">
                            Contact Info
                        </h4>

                        <div className="flex flex-col gap-8 mb-4">
                            {/* Mail */}
                            <div className="flex items-start gap-4 group">
                                <a
                                    href="mailto:rakeshparvathneni26@gmail.com"
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_4px_20px_rgba(35,45,80,0.03)] text-[#5B78F6] transition-transform duration-300 group-hover:scale-105"
                                >
                                    <HiOutlineMail className="text-2xl" />
                                </a>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-semibold uppercase tracking-[1px] text-[#BCBCBC]">
                                        Mail Us
                                    </p>
                                    <a href="mailto:rakeshparvathneni26@gmail.com" className="text-[15px] font-medium text-gray-600 hover:text-[#5B78F6] transition-colors">
                                        rakeshparvathneni26@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Contact Us (Combined Numbers) */}
                            <div className="flex items-start gap-4 group mb-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_4px_20px_rgba(35,45,80,0.03)] text-[#5B78F6]">
                                    <HiOutlinePhone className="text-2xl" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <p className="text-[11px] font-semibold uppercase tracking-[1px] text-[#8c92a4]">
                                        Contact Us
                                    </p>

                                    {/* First Phone Number */}
                                    <div className="flex items-center justify-between">
                                        <span
                                            onClick={() => handlePhoneClick("+91 96406 57114")}
                                            className="text-[15px] font-medium text-gray-600 hover:text-[#5B78F6] transition-colors cursor-pointer"
                                        >
                                            +91 96406 57114
                                        </span>

                                    </div>

                                    {/* Second Phone Number */}
                                    <div className="flex items-center justify-between">
                                        <span
                                            onClick={() => handlePhoneClick("+91 81860 54115")}
                                            className="text-[15px] font-medium text-gray-600 hover:text-[#5B78F6] transition-colors cursor-pointer"
                                        >
                                            +91 81860 54115
                                        </span>

                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4 group">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_4px_20px_rgba(35,45,80,0.03)] text-[#5B78F6]">
                                    <HiOutlineLocationMarker className="text-2xl" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[11px] font-semibold uppercase tracking-[1px] text-[#8c92a4]">
                                        Location
                                    </p>
                                    <p className="text-[15px] font-medium text-gray-600 leading-relaxed">
                                        Hyderabad,<br />Telangana, India.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Info */}
                    <div>
                        <h4 className="text-[12px] font-semibold uppercase tracking-[1.5px] text-[#0F0F0F] mb-4">
                            Social Info
                        </h4>
                        <div className="flex items-center gap-3 space-x-2">
                            <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(35,45,80,0.03)] text-[#5B78F6] hover:bg-[#5B78F6] hover:text-white transition-all duration-300">
                                <BsGlobe className="text-xl" />
                            </a>
                            <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(35,45,80,0.03)] text-[#5B78F6] hover:bg-[#5B78F6] hover:text-white transition-all duration-300">
                                <BsTwitterX  className="text-xl" />
                            </a>
                            <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(35,45,80,0.03)] text-[#5B78F6] hover:bg-[#5B78F6] hover:text-white transition-all duration-300">
                                <FaInstagram className="text-xl" />
                            </a>
                        </div>
                    </div>
                </motion.div>





                {/* Right Side: Form Card */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="lg:col-span-7 bg-white rounded-4xl p-6 shadow-[0_10px_40px_rgba(35,45,80,0.04)] relative overflow-hidden"
                >
                    {/* Decorative Sparkle */}
                    {/* <div className="absolute top-8 right-8 text-[#5B78F6] opacity-60 text-2xl">
                        ✦
                    </div> */}


                    <div className="absolute right-11 top-0 h-9.5 w-0.5 bg-[#5870EE] group-hover:bg-[#5870EE] transition-colors duration-300" />
                    <div className="absolute right-8 top-8 h-7 w-7 ">
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
                                        C8.5 15.2 15.2 8.5 16 0Z
                                    "
                                fill="white"
                                stroke="#5870EE"
                                strokeWidth="1.5"
                                className="group-hover:stroke-[#5870EE] transition-colors duration-300"
                            />
                        </svg>
                    </div>


                    <h2 className="text-[32px] md:text-[42px] font-medium tracking-[-1.5px] text-[#171719] mb-4">
                        Let’s work <span className="text-[#5B78F6]">together.</span>
                    </h2>

                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                        <div>
                            <input
                                type="text"
                                placeholder="Name *"
                                className="w-full bg-[#FBFBFC] border border-transparent focus:border-[#5B78F6] rounded-2xl px-5 py-3 text-[15px] text-[#171719] outline-none transition-all placeholder:text-[#757575]"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email *"
                                className="w-full bg-[#FBFBFC] border border-transparent focus:border-[#5B78F6] rounded-2xl px-5 py-3 text-[15px] text-[#171719] outline-none transition-all placeholder:text-[#757575]"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Your Subject *"
                                className="w-full bg-[#FBFBFC] border border-transparent focus:border-[#5B78F6] rounded-2xl px-5 py-3 text-[15px] text-[#171719] outline-none transition-all placeholder:text-[#757575]"
                                required
                            />
                        </div>

                        <div>
                            <textarea
                                rows={4}
                                placeholder="Your Message *"
                                className="w-full bg-[#FBFBFC] border border-transparent focus:border-[#5B78F6] rounded-2xl px-5 py-3 text-[15px] text-[#171719] outline-none transition-all placeholder:text-[#757575] resize-none"
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-[#222225] text-white font-medium py-3 rounded-2xl transition-colors hover:bg-[#5B78F6] shadow-lg mt-1 cursor-pointer"
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
};

export default Contact;