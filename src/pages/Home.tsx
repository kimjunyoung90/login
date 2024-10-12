import React from "react";
import {useNavigate} from "react-router-dom";

const Home: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Home Page</h1>
            <button className="btn" onClick={() => navigate("/login")}>Go to Login</button>
        </div>
    );
}

export default Home;