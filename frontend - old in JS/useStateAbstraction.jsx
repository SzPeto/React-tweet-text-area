// Only for better understanding of useState React hook

let hooks = []; // array of state hooks per component
let currentHook = 0; // tracks the current hook call index per render

function useState(initialValue) {
    const hookIndex = currentHook;

    // First render: initialize state
    if (hooks[hookIndex] === undefined) {
        hooks[hookIndex] = initialValue;
    }

    // Get the current state
    const state = hooks[hookIndex];

    // Create setState function for this hook
    function setState(newState) {
        hooks[hookIndex] = newState; // update stored state
        scheduleRender(); // tells React to re-render the component
    }

    currentHook++; // on each call increment

    return [state, setState]; // Here we get the reference to variable and function, we destructure precisely this array
}