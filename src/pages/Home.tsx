import React from "react";
import {useNavigate} from "react-router-dom";

const Home: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Home Page</h1>
            <button className="btn" onClick={() => navigate("/login")}>Go to Login</button>
            <button className="btn" onClick={() => navigate("/profile")} style={{marginTop: '10px'}}>profile</button>
        </div>
    );
}

export default Home;