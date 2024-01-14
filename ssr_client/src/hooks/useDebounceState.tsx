import React from "react";

export default function useDebounceState<T>(initialState: T, delay: number = 500) {
    const [state, setState] = React.useState(initialState);
    const [debouncedState, setDebouncedState] = React.useState(initialState);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedState(state);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [state]);

    return {
        state,
        debouncedState,
        setState,
    };
}
