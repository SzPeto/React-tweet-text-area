import { useEffect, useState } from "react";
import Button from "../Button/Button.jsx";
import TextArea from "../TextArea/TextArea.jsx";
import "./Tweet.css";
import useTweetStore from "../../store/useTweetStore.js";

function Tweet(){

    /* useState keeps the tweet stored across multiple renders, after page refresh, the entire app runs from beginning, 
       changing the tweet to its default state */
    const [tweet, setTweet] = useState("Tweet me!");
    const tweets = useTweetStore((state) => state.tweets);
    // Here we get a refernce to the custom Zustand hook's addTweet function(state=object, addTweet=key to returned function)
    const addTweet = useTweetStore((state) => state.addTweet); 

    function handleClick(){
        const newTweets = [...tweets, tweet];
        addTweet(tweet);
        console.log(newTweets);
    }

    function handleTweetChange(e){
        setTweet(e.target.value);
    }

    return (
        <div className="tweet-container">
            <TextArea value={ tweet } onChange={ handleTweetChange } />
            <Button text="Submit" type="submit" onClick={ () => handleClick() } />
            <Button text="Clear text" type="info" onClick={ () => setTweet("") } />
        </div>
    );

}

export default Tweet;