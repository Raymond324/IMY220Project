import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './Header.css';

function Header({ searchTerm, setSearchTerm }) {
    return (
        <div className="header">
            <div className="search-bar-container">
                <FaSearch className="search-icon" />  {/* The search icon */}
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search for a song, album, or artist"
                    value={searchTerm}  // Bind the input value to searchTerm state
                    onChange={(e) => setSearchTerm(e.target.value)}  // Update state on input change
                />
            </div>
        </div>
    );
}

export default Header;
