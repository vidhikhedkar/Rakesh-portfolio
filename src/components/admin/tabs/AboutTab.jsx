import React, { useState, useEffect } from 'react';
import { fetchAboutData, updateAboutData } from '../../service/abouttab.service';

const AboutTab = () => {
    const [profile, setProfile] = useState({
        fullName: "",
        title: "",
        bio: "",
        imageUrl: "",
    });


    const [imageFile, setImageFile] = useState(null);
    const [experiences, setExperiences] = useState([]);
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchAboutData()
            .then((data) => {
                if (data) {
                    setProfile({
                        fullName: data.fullName || "",
                        title: data.title || "",
                        bio: data.bio || "",
                        imageUrl: data.imageUrl || "",
                    });
                    setExperiences(data.experiences || []);
                    setEducation(data.education || []);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load data", err);
                setLoading(false);
            });
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("fullName", profile.fullName);
            formData.append("title", profile.title);
            formData.append("bio", profile.bio);
            formData.append(
                "experiences",
                JSON.stringify(experiences)
            );
            formData.append(
                "education",
                JSON.stringify(education)
            );
            if (imageFile) {
                formData.append("image", imageFile);
            }
            const response = await updateAboutData(formData);
            console.log("Updated About Data:", response);
            if (response?.data) {
                setProfile({
                    fullName: response.data.fullName || "",
                    title: response.data.title || "",
                    bio: response.data.bio || "",
                    imageUrl: response.data.imageUrl || "",
                });
                setImageFile(null);
            }
            alert("About section changes saved successfully!");
        } catch (error) {
            console.error("Failed to save changes:", error);
            console.error(
                "Backend error:",
                error.response?.data
            );
            alert(
                error.response?.data?.details ||
                "Failed to save changes."
            );
        }
    };


    if (loading) {
        return <div className="p-6 text-sm text-gray-500">Loading about data...</div>;
    }


    return (
        <form onSubmit={handleSave} className="space-y-3 w-FULL pb-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <h4 className="text-base font-bold text-[#0F0F0F]">Edit Profile & Bio</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={profile.fullName}
                            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#5B78FF]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-gray-400 font-semibold mb-2 tracking-wider">Profile Image</label>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                            <div className="flex items-center gap-3.5">
                                <div className="relative h-14 w-14 rounded-xl bg-white overflow-hidden shrink-0 border border-gray-200 shadow-xs">
                                    {profile.imageUrl ? (
                                        <img
                                            src={profile.imageUrl}
                                            alt="Profile Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-medium bg-gray-100">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold text-[#0F0F0F]">Avatar Image</h5>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {profile.imageUrl ? "Image loaded successfully" : "Upload a PNG or JPG file"}
                                    </p>
                                </div>
                            </div>

                            <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5B78FF] hover:bg-[#4a65e0] text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer transition-all shrink-0">
                                <span>Browse File</span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        setImageFile(file);
                                        const previewUrl = URL.createObjectURL(file);
                                        setProfile((prev) => ({
                                            ...prev,
                                            imageUrl: previewUrl,
                                        }));
                                    }}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Bio Description</label>
                        <textarea
                            rows={4}
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-[#5B78FF]"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <h4 className="text-base font-bold text-[#0F0F0F]">Edit Experience</h4>
                {experiences.map((exp, index) => (
                    <div key={index} className="space-y-3 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Time Period</label>
                                <input
                                    type="text"
                                    value={exp.period}
                                    onChange={(e) => {
                                        const updated = [...experiences];
                                        updated[index].period = e.target.value;
                                        setExperiences(updated);
                                    }}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Role / Job Title</label>
                                <input
                                    type="text"
                                    value={exp.role}
                                    onChange={(e) => {
                                        const updated = [...experiences];
                                        updated[index].role = e.target.value;
                                        setExperiences(updated);
                                    }}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Company Name</label>
                            <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => {
                                    const updated = [...experiences];
                                    updated[index].company = e.target.value;
                                    setExperiences(updated);
                                }}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Bullet Points (Put each on a new line)</label>
                            <textarea
                                rows={5}
                                value={exp.points}
                                onChange={(e) => {
                                    const updated = [...experiences];
                                    updated[index].points = e.target.value;
                                    setExperiences(updated);
                                }}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#5B78FF] no-scrollbar"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
                <h4 className="text-base font-bold text-[#0F0F0F]">Edit Education</h4>
                {education.map((edu, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-b border-gray-50 pb-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Degree / Certification</label>
                            <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => {
                                    const updated = [...education];
                                    updated[index].degree = e.target.value;
                                    setEducation(updated);
                                }}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Institution</label>
                            <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => {
                                    const updated = [...education];
                                    updated[index].institution = e.target.value;
                                    setEducation(updated);
                                }}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#5B78FF]"
                            />
                        </div>
                    </div>
                ))}
            </div>


            <button type="submit" className="bg-[#5B78FF] text-white px-6 py-3 rounded-xl font-medium text-sm shadow-md shadow-[#5B78FF]/20 hover:bg-[#4a66e5] transition-colors cursor-pointer">
                Save All Changes
            </button>
        </form>
    );
};

export default AboutTab;