import React from 'react';
import {RiLogoutCircleRLine} from "react-icons/ri";
import {removeItem} from "../services/LocalStorageService";
import {useNavigate} from "react-router-dom";
import {callBackRemoveData} from "../services/Utils";


const LogoutBtn = () => {
    const navigate = useNavigate();

    const logoutUserG = () => {
        callBackRemoveData();
        removeItem('connectedUser');
        removeItem('access_token');
        localStorage.clear();
    }
    const handleLogout = () => {
        logoutUserG();
        navigate('/');
    }

    return (
        <button className={"btn btn-danger "} onClick={handleLogout}>
            <span><i><RiLogoutCircleRLine/></i></span> <span className={'d-none d-sm-inline'}>Logout</span>
        </button>
    );
};

export default LogoutBtn;