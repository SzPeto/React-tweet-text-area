import { useState } from "react";

function useCounter(initialState){
    const [counter, setCounter] = useState(initialState);

    return [counter, setCounter];
}

export default useCounter;