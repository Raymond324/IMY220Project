import React from 'react';
import { FaHeart } from 'react-icons/fa'; // 引入喜欢图标
import './AlbumCard.css';

function AlbumCard({ albumImage, title, artist, album, duration, onAddToPlayList }) {
    return (
        <div className="album-card">
            <img src={albumImage} alt={title} className="album-cover" />
            <div className="album-info">
                <h4>{title}</h4>
                <p>{artist}</p>
                <p>{album}</p>
                <p>{duration}</p>
                <FaHeart className="like-icon" onClick={onAddToPlayList} /> {/* 喜欢图标，点击添加到播放列表 */}
            </div>
        </div>
    );
}
//add comment
export default AlbumCard;
