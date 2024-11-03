import React, { useState } from 'react';
//import './Comment.css';

function Comment({ comments, onAddComment, onDeleteComment }) {
    const [newComment, setNewComment] = useState('');

    // 当按下回车键时添加评论
    const handleAddComment = (e) => {
        if (e.key === 'Enter' && newComment.trim()) {
            onAddComment(newComment);  // 调用父组件传递的函数添加评论
            setNewComment('');         // 清空输入框
        }
    };

    return (
        <div className="comments-section bg-gray-100 p-4 rounded-lg mt-4">
            <h4>Comments:</h4>
            {(comments || []).map((comment, index) => (
                <div key={index} className="comment-row flex justify-between items-center mb-2 p-2 bg-black border border-black rounded-md">
                    <p>{comment}</p>
                    <button onClick={() => onDeleteComment(comment)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
                </div>
            ))}
            <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleAddComment}
                placeholder="Add a comment"
                className="w-full p-2 mt-4 border border-gray-300 rounded-md"
            />
        </div>

    );
}

export default Comment;
