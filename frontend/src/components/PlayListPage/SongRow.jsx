import React, { useState } from 'react';
import { FaTrashAlt, FaCommentAlt } from 'react-icons/fa'; // Using trash and comment icons
import Comment from '../CommentComponent/Comment'; // Corrected path
//import './SongRow.css';

function SongRow({ index, song, onDelete, onComment }) {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = (e) => {
        if (e.key === 'Enter' && newComment.trim()) {
            onComment(song.title, newComment, true); // Add comment
            setNewComment(''); // Clear input
        }
    };

    return (
        <div className="song-row">
            <span className="song-index">{index}</span>
            <img src={song.image} alt={song.title} className="song-image" />
            <div className="song-title">{song.title}</div>
            <div className="song-album">{song.album}</div>
            <div className="song-artist">{song.artist}</div>
            <div className="song-duration">{song.duration}</div>
            <FaCommentAlt className="comment-icon" onClick={() => setShowComments(!showComments)} /> {/* Toggle comments */}
            <FaTrashAlt className="delete-icon" onClick={() => onDelete(song.title)} /> {/* Delete song */}

            {/* Comments section */}
            {showComments && (
                <Comment
                    comments={song.comments || []}
                    onAddComment={(comment) => onComment(song.title, comment, true)}
                    onDeleteComment={(comment) => onComment(song.title, comment, false)}
                />
            )}
        </div>
    );
}

export default SongRow;
