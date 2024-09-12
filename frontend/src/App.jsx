// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PlayListPage from './pages/PlayListPage/PlayListPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage/CreatePlaylistPage';


function App() {
    const [playList, setPlayList] = useState([
        { title: 'SongTitle1', album: 'Album1', artist: 'Artist1', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnvClIz-DxZEVtkeerXF1qz8xAn7LBjknnLA&s',comments: []},
        { title: 'SongTitle2', album: 'Album2', artist: 'Artist2', duration: '3:32', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPP5ZnNwn-fR38DkWIxCcBcwu5eYaYWcOVYg&s',comments: [] },
        { title: 'SongTitle3', album: 'Album3', artist: 'Artist3', duration: '4:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBup5MaCwrYHFi5qtFteOynYLyb69C07yqlg&s',comments: [123123] },
        { title: 'SongTitle4', album: 'Album4', artist: 'Artist4', duration: '4:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBup5MaCwrYHFi5qtFteOynYLyb69C07yqlg&s',comments: [123123]},
        { title: 'SongTitle4', album: 'Album5', artist: 'Artist4', duration: '2:43', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__FjGoeoTPZZ0ELo7lqJl-DwiUmb0Z0btIQ&s',comments: [123123] },
        { title: 'SongTitle5', album: 'Album6', artist: 'Artist5', duration: '1:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi_96PGM_RYDbhEPmgTeI8E4bPLn8iUDEneQ&s',comments: [123123] },
        { title: 'SongTitle6', album: 'Album7', artist: 'Artist6', duration: '2:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyod8c3qlzQwWd0q3JSgY47GWQyzb4_KZ4QQ&s',comments: [123123] },
    ]);

    const addToPlayList = (album) => {
        setPlayList((prevList) => {
            // 如果歌曲已经在播放列表中，避免重复添加
            if (prevList.find(song => song.title === album.title)) {
                return prevList;
            }
            return [...prevList, album];
        });
    };

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/home" element={<HomePage addToPlayList={addToPlayList} />} /> {/* 传递 addToPlayList */}
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/playlist-page" element={<PlayListPage playList={playList} setPlayList={setPlayList} />} />
                    <Route path="/create-playlist" element={<CreatePlaylistPage playList={playList} setPlayList={setPlayList} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
