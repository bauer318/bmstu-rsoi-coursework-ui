import React, {useEffect, useState} from 'react';
import StatTable from "../components/StatTable";
import axios from "axios";
import {getItem} from "../services/LocalStorageService";
import {baseURL, handlesError} from "../services/Utils";

const AdminStat = () => {
    const [data, setData] = useState([
        {action: 'Login', status: 'Success', createdAt: '2024-07-01 10:00:00', errorMessage: ''},
        {action: 'Logout', status: 'Success', createdAt: '2024-07-01 11:00:00', errorMessage: ''},
        {action: 'Login', status: 'Failure', createdAt: '2024-07-01 12:00:00', errorMessage: 'Invalid credentials'},
    ]);

    useEffect(() => {
        fetchStats().then(stats => {
            setData(stats);
        }).catch(error => {
            handlesError(error);
        })
    }, []);
    const fetchStats = async () => {
        try {
            const response = await axios.get(baseURL + `/statistics`, {
                headers: {
                    'Authorization': `Bearer ${getItem('access_token')}`
                }
            });
            return response?.data;
        } catch (error) {
            handlesError(error?.response);
        }
    }
    return (
        <div className={"row"}>
            <h4 className={"text-center"}>Statistics</h4>
            <StatTable data={data}/>
        </div>
    )
};

export default AdminStat;