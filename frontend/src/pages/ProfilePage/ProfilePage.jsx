import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/HomePageComponent/SideBar';
import Header from '../../components/HomePageComponent/Header';
import { FaEdit, FaSave } from 'react-icons/fa'; // 引入编辑和保存图标
import './ProfilePage.css';

function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        email: '',
        gender: '',
        dateOfBirth: '',
        country: '',
    });
    const userEmail = localStorage.getItem('user');  // 从 localStorage 获取用户 email

    // 获取用户信息
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/api/user/${userEmail}`);
                const data = await response.json();
                setProfileData({
                    email: data.email,
                    gender: data.gender || '',
                    dateOfBirth: data.dateOfBirth || '',
                    country: data.country || '',
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    }, [userEmail]);

    // 保存用户信息
    const handleSaveClick = async () => {
        setIsEditing(false);

        try {
            // 发送 PUT 请求，将修改后的数据发送到服务器
            const response = await fetch(`/api/user/${userEmail}`, {  // 修正模板字符串
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    gender: profileData.gender,
                    dateOfBirth: profileData.dateOfBirth,
                    country: profileData.country,
                }),
            });

            if (response.ok) {
                const updatedProfile = await response.json();
                setProfileData({
                    email: updatedProfile.email,
                    gender: updatedProfile.gender,
                    dateOfBirth: updatedProfile.dateOfBirth,
                    country: updatedProfile.country,
                });
                alert('Profile updated successfully');
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
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
                        <h3>{profileData.email}</h3> {/* 显示用户邮箱 */}
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
                                <FaEdit className="icon" onClick={() => setIsEditing(true)} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
