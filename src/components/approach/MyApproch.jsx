import React from 'react';
import { LuUser, LuTrendingUp, LuClipboardList, LuSearch, LuSparkles, LuArrowUpRight, LuArrowRight, LuX, LuCheck, } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const MyApproach = () => {
    const navigate = useNavigate();

    const principles = [
        {
            id: '01',
            title: 'Keep It Simple',
            description:
                'Remove unnecessary complexity and make every interaction feel intentional.',
        },
        {
            id: '02',
            title: 'Design For People',
            description:
                'Start with real user needs rather than designing only for aesthetics.',
        },
        {
            id: '03',
            title: 'Details Matter',
            description:
                'Small decisions in spacing, typography and interaction can change the entire experience.',
        },
        {
            id: '04',
            title: 'Consistency Builds Trust',
            description:
                'A strong design system creates familiar and predictable experiences.',
        },
    ];

    // 6-Phase Process Data
    const sixPhases = [
        {
            id: '01',
            title: 'Discover',
            desc: 'Interviews, benchmarking & scoping',
            active: false,
        },
        {
            id: '02',
            title: 'Define',
            desc: 'Architecture & user journey maps',
            active: false,
        },
        {
            id: '03',
            title: 'Wireframe',
            desc: 'Low-fi structural exploration',
            active: false,
        },
        {
            id: '04',
            title: 'Design',
            desc: 'High-fidelity UI & atomic tokens',
            active: true,
        },
        {
            id: '05',
            title: 'Prototype',
            desc: 'Interactive validation & testing',
            active: false,
        },
        {
            id: '06',
            title: 'Handoff',
            desc: 'Dev spec docs & QA supervision',
            active: false,
            dark: true,
        },
    ];

    // Phase 1 Cards Data
    const phase1Cards = [
        {
            id: 1,
            category: 'FOUNDATION',
            title: 'User Needs',
            description:
                'Synthesizing user pain points, empathy maps, journey friction, and cognitive mental models.',
            tags: [
                { label: 'Empathy Maps', active: false },
                { label: 'User Journeys', active: true },
            ],
            icon: <LuUser className="w-5 h-5 text-[#0055FF]" />,
            iconBg: 'bg-[#EFF6FF]',
            activeTagColor: 'text-[#0055FF]',
        },
        {
            id: 2,
            category: 'STRATEGY',
            title: 'Business Goals',
            description:
                'Aligning design with conversion targets, retention rates, market positioning, and revenue growth.',
            tags: [
                { label: 'KPI Metric Map', active: false },
                { label: 'Growth Ready', active: true },
            ],
            icon: <LuTrendingUp className="w-5 h-5 text-[#0F172A]" />,
            iconBg: 'bg-[#F1F5F9]',
            activeTagColor: 'text-[#0F172A]',
        },
        {
            id: 3,
            category: 'SCOPE',
            title: 'Requirements',
            description:
                'Building feature matrices, technical edge cases, accessibility benchmarks, and dev constraints.',
            tags: [
                { label: 'Feature Matrix', active: false },
                { label: 'Feasibility', active: true },
            ],
            icon: <LuClipboardList className="w-5 h-5 text-[#4F46E5]" />,
            iconBg: 'bg-[#EEF2FF]',
            activeTagColor: 'text-[#4F46E5]',
        },
        {
            id: 4,
            category: 'VALIDATION',
            title: 'Research',
            description:
                'Conducting user interviews, usability audits, competitor benchmarking, and heuristic analysis.',
            tags: [
                { label: 'Heuristic Audits', active: false },
                { label: 'Usability Test', active: true },
            ],
            icon: <LuSearch className="w-5 h-5 text-[#0055FF]" />,
            iconBg: 'bg-[#EFF6FF]',
            activeTagColor: 'text-[#0055FF]',
        },
    ];


    return (
        <section className="relative bg-[#F8F9FA] text-slate-800 py-16 font-sans overflow-hidden">
            <div className="absolute top-8 left-8 sm:left-16 text-slate-300">
                <LuSparkles className="w-5 h-5" />
            </div>
            <div className="absolute top-12 right-8 sm:right-16 text-[#BFDBFE]">
                <LuSparkles className="w-6 h-6" />
            </div>

            <div className="container space-y-16">
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-semibold tracking-wider text-[#334155] uppercase shadow-sm">
                        <span className="w-1 h-4 bg-[#0055FF] rounded-full"></span>
                        MY APPROACH • UI/UX DESIGN
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight max-w-4xl uppercase leading-tight">
                        I design with purpose, <br className="hidden sm:inline" />
                        not just pixels.
                    </h1>

                    <p className="text-base sm:text-lg text-[#64748B] max-w-2xl font-normal leading-relaxed">
                        My approach combines user needs, business goals and thoughtful visual design to create digital experiences that feel simple, useful and engaging.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E8F0]/20 text-xs font-semibold text-[#475569] shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#0055FF]"></span>
                            HUMAN-CENTERED LOGIC
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E8F0]/20 text-xs font-semibold text-[#475569] shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                            SYSTEMATIC SCALE
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E8F0]/20 text-xs font-semibold text-[#475569] shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            DEV-READY EXECUTION
                        </div>
                    </div>
                </div>


                <div>
                    <div className="mb-6 w-full min-w-0">
                        <div className="flex flex-col xs:flex-row items-start gap-3 sm:gap-4 w-full min-w-0">

                            <span className="shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#0055FF]/10 text-[#0055FF] font-bold text-xs sm:text-sm">
                                01
                            </span>

                            <div className="w-full min-w-0">
                                <span className="block text-[10px] sm:text-xs font-bold tracking-[0.08em] sm:tracking-wider text-[#94A3B8] uppercase leading-relaxed">
                                    DISCOVERY & RESEARCH
                                </span>

                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F172A] mt-1 leading-tight">
                                    Understand Before I Design
                                </h2>

                                <p className="text-xs sm:text-sm md:text-base font-normal text-[#64748B] mt-2 leading-relaxed max-w-full">
                                    I start by understanding the problem, users, business goals and project requirements before jumping into visuals.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {phase1Cards.map((card) => (
                            <div
                                key={card.id}
                                className="bg-white rounded-3xl p-6 border border-[#E2E8F0]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
                            >
                                <div>
                                    <div className={`w-10 h-10 rounded-2xl ${card.iconBg} flex items-center justify-center mb-6`}>
                                        {card.icon}
                                    </div>
                                    <span className="text-[11px] font-bold tracking-wider text-[#94A3B8] uppercase">
                                        {card.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-[#0F172A] mt-1 mb-3">
                                        {card.title}
                                    </h3>
                                    <p className="text-[#64748B] text-xs leading-relaxed mb-8">
                                        {card.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-[#E2E8F0]/80 pt-4 text-xs">
                                    {card.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className={`font-semibold ${tag.active ? card.activeTagColor : 'text-[#94A3B8]'
                                                }`}
                                        >
                                            {tag.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="mb-6 w-full min-w-0">
                        <div className="flex flex-col xs:flex-row items-start gap-3 sm:gap-4 w-full min-w-0">
                            <span className="shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#0055FF]/10 text-[#0055FF] font-bold text-xs sm:text-sm">
                                02
                            </span>

                            <div className="w-full min-w-0">
                                <span className="block text-[10px] sm:text-xs font-bold tracking-[0.08em] sm:tracking-wider text-[#94A3B8] uppercase leading-relaxed">
                                    ARCHITECTURE & LOGIC
                                </span>

                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F172A] mt-1 leading-tight">
                                    Turn Complexity Into Structure
                                </h2>

                                <p className="text-[#64748B] text-xs sm:text-sm md:text-base font-normal mt-2 leading-relaxed max-w-full">
                                    I organize information into clear user flows, wireframes and page structures so the experience feels logical and easy to navigate.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0]/80 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F1F5F9] pb-6 mb-6 gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-1 h-4 bg-[#0055FF] rounded-full animate-pulse"></span>
                                <span className="text-md font-bold text-[#1E293B] tracking-wide">
                                    Systematic Information Flow
                                </span>
                            </div>
                            <div className="flex items-center gap-6 text-xs text-[#94A3B8] font-medium">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                                    Primary Path
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#0055FF]"></span>
                                    Decision Point
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-[#F8FAFC]/90 rounded-2xl p-5 border border-[#E2E8F0] flex flex-col justify-between min-h-55">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold text-[#94A3B8] tracking-wider">
                                            STEP 01
                                        </span>
                                        <span className="w-2 h-2 rounded-full bg-[#94A3B8]"></span>
                                    </div>
                                    <h4 className="text-md font-bold text-[#0F172A] mb-1">
                                        Problem
                                    </h4>
                                    <p className="text-[14px] text-[#64748B] leading-normal">
                                        Deconstruct core task friction and articulate clear jobs-to-be-done.
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-3 border border-[#E2E8F0]/70 space-y-2 mt-4">
                                    <div className="h-2 bg-[#E2E8F0] rounded-full w-1/3"></div>
                                    <div className="h-2 bg-[#DBEAFE] rounded-full w-4/5"></div>
                                    <div className="h-2 bg-[#F1F5F9] rounded-full w-3/5"></div>
                                </div>
                            </div>

                            <div className="bg-[#F8FAFC]/90 rounded-2xl p-5 border border-[#E2E8F0] flex flex-col justify-between min-h-55">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold text-[#0055FF] tracking-wider">
                                            STEP 02
                                        </span>
                                        <span className="w-2 h-2 rounded-full bg-[#0055FF]"></span>
                                    </div>
                                    <h4 className="text-md font-bold text-[#0F172A] mb-1">
                                        User Flow
                                    </h4>
                                    <p className="text-[14px] text-[#64748B] leading-normal">
                                        Map primary paths, secondary branches, and edge conditions.
                                    </p>
                                </div>
                                <div className="bg-white rounded-xl p-2.5 border border-[#E2E8F0]/70 flex items-center justify-around text-[10px] text-[#475569] mt-4">
                                    <span className='bg-[#F1F5F9] px-2 py-1 rounded-md'>Start</span>
                                    <span>→</span>
                                    <span className="border border-[#EFF6FF] text-[#0055FF] rounded px-1.5 py-0.5 font-regular bg-[#EFF6FF]">
                                        Decision
                                    </span>
                                    <span>→</span>
                                    <span className='bg-[#F1F5F9] px-2 py-1 rounded-md'>Goal</span>
                                </div>
                            </div>

                            <div className="bg-[#F8FAFC]/90 rounded-2xl p-5 border border-[#E2E8F0]/80 flex flex-col justify-between min-h-55">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold text-[#94A3B8] tracking-wider">
                                            STEP 03
                                        </span>
                                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                                    </div>
                                    <h4 className="text-md font-bold text-[#0F172A] mb-1">
                                        Wireframe
                                    </h4>
                                    <p className="text-[14px] text-[#64748B] leading-normal">
                                        Establish layout hierarchy, content density, and core interactions.
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl p-3 border border-[#E2E8F0]/70 flex gap-2 mt-4">
                                    <div className="w-2/3 space-y-4 bg-[#F1F5F9] p-1">
                                        <div className="h-1.5 bg-[#E2E8F0] rounded w-full"></div>
                                        <div className="h-1.5 bg-[#E2E8F0] rounded w-4/5"></div>
                                    </div>

                                    <div className="w-2/3 space-y-1 bg-[#F1F5F9] rounded p-1">
                                        <div className="h-2 bg-[#DBEAFE] rounded w-full"></div>
                                        <div className="h-2 bg-[#E2E8F0] rounded w-4/5"></div>
                                        <div className="h-2 bg-[#E2E8F0] rounded w-3/5"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#EFF6FF]/60 rounded-2xl p-5 border border-[#0055FF]/10 flex flex-col justify-between min-h-55">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold text-[#0055FF] tracking-wider">
                                            STEP 04
                                        </span>
                                        <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                                    </div>
                                    <h4 className="text-md font-bold text-[#0F172A] mb-1">
                                        Solution
                                    </h4>
                                    <p className="text-[14px] text-[#64748B] leading-normal">
                                        Validated interactive framework aligned with development viability.
                                    </p>
                                </div>

                                <div className="flex flex-col xs:flex-row sm:flex-row items-stretch xs:items-center justify-between gap-3 mt-4 rounded-2xl bg-white border border-[#E5E7EB] p-3 sm:p-4 shadow-xs w-full min-w-0">
                                    <div className="flex items-center gap-1 text-[#1E293B] text-[11px] sm:text-[12px] font-semibold px-1 sm:px-2 min-w-0">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0"></span>
                                        <span className="truncate">Validated</span>
                                    </div>

                                    <div className="bg-[#0055FF] text-white text-[11px] sm:text-[12px] font-semibold px-2.5 sm:px-3 py-2 rounded-full whitespace-nowrap text-center shrink-0">
                                        100% Ready
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="mb-6 w-full min-w-0">
                        <div className="flex flex-col xs:flex-row items-start gap-3 sm:gap-4 w-full min-w-0">
                            <span className="shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#0055FF]/10 text-[#0055FF] font-bold text-xs sm:text-sm">
                                03
                            </span>

                            <div className="w-full min-w-0">
                                <span className="block text-[10px] sm:text-xs font-bold tracking-[0.08em] sm:tracking-wider text-[#94A3B8] uppercase leading-relaxed">
                                    HIGH-FIDELITY UI CRAFT
                                </span>

                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F172A] mt-1 leading-tight">
                                    Design With Clarity
                                </h2>

                                <p className="text-[#64748B] text-xs sm:text-sm md:text-base mt-2 leading-relaxed max-w-full">
                                    I transform ideas into clean, modern and purposeful interfaces with strong hierarchy, consistent spacing and visual balance.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0]/80 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 w-full min-w-0">
                                    <div className="flex items-center gap-1.5 min-w-0 w-full sm:w-auto">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#FB7185] shrink-0"></span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] shrink-0"></span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] shrink-0"></span>

                                        <span className="text-[10px] xs:text-[11px] sm:text-xs text-[#94A3B8] font-mono ml-1.5 sm:ml-2 truncate min-w-0">
                                            app.analytics.io/overview
                                        </span>
                                    </div>

                                    <span className="self-start sm:self-auto text-[10px] sm:text-[11px] font-semibold bg-[#F1F5F9] text-[#475569] px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                                        SaaS Design System
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#F1F5F9]">
                                        <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">
                                            ACTIVE USERS
                                        </span>
                                        <div className="text-2xl font-bold text-[#0F172A] mt-1">
                                            42,850
                                        </div>
                                        <span className="text-[11px] text-[#059669] font-semibold mt-1 inline-block">
                                            ↑ 18.2% vs last month
                                        </span>
                                    </div>

                                    <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#F1F5F9]">
                                        <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">
                                            RETENTION RATE
                                        </span>
                                        <div className="text-2xl font-bold text-[#0F172A] mt-1">
                                            89.4%
                                        </div>
                                        <span className="text-[11px] text-[#0055FF] font-semibold mt-1 inline-block">
                                            Top 5% percentile
                                        </span>
                                    </div>
                                    <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#F1F5F9]">
                                        <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">
                                            INTERACTION SPEED
                                        </span>
                                        <div className="text-2xl font-bold text-[#0F172A] mt-1">
                                            120ms
                                        </div>
                                        <span className="text-[11px] text-[#94A3B8] font-medium mt-1 inline-block">
                                            Zero UI latency
                                        </span>
                                    </div>
                                </div>

                                <div className="border border-[#F1F5F9] rounded-2xl p-4 bg-[#F8FAFC]">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-xs font-bold text-[#334155]">
                                            Conversion Progression
                                        </span>
                                        <span className="text-xs text-[#0055FF] font-semibold cursor-pointer flex items-center gap-1">
                                            Live Feed <LuArrowUpRight className="w-3 h-3" />
                                        </span>
                                    </div>

                                    <div className="flex items-end justify-between h-32 gap-2 pt-4 px-2">
                                        <div className="w-full bg-[#DBEAFE] rounded-t-lg h-2/5"></div>
                                        <div className="w-full bg-[#BFDBFE] rounded-t-lg h-3/5"></div>
                                        <div className="w-full bg-[#93C5FD] rounded-t-lg h-1/2"></div>
                                        <div className="w-full bg-[#60A5FA] rounded-t-lg h-full relative">
                                            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0055FF] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                                +24%
                                            </span>
                                        </div>
                                        <div className="w-full bg-[#93C5FD] rounded-t-lg h-4/5"></div>
                                        <div className="w-full bg-[#BFDBFE] rounded-t-lg h-2/3"></div>
                                    </div>
                                </div>
                                <div className='text-sm text-[#94A3B8] text-center mt-4'>Structured 8pt grid, WCAG AAA accessibility, and contextual micro-interactions.
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0]/80 shadow-sm flex flex-col justify-between flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
                                        MOBILE ADAPTATION
                                    </span>
                                    <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                                </div>

                                <div className="bg-[#0F172A] rounded-2xl p-5 text-white my-2 shadow-lg">
                                    <span className="text-[10px] text-[#94A3B8]">
                                        Welcome Back
                                    </span>
                                    <div className="text-sm font-bold text-white mb-4">
                                        Rakesh Parvathneni
                                    </div>

                                    <div className="bg-[#1E293B]/80 rounded-xl p-3 space-y-2 border border-[#334155]/60">
                                        <div className="flex justify-between text-[11px]">
                                            <span className="text-[#CBD5E1]">Design Systems</span>
                                            <span className="text-[#0055FF] font-bold">98%</span>
                                        </div>
                                        <div className="w-full bg-[#0055FF] h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-[#EFF6FF]0 h-full w-[98%] rounded-full"></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-around items-center pt-4 text-[#64748B] text-xs">
                                        <span>●</span>
                                        <span>■</span>
                                        <span>▲</span>
                                    </div>
                                </div>

                                <p className="text-sm text-center text-[#94A3B8] mt-2">
                                    Fluid responsive layout breakpoints
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0]/80 shadow-sm">
                                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-4">
                                    DESIGN SYSTEM TOKENS
                                </span>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-[#E2E8F0]/80 bg-slate-50/50">
                                        <div className="w-7 h-7 rounded-lg bg-[#0055FF] shrink-0"></div>
                                        <div>
                                            <div className="text-[13px] font-bold text-slate-800">
                                                #0055FF
                                            </div>
                                            <div className="text-[11px] text-[#94A3B8]">
                                                Brand Primary
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-[#E2E8F0]/80 bg-slate-50/50">
                                        <div className="w-7 h-7 rounded-lg bg-[#0F172A] shrink-0"></div>
                                        <div>
                                            <div className="text-[13px] font-bold text-slate-800">
                                                #0F172A
                                            </div>
                                            <div className="text-[11px] text-[#94A3B8]">
                                                Slate Deep
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= SECTION 04: QUALITY & POLISHING ================= */}
                <div className="w-full">
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                            <span className="shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#0055FF]/10 text-[#0055FF] font-bold text-xs sm:text-sm">
                                04
                            </span>

                            {/* Heading Content */}
                            <div className="w-full min-w-0">
                                <span className="block text-[10px] sm:text-xs font-bold tracking-[0.12em] sm:tracking-wider text-[#94A3B8] uppercase leading-relaxed">
                                    QUALITY & POLISHING
                                </span>

                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F172A] mt-1 leading-tight">
                                    Refine Every Detail
                                </h2>

                                <p className=" text-[#64748B] text-xs sm:text-sm md:text-base mt-2 leading-relaxed max-w-4xl">
                                    I review layouts, interactions and visual details to make
                                    sure the final experience feels polished, consistent and
                                    easy to use.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6  md:p-8 lg:p-10 border border-[#E2E8F0]/80 shadow-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-stretch">
                            <div className="w-full bg-[#F8FAFC]/90 rounded-xl sm:rounded-2xl p-4  sm:p-5 md:p-6 border border-[#E2E8F0] flex flex-col justify-between min-w-0">
                                <div className="w-full">
                                    <div className="flex flex-col xs:flex-row sm:flex-row items-start sm:items-center justify-between gap-2 mb-5  sm:mb-6">
                                        <span className="text-[10px] sm:text-xs font-semibold bg-[#E2E8F0] text-[#475569] px-3 py-1.5 rounded-full whitespace-nowrap">
                                            Initial Draft
                                        </span>

                                        <span className="text-[10px] sm:text-xs font-medium text-[#F43F5E] leading-relaxed">
                                            Needs Refinement
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="h-3.5 sm:h-4 bg-[#CBD5E1] rounded-sm w-2/5"></div>
                                        <div className="h-2.5 sm:h-3 bg-[#E2E8F0] rounded-sm w-full sm:w-4/5"></div>
                                        <div className="h-2.5 sm:h-3 bg-[#E2E8F0] rounded-sm w-4/5 sm:w-3/4"></div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        <div className="h-8 sm:h-9 bg-[#CBD5E1] rounded-lg w-20 sm:w-24"></div>
                                        <div className="h-8 sm:h-9 bg-[#E2E8F0] rounded-lg w-16 sm:w-20"></div>
                                    </div>
                                </div>


                                <div className="mt-8 sm:mt-10 pt-4  border-t border-slate-200/60 text-[10px] sm:text-[11px] text-[#94A3B8] flex items-start gap-1.5 leading-relaxed">
                                    <LuX className="w-3.5 h-3.5 text-[#94A3B8] shrink-0 mt-0.5" />
                                    <span>
                                        Generic spacing • Undefined type scale • Low
                                        accessibility contrast
                                    </span>
                                </div>
                            </div>

                            <div className="w-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-blue-200/80 shadow-md flex flex-col  justify-between min-w-0">
                                <div className="w-full">
                                    <div className="flex flex-col sm:flex-row items-start  sm:items-center justify-between gap-3 mb-4">
                                        <span className="text-[10px] sm:text-xs font-semibold  bg-[#0055FF] text-white px-3 py-1.5 sm:py-2 rounded-full shadow-xs whitespace-nowrap">
                                            Refined Production UI
                                        </span>

                                        <span className="text-[10px] sm:text-xs font-bold text-[#059669] flex items-center  gap-1">
                                            <LuCheck className="w-3.5 h-3.5 shrink-0" />
                                            Engineered
                                        </span>
                                    </div>


                                    {/* Title */}
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0F172A] mb-2 leading-snug">
                                        Streamlined Data Checkout
                                    </h3>

                                    <p className="text-[11px] sm:text-xs md:text-sm text-[#475569] leading-relaxed mb-5 sm:mb-6">
                                        Refined hierarchy with deliberate optical alignments,
                                        tested contrast ratios, and tactile button states.
                                    </p>

                                    <div className="flex flex-col xs:flex-row sm:flex-row gap-2  sm:gap-3 mb-5 sm:mb-6">
                                        <button
                                            type="button"
                                            className="w-full xs:w-auto  sm:w-auto bg-[#0055FF] hover:bg-blue-700 text-white text-[11px] sm:text-xs font-semibold px-4 py-2.5 rounded-full shadow-sm transition-colors whitespace-nowrap ">
                                            Confirm & Pay →
                                        </button>

                                        <button
                                            type="button"
                                            className="w-full xs:w-auto sm:w-auto bg-[#E2E8F0]/80 hover:bg-slate-200 text-slate-700 text-[11px]  sm:text-xs font-semibold px-4 py-2.5 rounded-full transition-colors whitespace-nowrap">
                                            Save Draft
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[#E2E8F0]/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-[10px] sm:text-[11px]"
                                >
                                    <div className="text-[#0055FF] font-semibold flex items-start gap-1.5 leading-relaxed">
                                        <LuCheck className="w-3 h-3 shrink-0 mt-0.5" />
                                        <span>Spacing: 8pt calibrated</span>
                                    </div>

                                    <div className="text-[#059669] font-semibold flex items-start gap-1.5 leading-relaxed">
                                        <LuCheck className="w-3 h-3 shrink-0 mt-0.5" />
                                        <span>Hierarchy: Contrast 7:1 (AAA)</span>
                                    </div>

                                    <div className="text-[#334155] font-semibold flex items-start gap-1.5 leading-relaxed">
                                        <LuCheck className="w-3 h-3 shrink-0 mt-0.5" />
                                        <span>Consistency: Tokenized</span>
                                    </div>

                                    <div className="text-[#4F46E5] font-semibold flex items-start gap-1.5 leading-relaxed">
                                        <LuCheck className="w-3 h-3 shrink-0 mt-0.5" />
                                        <span>Interaction: Micro-feedback</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= SECTION 05: ENGINEERING PARTNERSHIP ================= */}
                <div className="w-full">
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                            <span className="shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#0055FF]/10 text-[#0055FF] font-bold text-xs sm:text-sm">
                                05
                            </span>

                            <div className="w-full min-w-0">
                                <span className="block text-[10px] sm:text-xs font-bold tracking-[0.12em] sm:tracking-wider text-[#94A3B8] uppercase leading-relaxed"
                                >
                                    ENGINEERING PARTNERSHIP
                                </span>

                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F172A] mt-1 leading-tight">
                                    Design With Developers, Not Just For Them
                                </h2>

                                <p className="text-[#64748B] text-xs sm:text-sm md:text-base mt-2 leading-relaxed max-w-4xl">
                                    I work closely with developers to communicate design decisions,
                                    maintain consistency and make sure the final product matches
                                    the intended experience.
                                </p>
                            </div>
                        </div>
                    </div>


                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">

                        {/* Card 1 */}
                        <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#E2E8F0]/80 shadow-sm flex flex-col justify-between  min-w-0">
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                    <span className="text-[9px] sm:text-[10px] font-bold text-[#0055FF] tracking-wider uppercase">
                                        FIGMA DESIGN
                                    </span>

                                    <span className="text-[9px] sm:text-[10px] font-normal  text-[#94A3B8]">
                                        Figma Tokens
                                    </span>
                                </div>

                                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                                    Components & Tokens
                                </h3>

                                <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                                    Shared naming conventions for color variables, semantic
                                    typography tokens, and spacing arrays directly mapped to
                                    Tailwind CSS.
                                </p>
                            </div>

                            <div className="w-fullbg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0]/60 font-mono text-[9px] sm:text-[10px] md:text-[11px] text-[#334155] overflow-x-auto  whitespace-nowrap">
                                theme.colors.brand:
                                <span className="text-[#334155]">'#0055FF'</span>
                            </div>
                        </div>


                        {/* Card 2 */}
                        <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#E2E8F0]/80 shadow-sm flex flex-col justify-between min-w-0">
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                    <span className="text-[9px] sm:text-[10px] font-bold text-[#0055FF] tracking-wider uppercase">
                                        DEVELOPER HANDOFF
                                    </span>

                                    <span className="text-[9px] sm:text-[10px] font-normal text-[#94A3B8]">
                                        Auto-Layout
                                    </span>
                                </div>

                                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                                    Specifications & Layout
                                </h3>

                                <p className=" text-[#64748B] text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                                    Every Figma frame aligns with Flexbox and CSS Grid
                                    parameters. Responsive breakpoints are designed
                                    proactively with developers.
                                </p>
                            </div>

                            <div className="w-full bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0]/60 font-mono text-[9px] sm:text-[10px] md:text-[11px] text-[#334155] overflow-x-auto whitespace-nowrap">
                                display: flex; gap: 16px;
                            </div>
                        </div>


                        {/* Card 3 */}
                        <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#E2E8F0]/80 shadow-sm flex flex-col justify-between  min-w-0  md:col-span-2 lg:col-span-1">
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                    <span className="text-[9px] sm:text-[10px] font-bold text-[#059669] tracking-wider uppercase">
                                        FINAL PRODUCT
                                    </span>

                                    <span className="text-[9px] sm:text-[10px] font-normal  text-[#94A3B8]">
                                        Ready to Ship
                                    </span>

                                </div>

                                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                                    Responsive States & QA
                                </h3>

                                <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                                    Detailed behavior documentation, loading states, edge
                                    conditions, and post-build visual QA reviews before final
                                    deployment.
                                </p>
                            </div>

                            <div className="w-fullbg-[#ECFDF5] text-[#047857]
                    rounded-xl p-3 border border-[#A7F3D0] font-mono text-[9px] sm:text-[10px] md:text-[11px] font-medium flex items-center gap-2 overflow-x-auto
                    whitespace-nowrap">
                                QA Status: Approved 100%
                            </div>
                        </div>
                    </div>
                </div>


                {/* ================= CORE DESIGN PRINCIPLES ================= */}
                <div className="space-y-6">
                    <div className="w-full flex flex-col items-center text-center px-4 sm:px-6 space-y-2">
                        <div className="inline-flex items-center justify-center gap-2 text-[9px] xs:text-[10px] sm:text-xs font-bold tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest text-[#0055FF] uppercase leading-none">
                            <span className="w-1 h-3.5 sm:h-4 bg-[#0055FF] rounded-full shrink-0"></span>
                            <span>WHAT I BELIEVE IN</span>
                        </div>

                        <h2 className="w-full max-w-xl text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
                            Core Design Principles
                        </h2>

                        <p className="w-full max-w-xs sm:max-w-md md:max-w-2xl text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed px-1 sm:px-0">
                            The foundational values guiding every screen, flow, and component I build.
                        </p>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                        {principles.map((item) => (
                            <div
                                key={item.id}
                                className="w-full bg-white rounded-2xl sm:rounded-3x p-5 sm:p-6 md:p-7 lg:p-8 border border-[#E2E8F0]/80 shadow-sm hover:shadow-md transition-shadow duration-200">
                                <div className="w-full">
                                    <span className="block text-xl sm:text-2xl font-black text-[#0055FF] mb-2 sm:mb-2.5">
                                        {item.id}
                                    </span>

                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0F172A] mb-2 leading-snug wrap-break-word">
                                        {item.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm md:text-sm text-[#64748B] leading-relaxed wrap-break-word">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* 6-Phase Process Banner */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 lg:p-12 border border-[#E2E8F0]/80  shadow-sm">
                        <div className="flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-12">
                            <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-widest text-[#0055FF] uppercase mb-1.5">
                                END-TO-END DELIVERY
                            </span>

                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F172A] leading-tight">
                                My 6–Phase Process
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-7 md:gap-8 lg:gap-5">
                            {sixPhases.map((phase) => (
                                <div
                                    key={phase.id}
                                    className="flex flex-row lg:flex-col items-start gap-3 lg:gap-3">

                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                            ${phase.active ? 'bg-[#0055FF] text-white ring-4 ring-[#0055FF]/10'
                                            : phase.dark
                                                ? 'bg-[#0F172A] text-white'
                                                : 'bg-[#EFF6FF] text-[#0055FF]'
                                        }`}>
                                        {phase.id}
                                    </div>


                                    <div className="min-w-0">
                                        <h4 className="text-sm font-bold text-[#0F172A] leading-snug">
                                            {phase.title}
                                        </h4>

                                        <p className="text-[11px] sm:text-xs lg:text-[11px] text-[#94A3B8] mt-1 leading-relaxed">
                                            {phase.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="w-full max-w-5xl mx-auto">
                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#0F172A] p-6 text-center shadow-xl border border-slate-800">
                        <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 rounded-full bg-[#0055FF]/20 blur-3xl"></div>

                        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center space-y-3 sm:space-y-4">
                            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#0055FF]">
                                “
                            </div>

                            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold leading-snug tracking-tight text-white">
                                Good design makes complexity feel simple.
                            </h2>

                            <p className="mx-auto max-w-xl pt-1 text-xs sm:text-sm md:text-lg font-normal leading-relaxed text-[#94A3B8]">
                                I’m constantly learning, experimenting and refining my process
                                to create better digital experiences.
                            </p>

                            <div className="pt-3 sm:pt-4">
                                <span className="text-[10px] sm:text-xs md:text-[13px] font-bold uppercase tracking-[0.15em] sm:tracking-widest text-[#0055FF]">
                                    — RAKESH PARVATHNENI
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-3xl p-10 border border-[#E2E8F0]/80 shadow-sm text-center relative overflow-hidden">
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#DBEAFE]/50 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <span className="text-xs font-bold tracking-widest text-[#0055FF] uppercase">
                            HAVE A PROBLEM WORTH SOLVING?
                        </span>

                        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                            Let's design something <br />
                            <span className="text-[#0055FF]">meaningful</span> together.
                        </h2>

                        <p className="text-[#64748B] text-xs sm:text-[14px] max-w-lg mx-auto leading-relaxed">
                            Whether you need a full SaaS platform revamp, an intuitive mobile app, or a scalable design system, let's talk.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/contact")}
                                className="bg-[#121927] hover:bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-md cursor-pointer">
                                Let's talk <LuArrowRight className="w-3.5 h-3.5" />
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/projects")}
                                className="bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold px-6 py-3 rounded-full border border-slate-200 transition-all cursor-pointer">
                                View My Work
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyApproach;