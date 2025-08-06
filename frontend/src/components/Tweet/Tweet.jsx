import { useEffect, useState } from "react";
import Button from "../Button/Button.jsx"
import TextArea from "../TextArea/TextArea.jsx"
import "./Tweet.css"

function Tweet(){

    const [tweet, setTweet] = useState("Initial text");

    function handleClick(e){
        e.target.textContent = "New button text";
    }

    return (
        <div className="tweet-container">
            <TextArea value={ tweet } onChange={ setTweet } />
            <Button text="Submit" type="submit" onClick={ (e) => handleClick(e) } />
            <Button text="Clear text" type="info" onClick={ () => setTweet("") } />
        </div>
    );

}

export default Tweet;