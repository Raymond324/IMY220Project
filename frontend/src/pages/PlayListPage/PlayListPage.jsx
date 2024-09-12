// src/pages/PlayListPage/PlayListPage.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/HomePageComponent/Sidebar';
import Header from '../../components/HomePageComponent/Header';
import SongRow from '../../components/PlayListPage/SongRow';
import './PlayListPage.css';

function PlayListPage({ playList, setPlayList }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (songTitle) => {
        const updatedSongs = playList.filter((song) => song.title !== songTitle);
        setPlayList(updatedSongs);
    };

    const handleComment = (songTitle, comment, isAdd = false) => {
        const updatedSongs = playList.map((song) => {
            if (song.title === songTitle) {
                if (isAdd) {
                    return { ...song, comments: [...song.comments, comment] };
                } else {
                    return { ...song, comments: song.comments.filter((c) => c !== comment) };
                }
            }
            return song;
        });
        setPlayList(updatedSongs);
    };

    const filteredSongs = playList.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="playlist">
            <Sidebar />
            <div className="main-content">
                <div className="top-section">
                    <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <div className="playlist-content">
                    <h2>SoulEcho PlayList</h2>
                    <div className="song-list">
                        {filteredSongs.map((song, index) => (
                            <SongRow
                                key={index}
                                index={index + 1}
                                song={song}
                                onDelete={handleDelete}
                                onComment={handleComment}  // 传递评论处理函数
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayListPage;
