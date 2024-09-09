import React from 'react';
import './LoginPage.css';
import LoginComponent from '../../components/LoginComponent/LoginComponent';
import { Link } from 'react-router-dom';
function LoginPage() {
    return (
        <div className="login-page">
            <div className="login-page-bg"></div>
            <div className="login-page-content">
                <img src="/assets/images/logo.png" alt="Logo" className="logo" />
                <h2 className="welcome-message">Welcome to SoulEcho</h2>
                <LoginComponent />
                <p className="signup-message">
                    Don’t have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
