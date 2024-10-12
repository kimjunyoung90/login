import React, {useState} from "react";
import axios from "axios";

const Login: React.FC = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // 초기화

        try {
            const response = await axios.post('http://localhost:8080/login', {
                id,
                password,
            }, {
                withCredentials: true, // 쿠키를 포함하도록 설정
            });

            alert(response.data); // 로그인 성공 메시지
            // 로그인 성공 후 추가 로직 (예: 리다이렉트, 상태 업데이트 등)
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data); // 에러 메시지 표시
            } else {
                setError('An error occurred.'); // 일반 에러 메시지
            }
        }
    };

    const handleGoogleLogin = () => {
        console.log('Google OAuth login initiated');
        // In a real application, this would redirect to Google's OAuth page
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