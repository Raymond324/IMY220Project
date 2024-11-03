import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/HomePageComponent/SideBar';
import Header from '../../components/HomePageComponent/Header';
import AlbumCard from '../../components/HomePageComponent/AlbumCard';

function HomePage({ addToPlayList }) {
    const [albums, setAlbums] = useState([]);
    const [newSong, setNewSong] = useState({ title: '', artist: '', album: '', duration: '', image: '' });
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editSongId, setEditSongId] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch('/api/songs');
                const data = await response.json();
                setAlbums(data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        const fetchPlaylists = async () => {
            try {
                const response = await fetch('/api/playlists');
                const data = await response.json();
                setPlaylists(data);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        fetchSongs();
        fetchPlaylists();
    }, []);

    const handleAddSong = async () => {
        try {
            const response = await fetch('/api/songs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSong)
            });
            if (response.ok) {
                const addedSong = await response.json();
                setAlbums([...albums, addedSong]);
                setNewSong({ title: '', artist: '', album: '', duration: '', image: '' });
            }
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    const handleDeleteSong = async (id) => {
        try {
            const response = await fetch(`/api/songs/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setAlbums(albums.filter(album => album._id !== id));
            }
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    const handleEditSong = (song) => {
        setNewSong(song);
        setIsEditing(true);
        setEditSongId(song._id);
    };

    const handleSaveSong = async () => {
        try {
            const response = await fetch(`/api/songs/${editSongId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSong)
            });
            if (response.ok) {
                const updatedAlbums = albums.map(album => (album._id === editSongId ? { ...newSong, _id: editSongId } : album));
                setAlbums(updatedAlbums);
                setNewSong({ title: '', artist: '', album: '', duration: '', image: '' });
                setIsEditing(false);
                setEditSongId(null);
            }
        } catch (error) {
            console.error('Error updating song:', error);
        }
    };

    const handleAddToPlayList = async (songId) => {
        if (!selectedPlaylist) {
            console.error('Please select a playlist.');
            return;
        }
        try {
            const response = await fetch(`/api/playlists/${selectedPlaylist}/add-song`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ songId })
            });
            if (response.ok) {
                console.log('Song added to playlist successfully.');
            } else {
                console.error('Failed to add song to playlist.');
            }
        } catch (error) {
            console.error('Error adding song to playlist:', error);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow bg-dark p-5 text-light">
                <div
                    className="h-[300px] bg-cover bg-center relative"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1684082757061-c11a2c9a9787?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
                >
                    <Header className="absolute top-5 right-5" />
                </div>
                <div className="mt-5 text-center text-2xl font-bold">
                    Recommended Albums
                </div>
                <div className="flex justify-center flex-wrap gap-5 p-2 max-w-5xl mx-auto">
                    {albums.map((album, index) => (
                        <div key={index} className="w-[150px] text-center">
                            <AlbumCard
                                albumImage={album.image}
                                title={album.title}
                                artist={album.artist}
                                album={album.album}
                                duration={album.duration}
                                onAddToPlayList={() => handleAddToPlayList(album._id)}
                            />
                            <div className="mt-2 text-light">
                                <button
                                    className="text-xs hover:text-hoverGreen"
                                    onClick={() => handleEditSong(album)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-xs hover:text-hoverRed ml-2"
                                    onClick={() => handleDeleteSong(album._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-5">
                    <label htmlFor="playlist" className="block mb-2 text-lg">
                        Choose Playlist:
                    </label>
                    <select
                        id="playlist"
                        value={selectedPlaylist}
                        onChange={(e) => setSelectedPlaylist(e.target.value)}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">--Select Playlist--</option>
                        {playlists.map((playlist) => (
                            <option key={playlist._id} value={playlist._id}>
                                {playlist.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-5">
                    <h3 className="text-xl font-bold">{isEditing ? 'Edit Song' : 'Add New Song'}</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newSong.title}
                        onChange={e => setNewSong({ ...newSong, title: e.target.value })}
                        className="block mt-2 p-2 border rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Artist"
                        value={newSong.artist}
                        onChange={e => setNewSong({ ...newSong, artist: e.target.value })}
                        className="block mt-2 p-2 border rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Album"
                        value={newSong.album}
                        onChange={e => setNewSong({ ...newSong, album: e.target.value })}
                        className="block mt-2 p-2 border rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Duration"
                        value={newSong.duration}
                        onChange={e => setNewSong({ ...newSong, duration: e.target.value })}
                        className="block mt-2 p-2 border rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newSong.image}
                        onChange={e => setNewSong({ ...newSong, image: e.target.value })}
                        className="block mt-2 p-2 border rounded w-full"
                    />
                    {isEditing ? (
                        <button onClick={handleSaveSong} className="mt-2 bg-primary text-dark px-4 py-2 rounded">
                            Save Song
                        </button>
                    ) : (
                        <button onClick={handleAddSong} className="mt-2 bg-primary text-dark px-4 py-2 rounded">
                            Add Song
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
