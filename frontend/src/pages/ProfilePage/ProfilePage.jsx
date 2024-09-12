import React, { useState } from 'react';
import Sidebar from '../../components/HomePageComponent/Sidebar';
import Header from '../../components/HomePageComponent/Header';
import { FaEdit, FaSave } from 'react-icons/fa'; // 引入编辑和保存图标
import './ProfilePage.css';

function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        username: 'Raymond',
        gender: 'Male',
        dateOfBirth: '1999/03/24',
        country: 'South Africa'
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // 在此处可以添加保存逻辑，例如将数据发送到服务器
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="profile-page">
            <Sidebar />
            <div className="main-content">
                <div className="top-section">
                    <Header />
                </div>
                <div className="profile-content">
                    <h2>SoulEcho Profile</h2>
                    <div className="profile-header">
                        <div className="profile-avatar"></div>
                        <h3>{profileData.username}</h3>
                        {isEditing ? (
                            <div className="profile-info">
                                <input
                                    type="text"
                                    name="gender"
                                    value={profileData.gender}
                                    onChange={handleChange}
                                    placeholder="Gender"
                                />
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={profileData.dateOfBirth}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="country"
                                    value={profileData.country}
                                    onChange={handleChange}
                                    placeholder="Country or Region"
                                />
                            </div>
                        ) : (
                            <div className="profile-info">
                                <span>{profileData.gender}</span>
                                <span>{profileData.country}</span>
                                <span>{profileData.dateOfBirth}</span>
                            </div>
                        )}
                        <div className="profile-actions">
                            {isEditing ? (
                                <FaSave className="icon" onClick={handleSaveClick} />
                            ) : (
                                <FaEdit className="icon" onClick={handleEditClick} />
                            )}
                        </div>
                    </div>
                    {isEditing && (
                        <div className="profile-edit">
                            <div className="profile-field">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={profileData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-field">
                                <label>Gender</label>
                                <input
                                    type="text"
                                    name="gender"
                                    value={profileData.gender}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-field">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={profileData.dateOfBirth}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-field">
                                <label>Country or Region</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={profileData.country}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
