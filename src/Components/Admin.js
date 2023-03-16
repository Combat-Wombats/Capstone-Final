import React, { useState, useEffect } from 'react';
import { authenticate } from '../../server/db';
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
            {users.map(user => {
                return (
                    <div key = {user.id}>
                        Username: {user.username}
                        Password: {user.password}
                        Admin: {user.admin}
                    </div>
                )
            })}

        </div>
        
    )

}

export default Admin 