import { useEffect, useState } from "react";
import Button from "../Button/Button.jsx";
import TextArea from "../TextArea/TextArea.jsx";
import "./Tweet.css";

function Tweet(){

    /* useState keeps the tweet stored across multiple renders, after page refresh, the entire app runs from beginning, 
       changing the tweet to its default state */
    const [tweet, setTweet] = useState("Tweet me!");

    // Only for experimenting purposes (so far)
    function handleClick(e){
        e.target.textContent = "Tweet tweet";
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