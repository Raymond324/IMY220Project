// src/components/SignupComponent/SignupComponent.jsx
import React, { useState } from 'react';
import './SignupComponent.css';
import { useNavigate } from 'react-router-dom'; // 导入useNavigate钩子

function SignUpComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // 创建navigate函数实例

    const validate = () => {
        let errors = {};
        let isValid = true;

        if (!email) {
            isValid = false;
            errors["email"] = "Please enter your email.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            isValid = false;
            errors["email"] = "Please enter a valid email address.";
        }

        if (!password) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (password !== confirmPassword) {
            isValid = false;
            errors["confirmPassword"] = "Passwords do not match.";
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.status === 201) {
                alert('Sign up successful. You can now log in.'); // 使用alert显示注册成功信息
                navigate('/'); // 导航到登录页面
            } else {
                setErrors({ form: data.message });
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-dark border border-dark rounded-lg">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-bold text-light">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-2 block">{errors.email}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 font-bold text-light">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
                    />
                    {errors.password && <span className="text-red-500 text-xs mt-2 block">{errors.password}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block mb-2 font-bold text-light">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
                {errors.form && <span className="text-red-500 text-xs block">{errors.form}</span>}
                {message && <span className="text-green-500 text-xs block">{message}</span>}
                <button type="submit" className="w-full py-3 bg-primary text-white rounded-md hover:bg-yellow-500 transition duration-300 mt-4">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpComponent;
