import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate

function Header({ searchTerm, setSearchTerm }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user'); // 清除 localStorage 中的用户信息
        navigate('/'); // 跳转到登录页面
    };

    return (
        <div className="header flex justify-between items-center w-full py-4 px-6 bg-dark text-light">
            <div className="search-bar-container relative w-[80%] max-w-md mx-auto">
                <FaSearch className="search-icon absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    className="search-bar w-full py-2 pl-10 text-sm rounded-full border border-gray-300 shadow-md focus:outline-none focus:border-primary focus:ring focus:ring-primary"
                    placeholder="Search for a song, album, or artist"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button
                className="logout-button bg-primary text-white px-6 py-2 rounded-full ml-4 hover:bg-hoverRed transition duration-300"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export default Header;
