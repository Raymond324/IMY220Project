import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage'; // Import LoginPage component
import SignUpPage from './pages/SignupPage/SignupPage';
import HomePage from './pages/HomePage/HomePage';
import PlayListPage from './pages/PlayListPage/PlayListPage';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/playlist-page" element={<PlayListPage />} />

            </Routes>
        </Router>
    );
}

// Get the root element from index.html and render the React app
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
