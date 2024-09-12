import React, { useState } from 'react';
import './Comment.css';

function Comment({ comments, onAddComment, onDeleteComment }) {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = (e) => {
        if (e.key === 'Enter' && newComment.trim()) {
            onAddComment(newComment);  // 添加评论
            setNewComment('');         // 清空输入框
        }
    };

    return (
        <div className="comments-section">
            <h4>Comments:</h4>
            {(comments || []).map((comment, index) => (
                <div key={index} className="comment-row">
                    <p>{comment}</p>
                    <button onClick={() => onDeleteComment(comment)}>Delete</button>
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
    );
}

export default Comment;
