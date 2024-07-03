import React from 'react';
import ProfileCard from './ProfileCard';

const UserList = ({users}) => {
    return (
        <>
            <h4 className="text-center mb-4">User List</h4>
            {
                users?.map((user, index) => (
                    <ProfileCard
                        key={index}
                        username={user.username}
                        firstName={user.firstname}
                        lastName={user.lastname}
                        country={user.country}
                        university={user.university}
                    />
                ))
            }
        </>
    )
        ;
};

export default UserList;
