import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Using a trash icon from react-icons
import './SongRow.css';

function SongRow({ index, song, onDelete }) {
    return (
        <div className="song-row">
            <span className="song-index">{index}</span>
            <img src={song.image} alt={song.title} className="song-image" />
            <div className="song-title">{song.title}</div>
            <div className="song-album">{song.album}</div>
            <div className="song-artist">{song.artist}</div>
            <div className="song-duration">{song.duration}</div>
            <FaTrashAlt className="delete-icon" onClick={() => onDelete(song.title)} />
        </div>
    );
}

export default SongRow;
