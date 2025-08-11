import { useState } from "react";
import Button from "../Button/Button.jsx";
import TextArea from "../TextArea/TextArea.jsx";
import "./Tweet.css";
import useCounterStore from "../../store/useCounterStore.js";
import useCounter from "../../hooks/useCounter.jsx";


/*
============================================================================================================================
                                             Helper functions
============================================================================================================================
*/

async function fetchFromBe(){
    const response = await fetch("/api/tweets");
    const json = await response.json();
    return json;
}

async function sendToBe(tweet, count, setCount){
    const postMessage = {
        id: count,
        content: tweet
    };

    const response = await fetch("/api/tweets", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postMessage),
    });
    const json = await response.json();
    setCount((c) => c + 1);
    return json;
}


/*
============================================================================================================================
                                             The Tweet component
============================================================================================================================
*/

function Tweet(){
    
    const [tweet, setTweet] = useState("Tweet me!");
    const [count, setCount] = useCounter(1);

    async function handleClick(e) {

        const buttonId = e.target.id;
        console.log(`Counter = ${count}`);

        if(buttonId == "get"){
            const json = await fetchFromBe();
            console.log("Get response : ", json);
        }else if(buttonId == "submit"){
            const json = await sendToBe(tweet, count, setCount)
            console.log("Post response : ", json);
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

/* 
const tweets = useTweetStore((state) => state.tweets);
// Here we get a refernce to the custom Zustand hook's addTweet function(state=object, addTweet=key to returned function)
const addTweet = useTweetStore((state) => state.addTweet); 
*/