import "./Home.css";
import Tweet from "../components/tweet/Tweet.tsx";
import { useState } from "react";

function Home(){

    return(
        <div className="home-container">
            <Tweet />
        </div>
    );
}

export default Home;