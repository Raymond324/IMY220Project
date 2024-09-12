import React from 'react';
import './SignupPage.css';
import SignUpComponent from '../../components/SignupComponent/SignupComponent';
import { Link } from 'react-router-dom';  // Import Link for navigation

function SignUpPage() {
    return (
        <div className="signup-page">
            <div className="signup-page-bg"></div>
            <div className="signup-page-content">
                <img src="/assets/images/logo.png" alt="Logo" className="logo" />
                <h2 className="welcome-message">Join SoulEcho</h2>
                <SignUpComponent />
                <p className="login-message">
                    Do you already have an account? <Link to="/">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUpPage;
