import {getItem, removeItem} from "./LocalStorageService";
import {logout, refreshP} from "../App";
import {reject} from "lodash";
import axios from "axios";

export const printError = (error) => {
    if (error.response) {
        if (error?.response?.status === 403) {
            callBackRemoveData();
            window.location = "/";

        }
    } else if (error.request) {
        alert("Something went wrong please try again later");
    } else {
        console.log('others error', error.message);
    }
}

export const callBackRemoveData = () => {
    removeItem('connectedUser');
    removeItem('access_token');
    localStorage.clear();
    logout();
    refreshP();
}

export const getToken = () => {
    return {Authorization: getItem('jwtToken')};
}

export const getUserHomePath = userRole => {
    switch (userRole) {
        case 'admin':
            return '/admin/users';
        case 'user':
            return 'user/home';
    }
}

export const handlesError = (response) => {
    if (response?.status === 401 || response?.status === 403) {
        callBackRemoveData();
        window.location = "/";
    } else if (response?.status === 500) {
        reject(response);
    }
}

export const creatImageBlob = (element) => {
    return new Blob([element], {type: 'image/png'});
}

export const timeAgo = (datetimeStr) => {
    const date = new Date(datetimeStr);
    const now = new Date();

    const timeDifference = now.getTime() - date.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
        return seconds <= 10 ? 'just now' : `${seconds} seconds ago`;
    }
}
export const getFormData = (blogImage, blogText) => {
    let formData = new FormData();
    formData.append('image', blogImage);
    formData.append('blogText', blogText);
    return formData;
}

export const fetchStudent = async (author) => {
    try {
        const response = await axios.get(baseURL + `/students/${author}`, {
            headers: {
                'Authorization': `Bearer ${getItem('access_token')}`
            }
        });
        return response?.data;
    } catch (error) {
        handlesError(error?.response);
    }
}
export const baseURL = 'http://localhost:8081/api/v1';
export const oidcToken = "http://localhost:18080/realms/master/protocol/openid-connect/token";
export const clientId = 'spring-boot-demo-client';
export const grantType = 'password';
export const userInfosEndpoint = 'http://localhost:18080/realms/master/protocol/openid-connect/userinfo';


