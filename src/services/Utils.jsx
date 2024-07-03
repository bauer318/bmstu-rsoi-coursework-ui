import {getItem, removeItem} from "./LocalStorageService";
import axios from "axios";
import {logout, refreshP} from "../App";
import {reject} from "lodash";

export const getUserSortRq = (roleKey, authStatus) => {
    switch (roleKey) {
        case 2: {
            return {
                userRoleRq: {
                    id: 1,
                    userRole: "ROLE_ADMIN"
                }, authStatus: authStatus
            }
        }
        case 3: {
            return {
                userRoleRq: {
                    id: 2,
                    userRole: "ROLE_MODERATOR"
                }, authStatus: authStatus
            }
        }
        case 4: {
            return {
                userRoleRq: {
                    id: 3,
                    userRole: "ROLE_AGENT"
                }, authStatus: authStatus
            }
        }
        case 5: {
            return {
                userRoleRq: {
                    id: 4,
                    userRole: "ROLE_CLIENT"
                }, authStatus: authStatus
            }
        }

    }
}

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
const reverseArray = arrayIn => {
    let arrayOut = [];
    for (let i = arrayIn?.length; i--; i >= 0) {
        arrayOut.push(arrayIn[i]);
    }
    return arrayOut;
}
export const formatDate = date => {
    const dateArr = date?.split('-');
    const dateArrayReverse = reverseArray(dateArr);
    let dateOut = "";
    dateArrayReverse?.map((dateElem, it) => {
        dateOut += dateElem;
        if (it < dateArrayReverse?.length - 1) {
            dateOut += '/';
        }
    });
    return dateOut;
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

export const baseURL = 'http://localhost:8081/api/v1';
export const oidcToken = "http://localhost:18080/realms/rsoi2/protocol/openid-connect/token";
export const clientSecret = 'uDYqtSawcE3ZpuVRVy6TegV2VWfwPWK6';
export const clientId = 'spring-boot-demo-client';
export const grantType = 'password';
export const userInfosEndpoint = 'http://localhost:18080/realms/rsoi2/protocol/openid-connect/userinfo';
const instance = axios.create({
    baseURL: baseURL,
    headers: {Authorization: getItem('jwtToken')}
});

export const roundToOnlyToDisplay = (sourceAmount, callbackSetState) => {
    const roundedAmount = roundValue(sourceAmount);
    callbackSetState(roundedAmount);
}

export const roundValue = value => {
    return Math.round(value * 100) / 100;
}
export default instance;

