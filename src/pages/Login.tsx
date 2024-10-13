import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/login', {
                id,
                password,
            }, {
                withCredentials: true, // 쿠키를 포함하도록 설정
            });

            if (response.status === 200) {
                // 로그인 성공 시 성공 페이지로 이동
                const token: string = response.data.token;
                sessionStorage.setItem('token', token);
                navigate("/");
            }
            // 로그인 성공 후 추가 로직 (예: 리다이렉트, 상태 업데이트 등)
        } catch (err: any) {
            if (err.response) {
                alert(err.response.data.message); // 에러 메시지 표시
            } else {
                alert('An error occurred.'); // 일반 에러 메시지
            }
        }
    };

    const handleGoogleLogin = () => {
        console.log('Google OAuth login initiated');
        alert('Google OAuth login initiated');
    };

    return (
        <div className="container">
            <h1>Login Page</h1>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
            <div className="oauth-section">
                <p>Or login with:</p>
                <button onClick={handleGoogleLogin} className="btn btn-google">
                    Login with Google
                </button>
            </div>
        </div>
    )
}

export default Login;