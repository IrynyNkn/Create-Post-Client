import React from "react";
import './app_styles.css'
import ControlledTabs from "./tabs";
import { Routes, Route, Link} from "react-router-dom";
import CreatePage from "./CreatePage";
import YourPage from "./YourPage"


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<CreatePage/>}/>
            <Route path="/yourpage" element={<YourPage/>}/>
        </Routes>
    );
};

export default App;
