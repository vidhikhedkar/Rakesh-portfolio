// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../components/service/auth.service";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await loginService(formData);
            // Save user info to localStorage so ProtectedRoute allows access
            localStorage.setItem("userInfo", JSON.stringify(data.user));
            console.log("Login success:", data);
            navigate("/admin"); // Redirect securely to the admin dashboard
        } catch (err) {
            setError(err.message || "Failed to log in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-[#f4f6f8] py-6">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_15px_50px_rgba(35,45,80,0.06)]">
                <div className="mb-6 text-center">
                    <h2 className="text-[28px] font-bold tracking-tight text-[#111111]">Welcome Back</h2>
                    <p className="text-sm text-[#888888]">Please enter your details to sign in</p>
                </div>

                {error && (
                    <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-500 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="name@example.com"
                            className="w-full rounded-xl border border-gray-200 bg-[#f9fafc] px-4 py-3 text-sm text-[#111] focus:border-[#5B78FF] focus:bg-white focus:outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#666666] mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-gray-200 bg-[#f9fafc] px-4 py-3 text-sm text-[#111] focus:border-[#5B78FF] focus:bg-white focus:outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 rounded-xl bg-[#5B78FF] py-3 text-sm font-medium text-white shadow-md shadow-[#5B78FF]/20 transition-all hover:bg-[#4a65e0] disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;