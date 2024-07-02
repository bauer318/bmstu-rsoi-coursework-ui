import {getItem, removeItem, saveItem} from "./LocalStorageService";
import axios from "axios";
import {logout, refreshP} from "../App";

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
    removeItem('jwtToken');
    localStorage.clear();
    logout();
    refreshP();
}

const countriesAPI = () => {
    return [
        {
            name: 'Russia',
            code: 'RU',
            iso: 'RUS',
            phoneCode: '+7'
        },
        {
            name: 'USA',
            code: 'US',
            iso: 'USA',
            phoneCode: '+1'
        },
        {
            name: 'DR Congo',
            code: 'CD',
            iso: 'COD',
            phoneCode: '+243'
        },
        {
            name: 'Angola',
            code: 'AO',
            iso: 'AGO',
            phoneCode: '+244'
        },
        {
            name: 'Cameroon',
            code: 'CM',
            iso: 'CMR',
            phoneCode: '+237'
        },
        {
            name: 'CONGO',
            code: 'CG',
            iso: 'COG',
            phoneCode: '+242'
        },
        {
            name: 'Ivory Coast',
            code: 'CI',
            iso: 'CIV',
            phoneCode: '+225'
        },
        {
            name: 'Benin',
            code: 'BJ',
            iso: 'BEN',
            phoneCode: '+229'
        }

    ]
}

export const getCountryByName = name => {
    return countriesAPI().filter(country => country.name === name)[0];
}

export const getToken = () => {
    return {Authorization: getItem('jwtToken')};
}

export const extractRegisteredUserId = locationArray => {
    const length = locationArray?.length;
    return locationArray[length - 1];
}


export const getUserHomePath = userRole => {
    switch (userRole) {
        case 'ROLE_ADMIN':
            return '/admin/users';
        case 'ROLE_MODERATOR':
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
