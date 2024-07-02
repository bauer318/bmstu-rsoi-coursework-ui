import React from 'react';
import {RiLogoutCircleRLine} from "react-icons/ri";
import {getItem, removeItem} from "../services/LocalStorageService";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../services/LogoutService";
import {callBackRemoveData, printError} from "../services/Utils";


const LogoutBtn = () => {
    const navigate = useNavigate();

    const logoutUserG = (callBackRemoveData) => {
        const b = logoutUser(getItem('connectedUser')?.userId);
        b.then(response => {
            callBackRemoveData();
        }).catch(error => {
            printError(error);
        });
        removeItem('connectedUser');
        removeItem('jwtToken');
        localStorage.clear();
    }
    const handleLogout = () => {
        logoutUserG(callBackRemoveData);
        navigate('/');
    }

    return (
        <button className={"btn btn-danger "} onClick={handleLogout}>
            <span><i><RiLogoutCircleRLine/></i></span> <span className={'d-none d-sm-inline'}>Logout</span>
        </button>
    );
};

export default LogoutBtn;