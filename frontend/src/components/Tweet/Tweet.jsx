import { useEffect, useState } from "react";
import Button from "../Button/Button.jsx"
import TextArea from "../TextArea/TextArea.jsx"
import "./Tweet.css"

function Tweet(){

    const [tweet, setTweet] = useState("Initial text");

    return (
        <div className="tweet-container">
            <TextArea value={ tweet } onChange={ setTweet } />
            <Button text="submit" type="submit" onClick={() => console.log(tweet)} />
        </div>
    );

}

export default Tweet;