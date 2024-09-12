import React, { useState } from 'react';
import { FaTrashAlt, FaCommentAlt } from 'react-icons/fa'; // 使用垃圾桶和评论图标
import './SongRow.css';

function SongRow({ index, song, onDelete, onComment }) {
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = (e) => {
        if (e.key === 'Enter' && newComment.trim()) {
            onComment(song.title, newComment, true); // 添加评论
            setNewComment(''); // 清空输入框
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
            <FaCommentAlt className="comment-icon" onClick={() => setShowComments(!showComments)} /> {/* 点击评论 */}
            <FaTrashAlt className="delete-icon" onClick={() => onDelete(song.title)} /> {/* 点击删除 */}

            {/* 评论部分 */}
            {showComments && (
                <div className="comments-section">
                    <h4>Comments:</h4>
                    {/** 使用默认值确保 comments 总是一个数组 */}
                    {(song.comments || []).map((comment, i) => (
                        <div key={i} className="comment-row">
                            <p>{comment}</p>
                            <button onClick={() => onComment(song.title, comment, false)}>Delete</button> {/* 删除评论 */}
                        </div>
                    ))}
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={handleAddComment}
                        placeholder="Add a comment"
                    />
                </div>
            )}
        </div>
    );
}

export default SongRow;
