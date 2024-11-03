import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaPlusCircle, FaMusic, FaTrashAlt } from 'react-icons/fa';
import './SideBar.css';

function Sidebar() {
    const [playlists, setPlaylists] = useState([]);

    // 获取所有播放列表
    const fetchPlaylists = async () => {
        try {
            const response = await fetch('/api/playlists');
            const data = await response.json();
            setPlaylists(data); // 更新播放列表
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    // 删除播放列表
    const handleDeletePlaylist = async (playlistId) => {
        try {
            const response = await fetch(`/api/playlists/${playlistId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setPlaylists(playlists.filter((playlist) => playlist._id !== playlistId));
            }
        } catch (error) {
            console.error('Error deleting playlist:', error);
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

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
                {playlists.map((playlist) => (
                    <li key={playlist._id} className="playlist-item">
                        <Link to={`/playlist-page/${playlist._id}`}>
                            <FaMusic className="icon" />
                            <span className="menu-text">{playlist.name}</span>
                        </Link>
                        <FaTrashAlt
                            className="delete-icon"
                            onClick={() => handleDeletePlaylist(playlist._id)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
