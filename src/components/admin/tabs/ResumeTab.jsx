import React, { useState } from "react";
import {
    FiUploadCloud,
    FiFileText,
    FiCheckCircle,
    FiX,
    FiDownload,
    FiEye,
} from "react-icons/fi";
import { uploadResumeService } from "../../service/resume.service";

const ResumeTab = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];

        setMessage("");
        setError("");

        if (!file) return;

        // Check PDF
        if (file.type !== "application/pdf") {
            setError("Please select a PDF file only.");
            e.target.value = "";
            return;
        }

        // Check 5MB
        if (file.size > 5 * 1024 * 1024) {
            setError("File size must be less than 5MB.");
            e.target.value = "";
            return;
        }

        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a resume first.");
            return;
        }

        try {
            setIsUploading(true);
            setError("");
            setMessage("");

            const response = await uploadResumeService(selectedFile);

            setMessage(
                response?.message || "Resume uploaded successfully."
            );

            setSelectedFile(null);

            // Reset file input
            const fileInput = document.getElementById("resume-upload");
            if (fileInput) {
                fileInput.value = "";
            }
        } catch (err) {
            console.error("Resume upload error:", err);

            setError(
                err?.response?.data?.message ||
                "Failed to upload resume. Please try again."
            );
        } finally {
            setIsUploading(false);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setMessage("");
        setError("");

        const fileInput = document.getElementById("resume-upload");

        if (fileInput) {
            fileInput.value = "";
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "0 KB";

        const kb = bytes / 1024;

        if (kb < 1024) {
            return `${kb.toFixed(1)} KB`;
        }

        return `${(kb / 1024).toFixed(2)} MB`;
    };

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <div className="w-full min-h-full">
            {/* Header */}
            <div className="mb-6">
            
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">
                    Upload Resume
                </h2>

                <p className="text-sm text-gray-500 mt-2 max-w-xl">
                    Upload your latest resume PDF. The existing resume will be
                    replaced automatically when you upload a new one.
                </p>
            </div>

            {/* Main Card */}
            <div className="max-w-full bg-white border border-gray-100 rounded-3xl shadow-[0_8px_35px_rgba(15,23,42,0.05)] p-4 sm:p-6 lg:p-8">

                {/* Upload Area */}
                <label
                    htmlFor="resume-upload"
                    className="group block cursor-pointer"
                >
                    <div className="border-2 border-dashed border-gray-200 hover:border-[#5B78FF] rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 hover:bg-[#5B78FF]/2">

                        <div className="mx-auto w-16 h-16 rounded-2xl bg-[#5B78FF]/10 text-[#5B78FF] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                            <FiUploadCloud size={30} />
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-gray-900">
                            Select your resume
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                            Click here to choose a PDF file
                        </p>

                        <p className="text-xs text-gray-400 mt-3">
                            PDF only • Maximum size 5MB
                        </p>
                    </div>
                </label>

                <input
                    id="resume-upload"
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Selected File */}
                {selectedFile && (
                    <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                                <FiFileText size={21} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">
                                    {selectedFile.name}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    {formatFileSize(selectedFile.size)}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={removeFile}
                                className="w-9 h-9 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-200 flex items-center justify-center transition-colors"
                                title="Remove file"
                            >
                                <FiX size={17} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Success */}
                {message && (
                    <div className="mt-5 flex items-center gap-3 rounded-2xl bg-green-50 border border-green-100 px-4 py-3 text-green-700">
                        <FiCheckCircle className="shrink-0" size={19} />

                        <p className="text-sm font-medium">
                            {message}
                        </p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mt-5 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-red-600">
                        <p className="text-sm font-medium">
                            {error}
                        </p>
                    </div>
                )}

                {/* Upload Button */}
                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-[#5B78FF] hover:bg-[#4A68EE] disabled:bg-gray-200 disabled:text-gray-400 text-white py-3.5 px-5 text-sm font-bold transition-all duration-200 shadow-lg shadow-[#5B78FF]/20 disabled:shadow-none disabled:cursor-not-allowed"
                >
                    <FiUploadCloud size={18} />

                    {isUploading
                        ? "Uploading Resume..."
                        : "Upload Resume"}
                </button>

                {/* Resume Actions */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">

                    <a
                        href={`${backendUrl}/api/resume/view`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 text-sm font-semibold transition-colors"
                    >
                        <FiEye size={17} />
                        View Resume
                    </a>

                    <a
                        href={`${backendUrl}/api/resume/download`}
                        className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 text-sm font-semibold transition-colors"
                    >
                        <FiDownload size={17} />
                        Download Resume
                    </a>

                </div> */}
            </div>
        </div>
    );
};

export default ResumeTab;