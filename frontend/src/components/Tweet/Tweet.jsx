import { useEffect, useState } from "react";
import Button from "../Button/Button.jsx";
import TextArea from "../TextArea/TextArea.jsx";
import "./Tweet.css";

function Tweet(){

    /* useState keeps the tweet stored across multiple renders, after page refresh, the entire app runs from beginning, 
       changing the tweet to its default state */
    const [tweet, setTweet] = useState("Tweet me!");
    const [tweets, setTweets] = useState([]);

    function handleClick(){
        // We do not need an event, since onChange on TextArea updates the current tweet on every change
        let items = tweets;
        items.push(tweet);
        setTweets(items);

        console.log(tweets);
    }

    return (
        <div className="tweet-container">
            <TextArea value={ tweet } onChange={ setTweet } />
            <Button text="Submit" type="submit" onClick={ () => handleClick() } />
            <Button text="Clear text" type="info" onClick={ () => setTweet("") } />
        </div>
    );

}

export default Tweet;