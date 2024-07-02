import './bootstrap.min.css';
import './App.css';
import {getItem} from "./services/LocalStorageService";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import {useState} from "react";
import Home from "./pages/Home";

export var logout = () => {
};
export var refreshP = () => {
};
const App = () => {
    const longedUser = getItem('connectedUser');

    const [isLonged, setIsLonged] = useState(longedUser);

    const [refresh, setRefresh] = useState(false);

    logout = () => {
        setIsLonged(false);
    }
    refreshP = () => {
        setRefresh(!refresh);
    }

    return (
        <div>
            <BrowserRouter>
                <Sidebar user={longedUser}>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                    </Routes>
                </Sidebar>
            </BrowserRouter>
        </div>
    )
}

export default App;
