import React, { useState } from 'react';
import { FiSave, FiMail, FiPhone, FiMapPin, FiGlobe, FiShare2 } from 'react-icons/fi';
import { FaXTwitter, FaInstagram } from 'react-icons/fa6';

const ContactTab = () => {
    // State mirroring the contact details found in your frontend Contact component
    const [contactData, setContactData] = useState({
        email: "rakeshparvathneni26@gmail.com",
        phone1: "+91 96406 57114",
        phone2: "+91 81860 54115",
        city: "Hyderabad",
        state: "Telangana, India",
        websiteUrl: "#",
        twitterUrl: "#",
        instagramUrl: "#"
    });

    const [savedMessage, setSavedMessage] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        // Here you would typically sync with your backend/state management
        setSavedMessage(true);
        setTimeout(() => setSavedMessage(false), 2500);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3 bg-white p-3 rounded-2xl">
                <div>
                    <h3 className="text-lg font-bold text-[#0F0F0F]">Manage Contact Information</h3>
                    <p className="text-xs text-gray-500">Update your public contact details, phone numbers, location, and social links.</p>
                </div>
                {savedMessage && (
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 animate-in fade-in">
                        Changes saved successfully!
                    </span>
                )}
            </div>

            <form onSubmit={handleSave} className="space-y-3">
                {/* Primary Contact Cards */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <h4 className="text-sm font-bold text-[#0F0F0F] flex items-center gap-2 border-b border-gray-100 pb-3">
                        <FiMail className="text-[#5B78FF]" /> Direct Communications
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={contactData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Primary Phone Number</label>
                            <input
                                type="text"
                                name="phone1"
                                value={contactData.phone1}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Secondary Phone Number</label>
                            <input
                                type="text"
                                name="phone2"
                                value={contactData.phone2}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>
                    </div>
                </div>

                {/* Location Information */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <h4 className="text-sm font-bold text-[#0F0F0F] flex items-center gap-2 border-b border-gray-100 pb-3">
                        <FiMapPin className="text-[#5B78FF]" /> Geographic Location
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
                            <input
                                type="text"
                                name="city"
                                value={contactData.city}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">State & Country Line</label>
                            <input
                                type="text"
                                name="state"
                                value={contactData.state}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Profiles */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <h4 className="text-sm font-bold text-[#0F0F0F] flex items-center gap-2 border-b border-gray-100 pb-3">
                        <FiShare2 className="text-[#5B78FF]" /> Social Links URL
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1 items-center gap-1"><FiGlobe size={12} /> Website URL</label>
                            <input
                                type="text"
                                name="websiteUrl"
                                value={contactData.websiteUrl}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1 items-center gap-1"><FaXTwitter size={12} /> X (Twitter) URL</label>
                            <input
                                type="text"
                                name="twitterUrl"
                                value={contactData.twitterUrl}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1 items-center gap-1"><FaInstagram size={12} /> Instagram URL</label>
                            <input
                                type="text"
                                name="instagramUrl"
                                value={contactData.instagramUrl}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>
                    </div>
                </div>

                {/* Form Action Footer */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-[#5B78FF] text-white px-6 py-3 rounded-xl font-medium text-sm shadow-md shadow-[#5B78FF]/20 hover:brightness-105 transition-all cursor-pointer"
                    >
                        <FiSave /> Save Contact Settings
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactTab;