import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface ProfileInfo {
    name: string;
    email: string;
    bio: string;
    avatar?: string;
}

const styles = {
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        width: '300px',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    avatar: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        marginRight: '1rem',
        backgroundColor: '#dddfe2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        color: '#1c1e21',
    },
    name: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#1c1e21',
        margin: '0 0 0.25rem 0',
    },
    email: {
        fontSize: '0.9rem',
        color: '#65676b',
        margin: '0',
    },
    bio: {
        fontSize: '1rem',
        color: '#1c1e21',
        lineHeight: '1.4',
        borderTop: '1px solid #dddfe2',
        paddingTop: '1rem',
        marginTop: '1rem',
    },
};

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<ProfileInfo>({
        name: "",
        email: "",
        bio: "",
        avatar: "",
    });

    const navigate = useNavigate();

    const getCookieValue = (cookieName: string) => {
        const value = `; ${document.cookie}`;
        const parts: any = value.split(`; ${cookieName}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const id = "admin";
                const response = await axios.get(`http://localhost:8080/profile/${id}`, {
                    headers: {
                        Authorization: `Bearer ${getCookieValue('JWT')}`
                    }
                });

                if(response.status === 200) {
                    setProfile(response.data);
                }
            } catch (error) {
                alert("로그인 후 이용이 가능합니다.");
                navigate("/login"); // 로그인 페이지로 이동
            }
        }

        fetchData();
    }, []);

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.name} style={styles.avatar}/>
                ) : (
                    <div style={styles.avatar}>
                        {profile?.name.charAt(0).toUpperCase()}
                    </div>
                )}
                <div>
                    <h2 style={styles.name}>{profile.name}</h2>
                    <p style={styles.email}>{profile.email}</p>
                </div>
            </div>
            <p style={styles.bio}>{profile.bio}</p>
        </div>
    );
};

export default Profile;