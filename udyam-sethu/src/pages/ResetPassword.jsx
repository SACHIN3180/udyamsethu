import React, { useState } from "react";
import {
    LockKeyhole,
    Eye,
    EyeOff,
    ArrowRight,
    ArrowLeft
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {

    const navigate = useNavigate();

    const { token } = useParams();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.password ||
            !formData.confirmPassword
        ) {
            alert("Please enter both passwords");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:5000/api/auth/reset-password/${token}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        password: formData.password,
                        confirmPassword: formData.confirmPassword
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Password reset successfully!");

            navigate("/udyamsethu/login");

        } catch (error) {

            console.error(
                "Reset password error:",
                error
            );

            alert(
                "Unable to connect to the server."
            );
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

            <div className="w-full max-w-md">

                {/* Heading */}
                <div className="mb-8">

                    <p className="text-sm font-medium text-cyan-600 mb-2">
                        PASSWORD RECOVERY
                    </p>

                    <h2 className="text-3xl font-bold text-slate-900">
                        Create a new password
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Enter your new password below.
                    </p>

                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">

                    <form onSubmit={handleSubmit}>

                        {/* Password */}
                        <div className="mb-5">

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                New Password
                            </label>

                            <div className="relative">

                                <LockKeyhole
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                    required
                                    className="
                                        w-full
                                        h-12
                                        pl-11
                                        pr-12
                                        rounded-lg
                                        border
                                        border-slate-300
                                        bg-slate-50
                                        text-slate-900
                                        outline-none
                                        focus:border-cyan-500
                                        focus:ring-4
                                        focus:ring-cyan-500/10
                                    "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6">

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Confirm Password
                            </label>

                            <div className="relative">

                                <LockKeyhole
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm new password"
                                    required
                                    className="
                                        w-full
                                        h-12
                                        pl-11
                                        pr-12
                                        rounded-lg
                                        border
                                        border-slate-300
                                        bg-slate-50
                                        text-slate-900
                                        outline-none
                                        focus:border-cyan-500
                                        focus:ring-4
                                        focus:ring-cyan-500/10
                                    "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="
                                w-full
                                h-12
                                rounded-lg
                                bg-[#0B1F3A]
                                hover:bg-[#102B4F]
                                text-white
                                font-semibold
                                flex
                                items-center
                                justify-center
                                gap-2
                                transition-all
                                duration-200
                                shadow-lg
                            "
                        >
                            Reset Password
                            <ArrowRight size={18} />
                        </button>

                    </form>

                    {/* Back */}
                    <div className="text-center mt-6 pt-6 border-t border-slate-100">

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/udyamsethu/login")
                            }
                            className="
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                font-semibold
                                text-cyan-600
                                hover:text-cyan-700
                                hover:underline
                            "
                        >
                            <ArrowLeft size={16} />
                            Back to Login
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ResetPassword;