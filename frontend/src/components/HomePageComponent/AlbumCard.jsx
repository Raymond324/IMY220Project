import React from 'react';
import { FaHeart } from 'react-icons/fa';

function AlbumCard({ albumImage, title, artist, album, duration, onAddToPlayList }) {
    return (
        <div className="album-card w-[100px] m-2 text-center relative">
            <div className="album-image-container relative">
                <img
                    src={albumImage}
                    alt={title}
                    className="album-cover w-full rounded-md transition-transform duration-200 hover:scale-105"
                />
                <FaHeart
                    className="like-icon text-red-500 cursor-pointer absolute bottom-[70px] right-2 opacity-0 transition-opacity duration-300 ease-in-out hover:scale-110 group-hover:opacity-100"
                    onClick={onAddToPlayList}
                />
            </div>
            <div className="album-info mt-1">
                <h4 className="font-bold-xs font-semibold mb-1 text-light">{title}</h4>
                <p className="text-[5px] font-semibold text-gray-500 my-1">{artist}</p>
                <p className="text-[5px] font-semibold text-gray-500 my-1">{album}</p>
                <p className="text-[5px] font-semibold text-gray-500 my-1">{duration}</p>
            </div>
        </div>
    );
}

export default AlbumCard;
