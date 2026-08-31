import React, { useState, useEffect } from 'react';
import { FiSave, FiPlus, FiTrash2, FiUploadCloud, FiX } from 'react-icons/fi';
import { getProfileService, updateProfileService } from '../../service/profiletab.service';

const ProfileTab = () => {
    const [profile, setProfile] = useState({
        name: '',
        handle: '',
        avatar: '',
        about: '',
        experience: {
            duration: '',
            role: '',
            company: '',
            description: ''
        },
        education: [],
        skills: [],
        tools: [],
        certification: []
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savedMessage, setSavedMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [saveMessage, setSaveMessage] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await getProfileService();
                const data = response.data || response;
                if (data) {
                    setProfile({
                        name: data.name || '',
                        handle: data.handle || '',
                        avatar: data.avatar || '',
                        about: data.about || '',
                        experience: data.experience || { duration: '', role: '', company: '', description: '' },
                        education: data.education || [],
                        skills: data.skills || [],
                        tools: data.tools || [],
                        certification: Array.isArray(data.certification)
                            ? data.certification
                            : data.certification
                                ? [data.certification]
                                : []
                    });
                }
                setErrorMessage('');
            } catch (err) {
                setErrorMessage(err.message || 'Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const triggerMessage = (msg) => {
        setSaveMessage(msg);
        setSavedMessage(true);

        setTimeout(() => {
            setSavedMessage(false);
            setSaveMessage('');
        }, 3000);
    };

    const handleBasicChange = (field, value) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const processFile = (file) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setErrorMessage('Please select a valid image file');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfile((prev) => ({ ...prev, avatar: reader.result }));
            setErrorMessage('');
        };
        reader.onerror = () => {
            setErrorMessage('Failed to read the image file');
        };
        reader.readAsDataURL(file);
    };

    const handleAvatarUpload = (e) => {
        processFile(e.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleRemoveAvatar = () => {
        setProfile((prev) => ({ ...prev, avatar: '' }));
    };

    const handleExperienceChange = (field, value) => {
        setProfile((prev) => ({
            ...prev,
            experience: { ...prev.experience, [field]: value }
        }));
    };

    const handleCertificationChange = (index, field, value) => {
        const updated = [...profile.certification];

        updated[index] = {
            ...updated[index],
            [field]: value
        };

        setProfile((prev) => ({
            ...prev,
            certification: updated
        }));
    };

    const handleAddCertification = () => {
        setProfile((prev) => ({
            ...prev,
            certification: [
                ...(prev.certification || []),
                {
                    title: '',
                    academy: ''
                }
            ]
        }));

        triggerMessage('Certification added successfully!');
    };

    const handleDeleteCertification = (index) => {
        setProfile((prev) => ({
            ...prev,
            certification: prev.certification.filter(
                (_, i) => i !== index
            )
        }));

        triggerMessage('Certification deleted successfully!');
    };


    const handleArrayChange = (field, index, value) => {
        const updated = [...profile[field]];
        updated[index] = value;
        setProfile((prev) => ({ ...prev, [field]: updated }));
    };

    const handleAddArrayItem = (field, defaultValue = '') => {
        setProfile((prev) => ({
            ...prev,
            [field]: [...(prev[field] || []), defaultValue]
        }));

        triggerMessage('Data added successfully!');
    };

    const handleDeleteArrayItem = (field, index) => {
        const updated = profile[field].filter((_, i) => i !== index);
        setProfile((prev) => ({ ...prev, [field]: updated }));
        triggerMessage('Data edited successfully!');
    };

    const handleEducationChange = (index, field, value) => {
        const updated = [...profile.education];
        updated[index][field] = value;
        setProfile((prev) => ({ ...prev, education: updated }));
    };

    const handleAddEducation = () => {
        setProfile((prev) => ({
            ...prev,
            education: [...prev.education, { title: '', academy: '' }]
        }));
        triggerMessage('Data added successfully!');
    };

    const handleDeleteEducation = (index) => {
        const updated = profile.education.filter((_, i) => i !== index);
        setProfile((prev) => ({ ...prev, education: updated }));
        triggerMessage('Data edited successfully!');
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            setErrorMessage('');

            const response = await updateProfileService(profile);
            const updatedData = response.data || response;

            if (updatedData) {
                setProfile((prev) => ({
                    ...prev,
                    ...updatedData
                }));
            }

            triggerMessage('Data edited successfully!');
        } catch (err) {
            setErrorMessage(err.message || err.error || 'Failed to save profile settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24 bg-white rounded-2xl">
                <p className="text-sm text-gray-400 animate-pulse">Loading profile configurations...</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3 bg-white p-3 rounded-2xl">
                <div>
                    <h3 className="text-lg font-bold text-[#0F0F0F]">Manage Profile</h3>
                    <p className="text-xs text-gray-500">Update your personal details, experience, education, skills, and tools.</p>
                </div>
                <div className="flex items-center gap-3">
                    {savedMessage && (
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 animate-in fade-in transition-all">
                            {saveMessage}
                        </span>
                    )}
                </div>
            </div>

            {errorMessage && (
                <div className="mb-3 p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <h4 className="text-sm font-bold text-[#0F0F0F] border-b border-gray-100 pb-2">Basic Info</h4>

                    <div className="pt-3 border-t border-gray-100">
                        <label className="block text-xs uppercase text-gray-400 font-semibold mb-2 tracking-wider">Profile Image</label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-linear-to-r from-gray-50 to-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-inner">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border-2 border-white shadow-md">
                                    {profile.avatar ? (
                                        <img
                                            src={profile.avatar}
                                            alt="Hero Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-gray-400 font-medium bg-gray-50">
                                            <span>No</span>
                                            <span>Image</span>
                                        </div>
                                    )}
                                    {profile.avatar && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveAvatar}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors cursor-pointer"
                                            title="Remove Image"
                                        >
                                            <FiX size={12} />
                                        </button>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-sm font-bold text-[#0F0F0F]">Profile Avatar</h5>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {profile.avatar ? "Active profile image uploaded." : "No image uploaded yet."}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto">
                                <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5B78FF] hover:bg-[#4a65e0] text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer transition-all w-full sm:w-auto">
                                    <FiUploadCloud size={14} />
                                    <span>Choose File</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-medium text-gray-500 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={profile.name || ''}
                                onChange={(e) => handleBasicChange('name', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-gray-500 mb-1">Handle / Username</label>
                            <input
                                type="text"
                                value={profile.handle || ''}
                                onChange={(e) => handleBasicChange('handle', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[11px] font-medium text-gray-500 mb-1">About Me</label>
                        <textarea
                            rows={3}
                            value={profile.about || ''}
                            onChange={(e) => handleBasicChange('about', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                        />
                    </div>
                </div>

                {/* Experience Section */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <h4 className="text-sm font-bold text-[#0F0F0F] border-b border-gray-100 pb-2">Experience</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[11px] font-medium text-gray-500 mb-1">Duration</label>
                            <input
                                type="text"
                                value={profile.experience?.duration || ''}
                                onChange={(e) => handleExperienceChange('duration', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-gray-500 mb-1">Role / Job Title</label>
                            <input
                                type="text"
                                value={profile.experience?.role || ''}
                                onChange={(e) => handleExperienceChange('role', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-medium text-gray-500 mb-1">Company</label>
                            <input
                                type="text"
                                value={profile.experience?.company || ''}
                                onChange={(e) => handleExperienceChange('company', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[11px] font-medium text-gray-500 mb-1">Description</label>
                        <textarea
                            rows={2}
                            value={profile.experience?.description || ''}
                            onChange={(e) => handleExperienceChange('description', e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                        />
                    </div>
                </div>

                {/* Education Section */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <h4 className="text-sm font-bold text-[#0F0F0F]">Education</h4>
                        <button
                            type="button"
                            onClick={handleAddEducation}
                            className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-gray-200 cursor-pointer"
                        >
                            <FiPlus size={13} /> Add Education
                        </button>
                    </div>
                    <div className="space-y-3">
                        {profile.education?.map((edu, index) => (
                            <div key={index} className="flex gap-3 items-center bg-gray-50 p-3 rounded-xl border border-gray-200">
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Course/Degree title"
                                        value={edu.title || edu.degree || ''}
                                        onChange={(e) => handleEducationChange(index, 'title', e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#5B78FF]"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Academy/Institution"
                                        value={edu.academy || edu.institution || ''}
                                        onChange={(e) => handleEducationChange(index, 'academy', e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#5B78FF]"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteEducation(index)}
                                    className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Section */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <h4 className="text-sm font-bold text-[#0F0F0F]">Skills</h4>
                        <button
                            type="button"
                            onClick={() => handleAddArrayItem('skills', '')}
                            className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-gray-200 cursor-pointer"
                        >
                            <FiPlus size={13} /> Add Skill
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {profile.skills?.map((skill, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={skill}
                                    onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteArrayItem('skills', index)}
                                    className="text-red-500 hover:text-red-700 p-2 cursor-pointer"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tools Section */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <h4 className="text-sm font-bold text-[#0F0F0F]">Tools</h4>
                        <button
                            type="button"
                            onClick={() => handleAddArrayItem('tools', '')}
                            className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-gray-200 cursor-pointer"
                        >
                            <FiPlus size={13} /> Add Tool
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {profile.tools?.map((tool, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={tool}
                                    onChange={(e) => handleArrayChange('tools', index, e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteArrayItem('tools', index)}
                                    className="text-red-500 hover:text-red-700 p-2 cursor-pointer"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certification Section */}
                {/* Certification Section */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">

                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">

                        <h4 className="text-sm font-bold text-[#0F0F0F]">
                            Certification
                        </h4>

                        <button
                            type="button"
                            onClick={handleAddCertification}
                            className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-gray-200 cursor-pointer"
                        >
                            <FiPlus size={13} />
                            Add Certification
                        </button>

                    </div>

                    <div className="space-y-3">

                        {Array.isArray(profile.certification) &&
                            profile.certification.map((cert, index) => (

                                <div
                                    key={index}
                                    className="flex gap-3 items-center bg-gray-50 p-3 rounded-xl border border-gray-200"
                                >

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">

                                        {/* Certification Title */}
                                        <input
                                            type="text"
                                            placeholder="Certification title"
                                            value={cert.title || ''}
                                            onChange={(e) =>
                                                handleCertificationChange(
                                                    index,
                                                    'title',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                                        />

                                        {/* Academy */}
                                        <input
                                            type="text"
                                            placeholder="Academy / Institution"
                                            value={cert.academy || ''}
                                            onChange={(e) =>
                                                handleCertificationChange(
                                                    index,
                                                    'academy',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                                        />

                                    </div>

                                    {/* Delete */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteCertification(index)
                                        }
                                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                                        title="Delete Certification"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>

                                </div>

                            ))}

                        {/* Empty State */}
                        {(!profile.certification ||
                            profile.certification.length === 0) && (
                                <div className="text-center py-6 text-xs text-gray-400">
                                    No certifications added yet.
                                </div>
                            )}

                    </div>
                </div>

                {/* Form Action Footer */}
                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-[#5B78FF] text-white px-6 py-3 rounded-xl font-medium text-sm shadow-md shadow-[#5B78FF]/20 hover:brightness-105 transition-all cursor-pointer disabled:opacity-50"
                    >
                        <FiSave /> {saving ? 'Saving...' : 'Save Profile Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileTab;