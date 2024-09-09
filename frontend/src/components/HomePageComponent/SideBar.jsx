
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaHome, FaUser, FaPlusCircle, FaMusic } from 'react-icons/fa'; // Import icons
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li>
                    <Link to="/home">
                        <FaHome className="icon" />
                        <span className="menu-text">Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <FaUser className="icon" />
                        <span className="menu-text">Profile</span>
                    </Link>
                </li>
                <li>
                    <Link to="/create-playlist">
                        <FaPlusCircle className="icon" />
                        <span className="menu-text">Create Playlist</span>
                    </Link>
                </li>
            </ul>
            <hr className="divider" />
            <ul className="sidebar-playlist">
                <li>
                    <Link to="/playlist-page">
                        <FaMusic className="icon" />
                        <span className="menu-text">My Playlist 1</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
