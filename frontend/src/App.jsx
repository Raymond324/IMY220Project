import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PlayListPage from './pages/PlayListPage/PlayListPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignupPage/SignupPage';
import CreatePlaylistPage from './pages/CreatePlaylistPage/CreatePlaylistPage';

function App() {
    const [playList, setPlayList] = useState([]);

    const addToPlayList = (album) => {
        setPlayList((prevList) => {
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
                    <Route path="/home" element={<HomePage addToPlayList={addToPlayList} />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/playlist-page/:playlistId" element={<PlayListPage playList={playList} setPlayList={setPlayList} />} />
                    <Route path="/create-playlist" element={<CreatePlaylistPage playList={playList} setPlayList={setPlayList} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
