import React, { useState, useEffect } from 'react';
import { FiEdit3, FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';
import { getHomeContentService, updateHomeContentService } from '../../service/hometab.service';


const HomeTab = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


    const [profileData, setProfileData] = useState({
        role: "",
        firstName: "",
        lastName: "",
        location: "",
        experienceYears: "",
        clientsCount: "",
        totalProjectsCount: "",
        tickerText: "",
        ctaHeading: "",
        imageUrl: ""
    });

   
    
    const [services, setServices] = useState([]);


    
    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                const res = await getHomeContentService();
                if (res && res.data) {
                    const data = res.data;
                    setProfileData({
                        role: data.role || "",
                        firstName: data.firstName || "",
                        lastName: data.lastName || "",
                        location: data.location || "",
                        experienceYears: data.experienceYears || "",
                        clientsCount: data.clientsCount || "",
                        totalProjectsCount: data.totalProjectsCount || "",
                        tickerText: data.tickerText || "",
                        ctaHeading: data.ctaHeading || "",
                        imageUrl: data.imageUrl || ""
                    });
                    if (data.services && data.services.length > 0) {
                        setServices(data.services);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch home content:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);



    const handleProfileChange = (field, value) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };


    const handleServiceChange = (index, value) => {
        const updated = [...services];
        updated[index].title = value;
        setServices(updated);
    };


    const addService = () => {
        setServices([...services, { title: "New Service" }]);
    };


    const removeService = (index) => {
        setServices(services.filter((_, i) => i !== index));
    };


    const handleEditToggle = async () => {
        if (isEditing) {
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append("role", profileData.role);
                formData.append("firstName", profileData.firstName);
                formData.append("lastName", profileData.lastName);
                formData.append("location", profileData.location);
                formData.append("experienceYears", profileData.experienceYears);
                formData.append("clientsCount", profileData.clientsCount);
                formData.append("totalProjectsCount", profileData.totalProjectsCount);
                formData.append("tickerText", profileData.tickerText);
                formData.append("ctaHeading", profileData.ctaHeading);
                formData.append("services", JSON.stringify(services));
                if (selectedFile) {
                    formData.append("image", selectedFile);
                }
                const res = await updateHomeContentService(formData);
                if (res && res.data) {
                    setProfileData(prev => ({
                        ...prev,
                        ...res.data,
                        imageUrl: res.data.imageUrl || prev.imageUrl
                    }));
                }
                setSelectedFile(null);
                setIsEditing(false);
                alert("Changes saved successfully!");
            } catch (error) {
                console.error("Failed to update home content:", error);
                alert("Failed to save changes.");
            } finally {
                setLoading(false);
            }
        } else {
            setIsEditing(true);
        }
    };


    return (
        <div className="space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0F0F0F]">Home Page Admin Panel</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Modify metrics, profile copy, stats, and content displayed on the home page view.</p>
                </div>
                <button
                    onClick={handleEditToggle}
                    disabled={loading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#5B78FF] text-white text-sm font-medium hover:bg-[#4a65e0] transition shadow-sm cursor-pointer shrink-0 disabled:opacity-50"
                >
                    {isEditing ? <><FiSave /> {loading ? "Saving..." : "Save Changes"}</> : <><FiEdit3 /> Edit Home Content</>}
                </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <h4 className="text-base font-bold text-[#0F0F0F]">Hero Profile Configuration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Professional Role</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileData.role}
                                onChange={(e) => handleProfileChange('role', e.target.value)}
                                className="w-full p-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        ) : (
                            <p className="text-sm font-semibold text-gray-800 bg-gray-50 p-2 rounded-xl">{profileData.role}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-gray-400 font-medium mb-1">First & Last Name</label>
                        <div className="flex gap-2">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        value={profileData.firstName}
                                        onChange={(e) => handleProfileChange('firstName', e.target.value)}
                                        className="w-1/2 p-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B78FF]"
                                    />
                                    <input
                                        type="text"
                                        value={profileData.lastName}
                                        onChange={(e) => handleProfileChange('lastName', e.target.value)}
                                        className="w-1/2 p-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B78FF]"
                                    />
                                </>
                            ) : (
                                <p className="text-sm font-semibold text-gray-800 bg-gray-50 p-2 rounded-xl w-full">{profileData.firstName} {profileData.lastName}</p>
                            )}
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Bio / Location Subtitle</label>
                        {isEditing ? (
                            <textarea
                                value={profileData.location}
                                onChange={(e) => handleProfileChange('location', e.target.value)}
                                className="w-full p-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B78FF]"
                                rows="2"
                            />
                        ) : (
                            <p className="text-sm font-medium text-gray-700 bg-gray-50 p-2 rounded-xl">{profileData.location}</p>
                        )}
                    </div>

                    <div className="md:col-span-2 pt-3 border-t border-gray-100">
                        <label className="block text-xs uppercase text-gray-400 font-semibold mb-2 tracking-wider">Hero Profile Image</label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-linear-to-r from-gray-50 to-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-inner">

                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border-2 border-white shadow-md">
                                    {profileData.imageUrl ? (
                                        <img
                                            src={profileData.imageUrl}
                                            alt="Hero Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-gray-400 font-medium bg-gray-50">
                                            <span>No</span>
                                            <span>Image</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h5 className="text-sm font-bold text-[#0F0F0F]">Profile Avatar</h5>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {profileData.imageUrl ? "Active profile image uploaded." : "No image uploaded yet."}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full sm:w-auto">
                                {isEditing && (
                                    <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5B78FF] hover:bg-[#4a65e0] text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer transition-all w-full sm:w-auto">
                                        <span>Choose File</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setSelectedFile(file);
                                                    handleProfileChange('imageUrl', URL.createObjectURL(file));
                                                }
                                            }}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <h4 className="text-base font-bold text-[#0F0F0F]">Counters & Ticker Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Experience Years</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileData.experienceYears}
                                onChange={(e) => handleProfileChange('experienceYears', e.target.value)}
                                className="w-full p-2 border border-gray-200 rounded-xl text-sm"
                            />
                        ) : (
                            <p className="text-sm font-semibold text-gray-800 bg-gray-50 p-2 rounded-xl">{profileData.experienceYears}</p>
                        )}
                    </div>
                    
                    <div>
                        <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Clients Count</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileData.clientsCount}
                                onChange={(e) => handleProfileChange('clientsCount', e.target.value)}
                                className="w-full p-2 border border-gray-200 rounded-xl text-sm"
                            />
                        ) : (
                            <p className="text-sm font-semibold text-gray-800 bg-gray-50 p-2 rounded-xl">{profileData.clientsCount}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Total Projects</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileData.totalProjectsCount}
                                onChange={(e) => handleProfileChange('totalProjectsCount', e.target.value)}
                                className="w-full p-2 border border-gray-200 rounded-xl text-sm"
                            />
                        ) : (
                            <p className="text-sm font-semibold text-gray-800 bg-gray-50 p-2 rounded-xl">{profileData.totalProjectsCount}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs uppercase text-gray-400 font-medium mb-1">Ticker Text Content</label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileData.tickerText}
                                onChange={(e) => handleProfileChange('tickerText', e.target.value)}
                                className="w-full p-2 border border-gray-200 rounded-xl text-sm"
                            />
                        ) : (
                            <p className="text-sm font-semibold text-gray-800 bg-gray-50 p-2 rounded-xl">{profileData.tickerText}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-base font-bold text-[#0F0F0F]">Services Offerings Manager</h4>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={addService}
                            className="flex items-center gap-1 text-xs text-[#5B78FF] font-medium bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                        >
                            <FiPlus /> Add Service
                        </button>
                    )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {services.map((service, index) => (
                        <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        value={service.title}
                                        onChange={(e) => handleServiceChange(index, e.target.value)}
                                        className="w-full p-1.5 border border-gray-200 rounded-lg text-sm bg-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeService(index)}
                                        className="text-red-400 hover:text-red-600 p-1"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </>
                            ) : (
                                <span className="text-sm font-medium text-gray-700">{service.title}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeTab;