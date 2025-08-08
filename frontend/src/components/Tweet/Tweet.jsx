import { useEffect, useState } from "react";
import Button from "../Button/Button.jsx";
import TextArea from "../TextArea/TextArea.jsx";
import "./Tweet.css";
import useTweetStore from "../../store/useTweetStore.js";

function Tweet(){

    /* useState keeps the tweet stored across multiple renders, after page refresh, the entire app runs from beginning, 
       changing the tweet to its default state */
    const [tweet, setTweet] = useState("Tweet me!");

    /* 
    const tweets = useTweetStore((state) => state.tweets);
    // Here we get a refernce to the custom Zustand hook's addTweet function(state=object, addTweet=key to returned function)
    const addTweet = useTweetStore((state) => state.addTweet); 
     */

    async function handleClick(e) {

        const buttonId = e.target.id;

        if(buttonId == "get"){
            const response = await fetch('/api/tweets');
            const json = await response.json();
            console.log("Tweets : ", json);
        }else if(buttonId == "submit"){
            const postMessage = {
                id: 8,
                content: tweet
            };

            const response = await fetch("/api/tweets/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postMessage),
            });
            const json = await response.json();
            console.log(`Post response : ${json}`);
        }

    }

    function handleTweetChange(e){
        setTweet(e.target.value);
    }

    return (
        <div className="tweet-container">
            <TextArea value={ tweet } onChange={ handleTweetChange } />
            <Button text="Submit" type="submit" onClick={ handleClick } />
            <Button text="Clear text" type="info" onClick={ () => setTweet("") } />
            <Button text="Get tweets on console" type="get" onClick={ handleClick } />
        </div>
    );

}

export default Tweet;