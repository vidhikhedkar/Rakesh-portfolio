import React from 'react';
import { motion } from 'framer-motion';

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

const ProjectDetails = () => {
    return (
        <div className="bg-[#F7F9FC] text-[#191C1D] font-sans selection:bg-[#191C1D] selection:text-white">

            {/* 1. Header Section */}
            <motion.header
                className="max-w-7xl mx-auto px-6 pt-12 pb-8 text-center"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
            >
                <span className="text-xs font-semibold tracking-widest text-[#1A65FF] uppercase">
                    SaaS Product • UI/UX Design
                </span>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mt-3 mb-4">
                    ONLINE DB EXTRACTOR
                </h1>

                <p className="text-sm text-[#434656] max-w-xl mx-auto mb-8">
                    Designing a clearer way to extract, manage and understand business data.
                </p>

                {/* Metadata Badges */}
                <motion.div
                    className="flex flex-wrap justify-center gap-8 sm:gap-16 py-4 text-xs tracking-wider uppercase text-[#434656]"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={fadeUp}>
                        <p className="font-bold text-[#191C1D] mb-1">Role</p>
                        <p>UI/UX Designer</p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <p className="font-bold text-[#191C1D] mb-1">Category</p>
                        <p>SaaS Product Design</p>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                        <p className="font-bold text-[#191C1D] mb-1">Year</p>
                        <p>2026</p>
                    </motion.div>
                </motion.div>
            </motion.header>


            {/* 2. Hero Mockup Section */}
            <motion.div
                className="w-full px-0"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <img
                    src="https://cdn.dribbble.com/userupload/16374797/file/original-bb5e9012b13464132574901859866139.png"
                    alt="Meditation App"
                    className="w-full h-full object-cover"
                />
            </motion.div>


            {/* Section 3 */}
            <motion.section
                className="container py-10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-sm justify-center">

                    <motion.div className="space-y-2" variants={fadeUp}>
                        <h4 className="font-bold text-[#434656] uppercase tracking-wider text-xs">
                            Project
                        </h4>
                        <p className="font-medium text-[#191C1D]">
                            Online DB Extractor
                        </p>
                    </motion.div>

                    <motion.div className="space-y-2" variants={fadeUp}>
                        <h4 className="font-bold text-[#434656] uppercase tracking-wider text-xs">
                            Role
                        </h4>
                        <p className="font-medium text-[#191C1D]">
                            Lead UI/UX Designer
                        </p>
                    </motion.div>

                    <motion.div className="space-y-2" variants={fadeUp}>
                        <h4 className="font-bold text-[#434656] uppercase tracking-wider text-xs">
                            Platform
                        </h4>
                        <p className="font-medium text-[#191C1D]">
                            Web Application
                        </p>
                    </motion.div>

                    <motion.div className="space-y-2" variants={fadeUp}>
                        <h4 className="font-bold text-[#434656] uppercase tracking-wider text-xs">
                            Tools
                        </h4>
                        <p className="font-medium text-[#191C1D]">
                            Figma, FigJam
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
                            UX Research, UI Design, Design System
                        </p>
                    </motion.div>

                </div>
            </motion.section>


            {/* Section 4 */}
            <section className="w-full py-8 bg-[#F7F9FC]">

                <div className="container">

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >

                        {/* Brand */}
                        <motion.div
                            className="h-72 sm:h-96 bg-neutral-200 rounded-3xl overflow-hidden shadow-md flex items-center justify-center relative group"
                            variants={scaleIn}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.25 }}
                        >
                            <span className="text-[#434656] font-medium text-sm transition-opacity duration-300 group-hover:opacity-75">
                                Brand & Typography Showcase
                            </span>
                        </motion.div>

                        {/* Editorial */}
                        <motion.div
                            className="h-72 sm:h-96 bg-[#191C1D] rounded-3xl overflow-hidden shadow-md flex items-center justify-center relative group"
                            variants={scaleIn}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.25 }}
                        >
                            <span className="text-neutral-400 font-medium text-sm transition-opacity duration-300 group-hover:opacity-75">
                                Editorial Mockup Showcase
                            </span>
                        </motion.div>

                    </motion.div>


                    {/* THE PRODUCT */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                        {/* LEFT CONTENT */}
                        <motion.div
                            className="lg:col-span-5 space-y-5 lg:pt-4"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#191C1D]">
                                THE PRODUCT
                            </h2>

                            <p className="text-[#434656] text-sm sm:text-base leading-relaxed max-w-xl">
                                Online DB Extractor is an enterprise-grade SaaS platform
                                designed to bridge the gap between complex raw databases
                                and actionable business insights. It provides a structured,
                                secure, and intuitive ecosystem for data analysts and
                                engineers to manage extraction workflows without writing code.
                            </p>

                            <p className="text-[#434656] text-xs sm:text-sm leading-relaxed max-w-xl">
                                The project encompassed the complete redesign of the platform,
                                from the initial marketing website and onboarding flow to the
                                core extraction engine and administrative dashboards.
                            </p>

                        </motion.div>


                        {/* RIGHT — PLATFORM ECOSYSTEM */}
                        <motion.div
                            className="lg:col-span-7 bg-white border border-[#C3C5D9]/30 rounded-2xl p-6 sm:p-8"
                            variants={scaleIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >

                            <h3 className="text-sm sm:text-[15px] font-bold text-[#191C1D] mb-7 text-center">
                                Platform Ecosystem Map
                            </h3>

                            <div className="w-full max-w-95 mx-auto flex flex-col items-center">

                                <motion.div
                                    className="w-35 h-17 bg-[#EDEEEF] border border-[#C3C5D9] rounded-lg flex flex-col items-center justify-center text-center"
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <div className="text-[#1A65FF] text-sm leading-none mb-1">
                                        🌐
                                    </div>

                                    <div className="text-[13px] font-bold text-[#191C1D] leading-tight">
                                        Marketing
                                    </div>

                                    <p className="text-[10px] text-[#434656] leading-tight mt-0.5">
                                        Landing, Pricing
                                    </p>
                                </motion.div>


                                <div className="w-20px h-11 border-l border-dashed border-[#C3C5D9]/50"></div>


                                <motion.div
                                    className="w-35 h-17 bg-[#EDEEEF] border border-[#C3C5D9]/30 rounded-lg flex flex-col items-center justify-center text-center"
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <div className="text-[#1A65FF] text-sm leading-none mb-1">
                                        ↪
                                    </div>

                                    <div className="text-[13px] font-bold text-[#191C1D] leading-tight">
                                        Auth &amp; Onboarding
                                    </div>

                                    <p className="text-[10px] text-[#434656] leading-tight mt-0.5">
                                        Signup, Organization Setup
                                    </p>
                                </motion.div>


                                <div className="w-20px h-11 border-l border-dashed border-[#D5D9E2]"></div>


                                <div className="relative w-full flex justify-center gap-5">

                                    <div className="absolute top-1/2 left-[calc(50%-20px)] right-[calc(50%-20px)] h-px bg-[#D5D9E2] -translate-y-1/2 z-0"></div>

                                    <motion.div
                                        className="relative z-10 w-35 h-17 bg-white border border-[#1A65FF]/20 rounded-lg flex flex-col items-center justify-center text-center"
                                        whileHover={{ scale: 1.03 }}
                                    >
                                        <div className="text-[#1A65FF] text-sm leading-none mb-1">
                                            ⚙
                                        </div>

                                        <div className="text-[13px] font-bold text-[#191C1D] leading-tight">
                                            Core Engine
                                        </div>

                                        <p className="text-[10px] text-[#434656] leading-tight mt-0.5">
                                            Connections, Workflows
                                        </p>
                                    </motion.div>


                                    <motion.div
                                        className="relative z-10 w-35 h-17 bg-white border border-[#1769FF]/20 rounded-lg flex flex-col items-center justify-center text-center"
                                        whileHover={{ scale: 1.03 }}
                                    >
                                        <div className="text-[#1769FF] text-sm leading-none mb-1">
                                            ▦
                                        </div>

                                        <div className="text-[13px] font-bold text-[#191C1D] leading-tight">
                                            Dashboard
                                        </div>

                                        <p className="text-[10px] text-[#434656] leading-tight mt-0.5">
                                            Analytics, Monitoring
                                        </p>
                                    </motion.div>

                                </div>


                                <div className="w-px h-11 border-l border-dashed border-[#D5D9E2]"></div>


                                <div className="relative w-full flex justify-center gap-5">

                                    <div className="absolute top-1/2 left-[calc(50%-20px)] right-[calc(50%-20px)] h-px bg-[#D5D9E2] -translate-y-1/2 z-0"></div>

                                    <motion.div
                                        className="relative z-10 w-35 h-17 bg-white border border-[#C3C5D9]/30 rounded-lg flex flex-col items-center justify-center text-center"
                                        whileHover={{ scale: 1.03 }}
                                    >
                                        <div className="text-[#1769FF] text-sm leading-none mb-1">
                                            ⚙
                                        </div>

                                        <div className="text-[13px] font-bold text-[#191C1D] leading-tight">
                                            Settings
                                        </div>

                                        <p className="text-[10px] text-[#434656] leading-tight mt-0.5">
                                            Account, Team
                                        </p>
                                    </motion.div>


                                    <motion.div
                                        className="relative z-10 w-35 h-17 bg-white border border-[#C3C5D9]/20 rounded-lg flex flex-col items-center justify-center text-center"
                                        whileHover={{ scale: 1.03 }}
                                    >
                                        <div className="text-[#1769FF] text-sm leading-none mb-1">
                                            ▤
                                        </div>

                                        <div className="text-[13px] font-bold text-[#191C1D] leading-tight">
                                            Billing
                                        </div>

                                        <p className="text-[11px] text-[#434656] leading-tight mt-0.5">
                                            Subscriptions, Invoices
                                        </p>
                                    </motion.div>

                                </div>

                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>


            {/* Section 5 */}
            <section className="container py-6 relative">

                <motion.div
                    className="relative container py-8 bg-white"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >

                    {/* Center vertical line */}
                    <motion.div
                        className="absolute left-1/2 top-0 h-9.5 w-0.5 -translate-x-1/2 bg-[#5870EE] transition-colors duration-300"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{ transformOrigin: "top" }}
                    />

                    {/* Center diamond */}
                    <motion.div
                        className="absolute left-1/2 top-8 h-8 w-8 -translate-x-1/2 pointer-events-none"
                        initial={{ opacity: 0, scale: 0, rotate: -45 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
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


                    {/* Content Grid */}
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-0"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >

                        {/* Challenge */}
                        <motion.div
                            className="bg-gray-100 rounded-4xl p-8 sm:p-12 shadow-[0_4px_20px_rgba(35,45,80,0.02)] flex flex-col justify-between"
                            variants={fadeUp}
                            whileHover={{ y: -5 }}
                        >
                            <div>
                                <span className="text-[11px] font-bold tracking-[0.2em] text-[#111827] uppercase block mb-4">
                                    THE CHALLENGE
                                </span>

                                <div className="space-y-4 text-[#4B5563] text-sm sm:text-base leading-relaxed font-normal">
                                    <p>
                                        Existing data extraction tools were heavily developer-focused, featuring cluttered interfaces, complex query languages, and steep learning curves.
                                    </p>

                                    <p>
                                        Business users and analysts struggled to retrieve needed data without engineering support. The challenge was to democratize access to data by building a tool that felt modern, approachable, and powerful without being overwhelming.
                                    </p>
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
                                    THE APPROACH
                                </span>

                                <div className="space-y-4 text-[#4B5563] text-sm sm:text-base leading-relaxed font-normal">
                                    <p>
                                        I adopted a 'progressive disclosure' approach. The interface guides users step-by-step: connecting sources, selecting parameters, and previewing results before extracting.
                                    </p>

                                    <p>
                                        Visually, I utilized a clean, light theme with high contrast typography and subtle interactions to maintain focus on the data itself. The blue/violet accent color was strategically used to indicate primary actions and active states.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </motion.div>


                {/* Images */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >

                    <motion.div
                        className="h-72 sm:h-96 bg-neutral-100 border border-neutral-200 rounded-3xl overflow-hidden shadow-md"
                        variants={scaleIn}
                        whileHover={{ scale: 1.015 }}
                    >
                        <img
                            src="/images/haku-product-box.png"
                            alt="Haku Product Box Mockup"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <motion.div
                        className="h-72 sm:h-96 bg-neutral-100 border border-neutral-200 rounded-3xl overflow-hidden shadow-md"
                        variants={scaleIn}
                        whileHover={{ scale: 1.015 }}
                    >
                        <img
                            src="/images/foil-pouch-packaging.png"
                            alt="Foil Pouch Packaging Mockup"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                </motion.div>

            </section>


            {/* Section 6 */}
            <section className="container py-4">

                <motion.div
                    className="bg-white border border-[#C3C5D9]/30 rounded-3xl p-8 sm:p-14 shadow-sm mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >

                    <span className="text-[11px] font-bold tracking-widest text-[#1A65FF] uppercase block mb-2">
                        Strategic Overview
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191C1D] mb-10">
                        Project Deep Dive
                    </h2>


                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 sm:pl-14 pl-0"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >

                        <motion.div className="space-y-3" variants={fadeUp}>
                            <h3 className="font-bold text-[#191C1D] text-base">
                                The Goal
                            </h3>

                            <p className="text-[#434656] text-sm leading-relaxed">
                                The primary objective was to transform a complex, technical data extraction process into a user-friendly SaaS experience.
                            </p>
                        </motion.div>

                        <motion.div className="space-y-3" variants={fadeUp}>
                            <h3 className="font-bold text-[#191C1D] text-base">
                                The Process
                            </h3>

                            <p className="text-[#434656] text-sm leading-relaxed">
                                I focused on simplifying the user journey by categorizing workflows into clear, manageable steps—from source connection to data review.
                            </p>
                        </motion.div>

                        <motion.div className="space-y-3" variants={fadeUp}>
                            <h3 className="font-bold text-[#191C1D] text-base">
                                The Impact
                            </h3>

                            <p className="text-[#434656] text-sm leading-relaxed">
                                The result is a structured platform that balances high information density with visual clarity, allowing data analysts to manage large datasets without cognitive overload.
                            </p>
                        </motion.div>

                    </motion.div>
                </motion.div>


                {/* Sub-grid */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl shadow-sm p-6 sm:p-10 border border-neutral-100">

                        {/* Metadata */}
                        <div className="lg:col-span-4 w-full">

                            <motion.div
                                className="bg-gray-100 border border-[#C3C5D9]/20 rounded-3xl p-8 relative shadow-sm"
                                whileHover={{ y: -4 }}
                            >

                                <div className="absolute right-11.5 top-0 h-10 w-0.5 bg-[#5870EE] transition-colors duration-300" />

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
                                            2026
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[#434656] uppercase tracking-wider text-[10px] font-bold mb-1">
                                            Client
                                        </p>
                                        <p className="text-[#1A65FF] font-semibold">
                                            KBK Business Solutions
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[#434656] uppercase tracking-wider text-[10px] font-bold mb-1">
                                            Category
                                        </p>
                                        <p className="text-[#1A65FF] font-semibold">
                                            SaaS/Web Application
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[#434656] uppercase tracking-wider text-[10px] font-bold mb-1">
                                            Tools
                                        </p>
                                        <p className="text-[#1A65FF] font-semibold">
                                            Figma, Photoshop, Illustrator
                                        </p>
                                    </div>

                                </div>
                            </motion.div>
                        </div>


                        {/* Right Content */}
                        <div className="lg:col-span-8 space-y-6 lg:pl-4">

                            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#A5A5A5] uppercase">
                                A More Structured SaaS Experience
                            </h3>

                            <motion.div
                                className="space-y-5"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >

                                <motion.div
                                    className="flex items-start gap-4"
                                    variants={fadeUp}
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#4F46E5]/20 text-[#1A65FF] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border border-[#4F46E5]/30">
                                        ✓
                                    </div>

                                    <p className="text-[#888888] text-sm sm:text-base leading-relaxed">
                                        Increased user onboarding completion rate by 45% through a simplified step-by-step extraction setup process.
                                    </p>
                                </motion.div>


                                <motion.div
                                    className="flex items-start gap-4"
                                    variants={fadeUp}
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#4F46E5]/20 text-[#1A65FF] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border border-[#4F46E5]/30">
                                        ✓
                                    </div>

                                    <p className="text-[#888888] text-sm sm:text-base leading-relaxed">
                                        Established a scalable design system that reduced front-end development time for new features by 30%.
                                    </p>
                                </motion.div>


                                <motion.div
                                    className="flex items-start gap-4"
                                    variants={fadeUp}
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#4F46E5]/20 text-[#1A65FF] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border border-[#4F46E5]/30">
                                        ✓
                                    </div>

                                    <p className="text-[#888888] text-sm sm:text-base leading-relaxed">
                                        Received overwhelmingly positive feedback from beta testers regarding the clean aesthetics and intuitive navigation.
                                    </p>
                                </motion.div>

                            </motion.div>

                        </div>
                    </div>
                </motion.div>

            </section>


            {/* Section 7 */}
            <motion.div
                className="w-full px-0"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <img
                    src="https://cdn.dribbble.com/userupload/16374797/file/original-bb5e9012b13464132574901859866139.png"
                    alt="Meditation App"
                    className="w-full h-full object-cover"
                />
            </motion.div>


            {/* Section 8 */}
            <section className="container py-8">

                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >

                    <span className="text-xs font-bold tracking-widest text-[#1A65FF] uppercase block mb-3">
                        The Challenge
                    </span>

                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#191C1D]">
                        HOW DO YOU MAKE A TECHNICALLY COMPLEX DATA WORKFLOW FEEL SIMPLE?
                    </h2>

                </motion.div>


                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >

                    <motion.div
                        className="bg-white border border-[#C3C5D9]/20 rounded-xl p-8 shadow-sm flex flex-col"
                        variants={fadeUp}
                        whileHover={{ y: -5 }}
                    >
                        <div className="w-10 h-10 rounded-full bg-[#0055FF]/10 flex items-center justify-center text-[#1A65FF] mb-6">
                            ⚡
                        </div>

                        <h3 className="text-lg font-semibold text-[#191C1D] mb-3">
                            Complex Workflows
                        </h3>

                        <p className="text-[#434656] text-sm leading-relaxed">
                            The existing system required users to navigate fragmented screens and technical jargon to set up a single extraction, leading to high drop-off rates.
                        </p>
                    </motion.div>


                    <motion.div
                        className="bg-white border border-[#C3C5D9]/20 rounded-xl p-8 shadow-sm flex flex-col"
                        variants={fadeUp}
                        whileHover={{ y: -5 }}
                    >
                        <div className="w-10 h-10 rounded-full bg-[#0055FF]/10 flex items-center justify-center text-[#1A65FF] mb-6">
                            📊
                        </div>

                        <h3 className="text-lg font-semibold text-[#191C1D] mb-3">
                            Information Density
                        </h3>

                        <p className="text-[#434656] text-sm leading-relaxed">
                            Displaying millions of rows of extracted data alongside metadata without overwhelming the user or sacrificing performance was a significant hurdle.
                        </p>
                    </motion.div>


                    <motion.div
                        className="bg-white border border-[#C3C5D9]/20 rounded-xl p-8 shadow-sm flex flex-col"
                        variants={fadeUp}
                        whileHover={{ y: -5 }}
                    >
                        <div className="w-10 h-10 rounded-full bg-[#0055FF]/10 flex items-center justify-center text-[#1A65FF] mb-6">
                            👁️
                        </div>

                        <h3 className="text-lg font-semibold text-[#191C1D] mb-3">
                            Product Clarity
                        </h3>

                        <p className="text-[#434656] text-sm leading-relaxed">
                            The platform lacked a unified visual language, making it difficult for users to distinguish between actionable elements, static data, and system status.
                        </p>
                    </motion.div>

                </motion.div>

            </section>


            {/* Section 9 */}
            <motion.div
                className="w-full px-0"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <img
                    src="https://cdn.dribbble.com/userupload/16374797/file/original-bb5e9012b13464132574901859866139.png"
                    alt="Meditation App"
                    className="w-full h-full object-cover"
                />
            </motion.div>


            {/* Section 10 */}
            <section className="container py-8">

                <motion.div
                    className="text-center max-w-xl mx-auto mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >

                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191C1D] mb-4">
                        THE OUTCOME
                    </h2>

                    <p className="text-[#434656] text-sm font-regular leading-relaxed">
                        The redesign transformed Online DB Extractor from a technical utility into a polished, enterprise-ready product. User testing showed a significant decrease in onboarding time and a vast improvement in task completion rates for complex queries.
                    </p>

                </motion.div>


                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >

                    <motion.div
                        className="bg-white border border-[#C3C5D9]/30 rounded-xl p-8 shadow-sm flex flex-col text-center"
                        variants={fadeUp}
                        whileHover={{ y: -5 }}
                    >
                        <h3 className="text-lg font-semibold text-[#191C1D] mb-3">
                            Clearer Navigation
                        </h3>

                        <p className="text-[#434656] text-sm leading-relaxed">
                            Restructured the information architecture to allow users to intuitively navigate flow from connection setup to data extraction without confusion.
                        </p>
                    </motion.div>


                    <motion.div
                        className="bg-white border border-[#C3C5D9]/30 rounded-xl p-8 shadow-sm flex flex-col text-center"
                        variants={fadeUp}
                        whileHover={{ y: -5 }}
                    >
                        <h3 className="text-lg font-semibold text-[#191C1D] mb-3">
                            Consistent UI
                        </h3>

                        <p className="text-[#434656] text-sm leading-relaxed">
                            Developed a comprehensive design system ensuring uniform interactions, typography, and color logic across all platform modules.
                        </p>
                    </motion.div>


                    <motion.div
                        className="bg-white border border-[#C3C5D9]/30 rounded-xl p-8 shadow-sm flex flex-col text-center"
                        variants={fadeUp}
                        whileHover={{ y: -5 }}
                    >
                        <h3 className="text-lg font-semibold text-[#191C1D] mb-3">
                            Scalable Experience
                        </h3>

                        <p className="text-[#434656] text-sm leading-relaxed">
                            Designed components and layouts that gracefully accommodate future feature additions and increasing data complexity.
                        </p>
                    </motion.div>

                </motion.div>

            </section>


            {/* Footer */}
            <motion.div
                className="bg-[#F3F4F5] border border-[#C3C5D9]/20 py-20 px-6 text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >

                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#191C1D] max-w-4xl mx-auto mb-12 leading-tight">
                    DESIGNED TO MAKE COMPLEX DATA WORKFLOWS FEEL SIMPLE.
                </h2>

            </motion.div>


            {/* Next Project */}
            <motion.div
                className="flex justify-center py-30"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >

                <motion.button
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

            </motion.div>

        </div>
    );
};

export default ProjectDetails;