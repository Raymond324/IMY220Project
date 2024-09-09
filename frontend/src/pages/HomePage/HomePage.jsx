import React from 'react';
import Sidebar from '../../components/HomePageComponent/Sidebar';
import Header from '../../components/HomePageComponent/Header';
import AlbumCard from '../../components/HomePageComponent/AlbumCard';
import './HomePage.css';


function HomePage() {
    const albums = [
        { title: 'Song 1', album:'A', artist: 'Artist 1', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnvClIz-DxZEVtkeerXF1qz8xAn7LBjknnLA&s' },
        { title: 'Song 2', album:'B', artist: 'Artist 2', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPP5ZnNwn-fR38DkWIxCcBcwu5eYaYWcOVYg&s' },
        { title: 'Song 3', album:'C', artist: 'Artist 3', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBup5MaCwrYHFi5qtFteOynYLyb69C07yqlg&s' },
        { title: 'Song 4', album:'D', artist: 'Artist 4', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__FjGoeoTPZZ0ELo7lqJl-DwiUmb0Z0btIQ&s' },
        { title: 'Song 5', album:'E', artist: 'Artist 5', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi_96PGM_RYDbhEPmgTeI8E4bPLn8iUDEneQ&s' },
        { title: 'Song 6', album:'F', artist: 'Artist 6', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyod8c3qlzQwWd0q3JSgY47GWQyzb4_KZ4QQ&s' },
        { title: 'Song 7', album:'G', artist: 'Artist 7', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE94Wukgaq6gLOwiwgx3aGumG5GKSCLvWzZg&s' },
        { title: 'Song 8', album:'H', artist: 'Artist 8', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRPghKLLrbKAXuIBRSWX1kEZyOz9yANAvPQ&s' },
        { title: 'Song 9', album:'I', artist: 'Artist 9', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6bGVwqRQNAwfqvqWIqngdd1qHHI2-qwjxg&s' },
        { title: 'Song 10', album:'J', artist: 'Artist 10', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeHpD5oZWNh4S8nVRUyAaxQrnFGLxZiLJ1Kg&s' },
        { title: 'Song 11', album:'K', artist: 'Artist 11', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj07_QMAG47qTv1hgzTO-uKUVptCQfV7iUAQ&s' },
        { title: 'Song 12', album:'L', artist: 'Artist 12', duration: '3:54', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj7kMggD7FdJS1wRDjcRDmEPwsMQ29Uzzxww&s' },
    ];

    return (
        <div className="home-page">
            <Sidebar />
            <div className="main-content">
                {/* Top Section with Background Image */}
                <div className="top-section">
                    <Header />
                </div>
                <div className="recommended-section">
                    <h3>Recommended albums</h3>
                    <div className="album-grid">
                        {albums.map((album, index) => (
                            <AlbumCard
                                key={index}
                                title={album.title}
                                artist={album.artist}
                                album={album.album}
                                duration={album.duration}
                                albumImage={album.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
