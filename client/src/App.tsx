import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { themeSelector, toggleTheme } from "./redux/themeSplice";

function App() {
    const mode = useAppSelector(themeSelector);
    const dispatch = useAppDispatch();
    const handleToggle = () => {
        dispatch(toggleTheme());
    };
    useEffect(() => {
        let themeLink = document.getElementById("app-theme") as HTMLLinkElement;
        const darkTheme = "lara-dark-indigo";
        const lightTheme = "lara-light-indigo";
        if (themeLink) {
            themeLink.href = `/themes/${mode === "dark" ? darkTheme : lightTheme}/theme.css`;
        }
    }, [mode]);
    return (
        <div className="App">
            <Button className="" label="Click" onClick={handleToggle}></Button>
            <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" />
        </div>
    );
}

export default App;
