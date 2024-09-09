import React, { useState } from 'react';
import './LoginComponent.css';

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

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

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log("Email:", email);
            console.log("Password:", password);
            // Perform login action here (you can later connect this to your backend)
        }
    };

    return (
        <div className="login-component">
            <form onSubmit={handleSubmit}>
                <div className="form-groups">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-groups">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginComponent;
