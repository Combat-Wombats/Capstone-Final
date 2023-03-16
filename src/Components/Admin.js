import React, { useState, useEffect } from 'react';
import { fetchAllUsers } from '../api';

const Admin = () => {
    const [users, setUsers] = useState([])
    console.log(users, 'this is user')
    useEffect(
        () => {
            const fetchUsers = async () => {
                const data = await fetchAllUsers()
                 setUsers(data);
            };
            fetchUsers();
        }, []

    );

    return (
        <div>
            <h1> Admin Page </h1>
            <h2> List of users: </h2>
            {users.map(user => {
                return (
                    <div key = {user.id}>
                        Username: {user.username}
                        Password: {user.password}
                    </div>
                )
            })}

        </div>
        
    )

}

export default Admin 