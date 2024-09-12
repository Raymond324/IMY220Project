// src/components/HomePageComponent/AlbumCard.jsx
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './AlbumCard.css';

function AlbumCard({ albumImage, title, artist, album, duration, onAddToPlayList }) {
    return (
        <div className="album-card">
            <div className="album-image-container">
                <img src={albumImage} alt={title} className="album-cover" />
                <FaHeart className="like-icon" onClick={onAddToPlayList} /> {/* 点击喜欢按钮 */}
            </div>
            <div className="album-info">
                <h4>{title}</h4>
                <p>{artist}</p>
                <p>{album}</p>
                <p>{duration}</p>
            </div>
        </div>
    );
}

export default AlbumCard;
