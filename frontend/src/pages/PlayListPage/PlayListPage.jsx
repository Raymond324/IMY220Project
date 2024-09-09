import React, { useState } from 'react';
import Sidebar from '../../components/HomePageComponent/Sidebar';
import Header from '../../components/HomePageComponent/Header';
import SongRow from '../../components/PlayListPage/SongRow';
import './PlayListPage.css';

function PlayListPage() {
    const [songs, setSongs] = useState([
        { title: 'SongTitle1', album: 'Album1', artist: 'Artist1', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnvClIz-DxZEVtkeerXF1qz8xAn7LBjknnLA&s' },
        { title: 'SongTitle2', album: 'Album2', artist: 'Artist2', duration: '3:32', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPP5ZnNwn-fR38DkWIxCcBcwu5eYaYWcOVYg&s' },
        { title: 'SongTitle3', album: 'Album3', artist: 'Artist3', duration: '4:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBup5MaCwrYHFi5qtFteOynYLyb69C07yqlg&s' },
        { title: 'SongTitle4', album: 'Album4', artist: 'Artist4', duration: '2:43', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__FjGoeoTPZZ0ELo7lqJl-DwiUmb0Z0btIQ&s' },
        { title: 'SongTitle5', album: 'Album5', artist: 'Artist5', duration: '1:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi_96PGM_RYDbhEPmgTeI8E4bPLn8iUDEneQ&s' },
        { title: 'SongTitle6', album: 'Album6', artist: 'Artist6', duration: '2:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyod8c3qlzQwWd0q3JSgY47GWQyzb4_KZ4QQ&s' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');  // Create searchTerm state

    const handleDelete = (songTitle) => {
        const updatedSongs = songs.filter((song) => song.title !== songTitle);
        setSongs(updatedSongs);
    };

    const filteredSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="playlist-page">
            <Sidebar />
            <div className="main-content">
                <div className="top-section">
                    <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />  {/* Pass searchTerm and setSearchTerm to Header */}
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
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayListPage;
