import React, { useState, useEffect } from 'react';
import { FiGlobe, FiTwitter, FiInstagram, FiFacebook, FiMail, FiCheckCircle } from 'react-icons/fi';
import { getProfileService } from '../service/profiletab.service';

const Profile = () => {
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

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const data = await getProfileService();
                if (data) {
                    setProfile({
                        name: data.name || '',
                        handle: data.handle ? `@${data.handle.replace(/^@/, '')}` : '',
                        avatar: data.avatar || '',
                        about: data.about || '',
                        experience: {
                            duration: data.experience?.duration || '',
                            role: data.experience?.role || '',
                            company: data.experience?.company || '',
                            description: data.experience?.description || ''
                        },
                        education: Array.isArray(data.education) ? data.education : [],
                        skills: Array.isArray(data.skills) ? data.skills : [],
                        tools: Array.isArray(data.tools) ? data.tools : [],
                        certification: Array.isArray(data.certification) ? data.certification : []
                    });
                }
            } catch (err) {
                console.error('Failed to load profile component data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24 bg-[#F8F9FA]">
                <p className="text-sm text-gray-400 animate-pulse">Loading profile...</p>
            </div>
        );
    }

    return (
        <section className="bg-[#F8F9FA] flex items-center justify-center py-10">
            <div className="container flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

                {/* Left Profile Card Column */}
                <div className="w-full lg:w-[320px] shrink-0 bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-xs">
                    {/* Avatar */}
                    <div className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-2xl bg-linear-to-b from-[#5B78F6] to-[#3B59E8] overflow-hidden shadow-md mb-6">
                        {profile.avatar ? (
                            <img
                                src={profile.avatar}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-white">
                                No Avatar
                            </div>
                        )}
                    </div>

                    {/* Name & Handle */}
                    {profile.name && (
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#0F0F0F] tracking-tight">
                            {profile.name}
                        </h2>
                    )}
                    {profile.handle && (
                        <p className="text-xs sm:text-sm text-[#BCBCBC] mt-2 mb-6">
                            {profile.handle.startsWith('@') ? profile.handle : `@${profile.handle}`}
                        </p>
                    )}

                    {/* Social Icons */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <a href="#website" aria-label="Website" className="h-10 w-10 rounded-full bg-white border border-gray-400 flex items-center justify-center text-[#5B78F6] hover:text-[#5B78F6] hover:border-[#5B78F6] transition-all shadow-xs">
                            <FiGlobe size={16} />
                        </a>
                        <a href="#twitter" aria-label="Twitter" className="h-10 w-10 rounded-full bg-white border border-gray-400 flex items-center justify-center text-[#5B78F6] hover:text-[#5B78F6] hover:border-[#5B78F6] transition-all shadow-xs">
                            <FiTwitter size={16} />
                        </a>
                        <a href="#instagram" aria-label="Instagram" className="h-10 w-10 rounded-full bg-white border border-gray-400 flex items-center justify-center text-[#5B78F6] hover:text-[#5B78F6] hover:border-[#5B78F6] transition-all shadow-xs">
                            <FiInstagram size={16} />
                        </a>
                        <a href="#facebook" aria-label="Facebook" className="h-10 w-10 rounded-full bg-white border border-gray-400 flex items-center justify-center text-[#5B78F6] hover:text-[#5B78F6] hover:border-[#5B78F6] transition-all shadow-xs">
                            <FiFacebook size={16} />
                        </a>
                    </div>

                    {/* Contact Button */}
                    <a
                        href="#contact"
                        className="w-full py-3 bg-[#323232] hover:bg-[#333333] text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <FiMail size={15} />
                        Contact Me
                    </a>
                </div>

                {/* Right Details Column */}
                <div className="flex-1 space-y-10 w-full">

                    {/* About Me */}
                    {profile.about && (
                        <div className="space-y-8 pb-10">
                            <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#0F0F0F]">
                                About Me
                            </h3>
                            <p className="text-sm sm:text-base text-[#949597] leading-relaxed font-normal">
                                {profile.about}
                            </p>
                        </div>
                    )}

                    {/* Experience */}
                    {(profile.experience?.duration || profile.experience?.role || profile.experience?.company || profile.experience?.description) && (
                        <div className="space-y-4 pb-4">
                            <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#0F0F0F]">
                                Experience
                            </h3>
                            <div className="space-y-1.5">
                                {profile.experience?.duration && (
                                    <span className="text-[16px] sm:text-xs font-semibold tracking-wide text-[#BCBCBC] uppercase">
                                        {profile.experience.duration}
                                    </span>
                                )}
                                {profile.experience?.role && (
                                    <h4 className="text-base sm:text-lg font-semibold text-[#5B78F6]">
                                        {profile.experience.role}
                                    </h4>
                                )}
                                {profile.experience?.company && (
                                    <p className="text-xs sm:text-sm font-regular text-[#BCBCBC]">
                                        {profile.experience.company}
                                    </p>
                                )}
                                {profile.experience?.description && (
                                    <p className="text-sm text-[#949597] leading-relaxed pt-1">
                                        {profile.experience.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {profile.education?.length > 0 && (
                        <div className="space-y-7">
                            <h3 className="text-xs font-medium uppercase tracking-wide text-[#0F0F0F] sm:text-sm">
                                Education
                            </h3>
                            <div className="space-y-6">
                                {profile.education.map((edu, index) => (
                                    <div key={index} className="space-y-2">
                                        <span className="block text-sm leading-none text-[#5B78F6]">
                                            *
                                        </span>
                                        <div>
                                            {(edu.title || edu.degree) && (
                                                <h4 className="text-base font-medium leading-tight text-[#5B78F6] sm:text-lg">
                                                    {edu.title || edu.degree}
                                                </h4>
                                            )}
                                            {(edu.academy || edu.institution) && (
                                                <p className="mt-1 text-xs leading-5 text-[#BCBCBC] sm:text-sm">
                                                    {edu.academy || edu.institution}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {profile.skills?.length > 0 && (
                        <div className="space-y-8">
                            <h3 className="text-xs sm:text-lg font-bold tracking-widest uppercase text-[#0F0F0F]">
                                Skills
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {profile.skills.map((skill, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3.5 bg-white rounded-xl shadow-2xs">
                                        <FiCheckCircle className="text-[#737688] shrink-0" size={18} />
                                        <span className="text-xs sm:text-sm font-semibold text-[#191C1D]">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tools & Certification Grid */}
                    {(profile.tools?.length > 0 || profile.certification?.length > 0) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Tools */}
                            {profile.tools?.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#0F0F0F]">
                                        Tools
                                    </h3>
                                    <ul className="space-y-2 text-sm sm:text-base font-regular text-[#434656]">
                                        {profile.tools.map((tool, index) => (
                                            <li key={index}>{tool}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Certification */}
                            {profile.certification?.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#191C1D]">
                                        Certification
                                    </h3>
                                    <div className="space-y-3">
                                        {profile.certification.map((cert, index) => (
                                            <div key={index} className="space-y-1">
                                                {cert.title && (
                                                    <h4 className="text-sm sm:text-base font-bold text-[#0F0F0F]">
                                                        {cert.title}
                                                    </h4>
                                                )}
                                                {cert.academy && (
                                                    <p className="text-xs sm:text-sm text-[#737688]">
                                                        {cert.academy}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </div>

            </div>
        </section>
    );
};

export default Profile;