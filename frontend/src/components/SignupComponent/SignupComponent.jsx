import React, { useState } from 'react';
import './SignupComponent.css';

function SignUpComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

        if (password !== confirmPassword) {
            isValid = false;
            errors["confirmPassword"] = "Passwords do not match.";
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log("Email:", email);
            console.log("Password:", password);
            // Perform sign-up action here (you can later connect this to your backend)
        }
    };

    return (
        <div className="signup-component">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpComponent;
