import React, { useState } from 'react';

const AboutTab = () => {
    const [profile, setProfile] = useState({
        fullName: "Rakesh Parvathneni",
        title: "UI/UX Designer",
        bio: "I'm a UI/UX Designer focused on creating clean, intuitive and engaging digital experiences. I enjoy transforming complex ideas into simple interfaces with strong visual hierarchy, thoughtful user flows and attention to detail.",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    });

    const [experiences, setExperiences] = useState([
        {
            period: "2025 - Present",
            role: "UI/UX Designer",
            company: "KBK Business Solutions Pvt. Ltd.",
            points: "Responsive Web & Landing Page Design\nSaaS & Enterprise Dashboard Design\nUser Flows & Wireframing\nHigh-Fidelity UI Design & Prototyping\nCompetitor & UX Research\nDeveloper Collaboration & Design Handoff"
        }
    ]);

    const [education, setEducation] = useState([
        { degree: "Certification Diploma in UI/UX Design", institution: "Creative Multimedia Academy, Dilsukhnagar" },
        { degree: "MBA (HR)", institution: "Sri Chaitanya Technical Campus (JNTUH)" },
        { degree: "B.Com", institution: "Siddhartha Degree College (OU)" }
    ]);

    const handleSave = (e) => {
        e.preventDefault();
        alert("About section changes saved successfully!");
    };

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
                                        const file = e.target.files[0];
                                        if (file) {
                                            const imageUrl = URL.createObjectURL(file);
                                            setProfile({ ...profile, imageUrl: imageUrl });
                                        }
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


            {/* Experience Section */}
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

            {/* Education Section */}
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

            {/* Submit Button */}
            <button type="submit" className="bg-[#5B78FF] text-white px-6 py-3 rounded-xl font-medium text-sm shadow-md shadow-[#5B78FF]/20 hover:bg-[#4a66e5] transition-colors">
                Save All Changes
            </button>
        </form>
    );
};

export default AboutTab;