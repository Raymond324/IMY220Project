import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get playlistId from URL
import Sidebar from '../../components/HomePageComponent/SideBar';
import Header from '../../components/HomePageComponent/Header';
import SongRow from '../../components/PlayListPage/SongRow';
import './PlayListPage.css';

function PlayListPage() {
    const { playlistId } = useParams(); // Get the playlistId from URL
    const [playList, setPlayList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [playlistName, setPlaylistName] = useState('');

    // Fetch playlists by ID
    const fetchPlaylists = async () => {
        try {
            const response = await fetch(`/api/playlists/${playlistId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch playlists');
            }
            const data = await response.json();
            setPlayList(data.songs);
            setPlaylistName(data.name); // Set playlist name
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    useEffect(() => {
        fetchPlaylists(); // 每次加载页面时获取播放列表
    }, [playlistId]); // Fetch new playlist when playlistId changes

    // 删除歌曲（前端和后端）
    const handleDeleteSong = async (songId) => {
        try {
            const response = await fetch(`/api/playlists/${playlistId}/remove-song`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ songId })
            });

            if (response.ok) {
                setPlayList(playList.filter(song => song._id !== songId));
                console.log('Song deleted from playlist successfully.');
            } else {
                console.error('Failed to delete song from playlist.');
            }
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    // 处理评论的添加或删除
    const handleComment = (songTitle, comment, isAdd) => {
        const updatedSongs = playList.map((song) => {
            if (song.title === songTitle) {
                if (isAdd) {
                    return { ...song, comments: [...(song.comments || []), comment] };
                } else {
                    return { ...song, comments: (song.comments || []).filter((c) => c !== comment) };
                }
            }
            return song;
        });
        setPlayList(updatedSongs);
    };

    // 过滤歌曲
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
                    <h2>{playlistName}</h2>
                    <div className="song-list">
                        {filteredSongs.map((song, index) => (
                            <SongRow
                                key={index}
                                index={index + 1}
                                song={song}
                                onDelete={() => handleDeleteSong(song._id)}  // 调用删除函数
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
