import './bootstrap.min.css';
import './App.css';
import {getItem} from "./services/LocalStorageService";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import {useState} from "react";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import UserHome from "./pages/UserHome";
import UserBlog from "./pages/UserBlog";
import UserProfile from "./pages/UserProfile";
import AdminStat from "./pages/AdminStat";

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
                        <Route path={"/admin/users"} element={<AdminHome/>}/>
                        <Route path={"/admin/stats"} element={<AdminStat/>}/>
                        <Route path={"/user/home"} element={<UserHome/>}/>
                        <Route path={"/user/blogs"} element={<UserBlog/>}/>
                        <Route path={"/user/profile"} element={<UserProfile/>}/>
                    </Routes>
                </Sidebar>
            </BrowserRouter>
        </div>
    )
}

export default App;
