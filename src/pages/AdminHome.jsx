import React, {useState} from 'react';
import UserList from "../components/UserList";

const AdminPage = () => {
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