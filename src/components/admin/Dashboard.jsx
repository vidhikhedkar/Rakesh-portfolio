import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiFolder, FiMail, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import HomeTab from './tabs/HomeTab';
import AboutTab from './tabs/AboutTab';
import ProjectTab from './tabs/ProjectTab';
import ContactTab from './tabs/ContactTab';
import { Link, useNavigate } from 'react-router-dom';
import ProfileTab from './tabs/ProfileTab';
import { FaRegUserCircle } from 'react-icons/fa';
import ServicesOfferingTab from './tabs/ServicesOfferingTab';
import { logoutService } from '../service/auth.service';
import ProjectDetailsTab from './tabs/ProjectDetailsTab';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const navTabs = [
        { id: 'home', label: 'Home', icon: <FiHome /> },
        { id: 'about', label: 'About', icon: <FiUser /> },
        { id: 'profile', label: 'Profile', icon: <FaRegUserCircle /> },
        { id: 'project', label: 'Project', icon: <FiFolder /> },
        { id: 'project-details', label: 'Project Details', icon: <FiFolder /> },
        { id: 'services-offering', label: 'Services Offering', icon: <FiFolder /> },
        { id: 'contact', label: 'Contact', icon: <FiMail /> },
    ];

    const handleTabClick = (id) => {
        setActiveTab(id);
        setIsMobileMenuOpen(false);
    };


    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logoutService();
            navigate('/login'); // Redirect to login page after successful sign-out
        } catch (err) {
            console.error("Failed to log out:", err);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#F3F4F8] font-sans text-[#111111] overflow-hidden relative">

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col justify-between p-6 shrink-0 z-20">
                <div>
                    <Link to="/" className="flex items-center gap-3 mb-3 px-2">
                        <div className="h-9 w-9 rounded-xl bg-[#5B78FF] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[#5B78FF]/20 shrink-0">
                            R
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-900">
                            Rakesh<span className="text-blue-600">.P</span>
                        </span>
                    </Link>

                    <nav className="space-y-2">
                        {navTabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${isActive
                                        ? 'bg-[#5B78FF] text-white shadow-md shadow-[#5B78FF]/20'
                                        : 'text-gray-500 hover:bg-gray-100 hover:text-[#0F0F0F]'
                                        }`}
                                >
                                    <span className="text-lg">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="pt-6 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                        <FiLogOut className="text-lg" />
                        {isLoggingOut ? "Signing Out..." : "Sign Out"}
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Backdrop & Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
                        />

                        {/* Slide-out Drawer */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 flex flex-col justify-between p-6 z-50 lg:hidden shadow-2xl"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-10 px-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-xl bg-[#5B78FF] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[#5B78FF]/20">
                                            A
                                        </div>
                                        <h1 className="text-xl font-bold tracking-tight text-[#0F0F0F]">Admin Panel</h1>
                                    </div>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 text-gray-400 hover:text-gray-600 rounded-xl cursor-pointer"
                                    >
                                        <FiX size={20} />
                                    </button>
                                </div>

                                <nav className="space-y-2">
                                    {navTabs.map((tab) => {
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => handleTabClick(tab.id)}
                                                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${isActive
                                                    ? 'bg-[#5B78FF] text-white shadow-md shadow-[#5B78FF]/20'
                                                    : 'text-gray-500 hover:bg-gray-100 hover:text-[#0F0F0F]'
                                                    }`}
                                            >
                                                <span className="text-lg">{tab.icon}</span>
                                                {tab.label}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <button
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                                    <FiLogOut className="text-lg" />
                                    {isLoggingOut ? "Signing Out..." : "Sign Out"}
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">

                {/* Top Header */}
                <header className="h-20 bg-white border-b border-gray-200 px-4 sm:px-8 flex items-center justify-between shrink-0 z-10">
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Trigger Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                            aria-label="Open Menu"
                        >
                            <FiMenu size={22} />
                        </button>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-[#0F0F0F] capitalize">{activeTab} Section</h2>
                            <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 hidden sm:block">Manage your application data seamlessly</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 pl-3 sm:pl-4 border-l border-gray-200">
                            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-linear-to-tr from-[#3b82f6] to-[#61c6e8] overflow-hidden shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                                    alt="Admin Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-bold text-[#0F0F0F]">Rakesh P.</p>
                                <p className="text-[11px] text-gray-400">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Tab Content Wrapper */}
                <div className="flex-1 overflow-y-auto p-3 no-scrollbar">
                    <div className="w-full mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'home' && <HomeTab />}
                                {activeTab === 'about' && <AboutTab />}
                                {activeTab === 'profile' && <ProfileTab />}
                                {activeTab === 'project' && <ProjectTab />}
                                {activeTab === 'project-details' && <ProjectDetailsTab />}
                                {activeTab === 'services-offering' && <ServicesOfferingTab />}
                                {activeTab === 'contact' && <ContactTab />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Dashboard;