import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { FaInstagram } from "react-icons/fa";
import { BsGlobe, BsTwitterX } from "react-icons/bs";
import emailjs from "@emailjs/browser";
import { getContactService } from "../service/contactservice";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const Contact = () => {
    const [contactData, setContactData] = useState({
        email: "rakeshparvathneni26@gmail.com",
        phone1: "+91 96406 57114",
        phone2: "+91 81860 54115",
        city: "Hyderabad",
        state: "Telangana, India.",
        websiteUrl: "#",
        twitterUrl: "#",
        instagramUrl: "#"
    });

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ success: false, message: "" });

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const data = await getContactService();
                if (data) {
                    setContactData({
                        email: data.email || "rakeshparvathneni26@gmail.com",
                        phone1: data.phone1 || "+91 96406 57114",
                        phone2: data.phone2 || "+91 81860 54115",
                        city: data.city || "Hyderabad",
                        state: data.state || "Telangana, India.",
                        websiteUrl: data.websiteUrl || "#",
                        twitterUrl: data.twitterUrl || "#",
                        instagramUrl: data.instagramUrl || "#"
                    });
                }
            } catch (error) {
                console.error("Failed to fetch contact details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContactData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoneClick = (phoneNumber) => {
        const cleanedNumber = phoneNumber.replace(/\s+/g, "");
        window.location.href = `tel:${cleanedNumber}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ success: false, message: "" });

        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            title: formData.subject,
            message: formData.message,
            to_email: contactData.email
        };

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            setSubmitStatus({
                success: true,
                message: "Your message has been sent successfully!"
            });
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error("EmailJS Error:", error);
            setSubmitStatus({
                success: false,
                message: "Failed to send message. Please try again later."
            });
        } finally {
            setIsSubmitting(false);
        }
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
                    <div>
                        <h4 className="text-[12px] font-semibold uppercase tracking-[1.5px] text-[#0F0F0F] mb-6">
                            Contact Info
                        </h4>

                        <div className="flex flex-col gap-8 mb-4">
                            {/* Mail */}
                            <div className="flex items-start gap-4 group">
                                <a
                                    href={`mailto:${contactData.email}`}
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_4px_20px_rgba(35,45,80,0.03)] text-[#5B78F6] transition-transform duration-300 group-hover:scale-105"
                                >
                                    <HiOutlineMail className="text-2xl" />
                                </a>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-semibold uppercase tracking-[1px] text-[#BCBCBC]">
                                        Mail Us
                                    </p>
                                    <a href={`mailto:${contactData.email}`} className="text-[15px] font-medium text-gray-600 hover:text-[#5B78F6] transition-colors">
                                        {contactData.email}
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

                                    <div className="flex items-center justify-between">
                                        <span
                                            onClick={() => handlePhoneClick(contactData.phone1)}
                                            className="text-[15px] font-medium text-gray-600 hover:text-[#5B78F6] transition-colors cursor-pointer"
                                        >
                                            {contactData.phone1}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span
                                            onClick={() => handlePhoneClick(contactData.phone2)}
                                            className="text-[15px] font-medium text-gray-600 hover:text-[#5B78F6] transition-colors cursor-pointer"
                                        >
                                            {contactData.phone2}
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
                                        {contactData.city},<br />{contactData.state}
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
                            <a href={contactData.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(35,45,80,0.03)] text-[#5B78F6] hover:bg-[#5B78F6] hover:text-white transition-all duration-300">
                                <BsGlobe className="text-xl" />
                            </a>
                            <a href={contactData.twitterUrl} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(35,45,80,0.03)] text-[#5B78F6] hover:bg-[#5B78F6] hover:text-white transition-all duration-300">
                                <BsTwitterX className="text-xl" />
                            </a>
                            <a href={contactData.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(35,45,80,0.03)] text-[#5B78F6] hover:bg-[#5B78F6] hover:text-white transition-all duration-300">
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
                    <div className="absolute right-11 top-0 h-9.5 w-0.5 bg-[#5870EE] group-hover:bg-[#5870EE] transition-colors duration-300" />
                    <div className="absolute right-7 top-8 h-8 w-8 pointer-events-none">
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

                    <h2 className="text-[32px] md:text-[42px] font-medium tracking-[-1.5px] text-[#171719] mb-4">
                        Let’s work <span className="text-[#5B78F6]">together.</span>
                    </h2>

                    {submitStatus.message && (
                        <div className={`p-3 mb-4 rounded-xl text-sm ${submitStatus.success ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {submitStatus.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Name *"
                                className="w-full bg-[#FBFBFC] border border-transparent focus:border-[#5B78F6] rounded-2xl px-5 py-3 text-[15px] text-[#171719] outline-none transition-all placeholder:text-[#757575]"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email *"
                                className="w-full bg-[#FBFBFC] border border-transparent focus:border-[#5B78F6] rounded-2xl px-5 py-3 text-[15px] text-[#171719] outline-none transition-all placeholder:text-[#757575]"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="Your Subject *"
                                className="w-full bg-[#FBFBFC] border border-transparent focus:border-[#5B78F6] rounded-2xl px-5 py-3 text-[15px] text-[#171719] outline-none transition-all placeholder:text-[#757575]"
                                required
                            />
                        </div>

                        <div>
                            <textarea
                                rows={4}
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Your Message *"
                                className="w-full bg-[#FBFBFC] border border-transparent focus:border-[#5B78F6] rounded-2xl px-5 py-3 text-[15px] text-[#171719] outline-none transition-all placeholder:text-[#757575] resize-none"
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#222225] text-white font-medium py-3 rounded-2xl transition-colors hover:bg-[#5B78F6] shadow-lg mt-1 cursor-pointer disabled:opacity-50"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </motion.button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
};

export default Contact;