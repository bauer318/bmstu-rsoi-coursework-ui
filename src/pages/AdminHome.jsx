import React, {useEffect, useState} from 'react';
import UserList from "../components/UserList";
import axios from "axios";
import {getItem} from "../services/LocalStorageService";
import {baseURL, handlesError} from "../services/Utils";

const AdminPage = () => {
    useEffect(() => {
        fetchStudents().then(students => {
            setUsers(students);
        }).catch(error => {
            handlesError(error?.response);
        })
    }, []);
    const fetchStudents = async () => {
        try {
            const response = await axios.get(baseURL + `/students/all`, {
                headers: {
                    'Authorization': `Bearer ${getItem('access_token')}`
                }
            });
            return response?.data;
        } catch (error) {
            handlesError(error?.response);
        }
    }
    const [users, setUsers] = useState([
        {
            username: 'johndoe123',
            firstName: 'John',
            lastName: 'Doe',
            country: 'United States',
            university: 'Example University'
        },
        {
            username: 'bauerjack318',
            firstName: 'Bauer',
            lastName: 'Jack',
            country: 'Russia',
            university: 'Bauman'
        },
    ]);
    return (
        <div className={"row"}>
            <UserList users={users}/>
        </div>
    );
};

export default AdminPage;