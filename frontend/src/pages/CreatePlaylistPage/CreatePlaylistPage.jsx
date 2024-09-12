// src/pages/CreatePlaylistPage/CreatePlaylistPage.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/HomePageComponent/Sidebar';
import Header from '../../components/HomePageComponent/Header';
import SongRow from '../../components/PlayListPage/SongRow';
import './CreatePlaylistPage.css';

function CreatePlaylistPage({ playList, setPlayList, createdPlaylists, setCreatedPlaylists }) {
    const [playlistName, setPlaylistName] = useState('');
    const [isPlaylistCreated, setIsPlaylistCreated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCreatePlaylist = (e) => {
        e.preventDefault();
        if (playlistName.trim()) {
            const newPlaylist = { name: playlistName, id: Date.now() };
            setIsPlaylistCreated(true);
            setCreatedPlaylists([...createdPlaylists, newPlaylist]);  // Add to createdPlaylists
        }
    };

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
        <div className="create-playlist-page">
            <Sidebar createdPlaylists={createdPlaylists} /> {/* Pass createdPlaylists */}
            <div className="main-content">
                <div className="top-section">
                    <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                {!isPlaylistCreated ? (
                    <div className="create-playlist-form">
                        <h2>Create a New Playlist</h2>
                        <form onSubmit={handleCreatePlaylist}>
                            <input
                                type="text"
                                placeholder="Enter Playlist Name"
                                value={playlistName}
                                onChange={(e) => setPlaylistName(e.target.value)}
                            />
                            <button type="submit">Create Playlist</button>
                        </form>
                    </div>
                ) : (
                    <div className="playlist-content">
                        <h2>{playlistName}</h2>
                        <div className="song-list">
                            {filteredSongs.map((song, index) => (
                                <SongRow
                                    key={index}
                                    index={index + 1}
                                    song={song}
                                    onDelete={handleDelete}
                                    onComment={handleComment}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreatePlaylistPage;
