import React, { useEffect, useState } from 'react';
import './users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    // Fetch all users
    useEffect(() => {
        fetch('http://localhost:5000/users/get')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    // Handle updating user
    const handleUpdate = (id) => {
        const updatedUser = users.find((user) => user.id === id);

        fetch(`http://localhost:5000/users/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                setEditingUser(null);
            })
            .catch((error) => console.error('Error updating user:', error));
    };

    // Handle deleting user
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/users/delete/${id}`, { method: 'DELETE' })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                setUsers(users.filter((user) => user.id !== id));
            })
            .catch((error) => console.error('Error deleting user:', error));
    };

    return (
        <div className="users-container">
            <h1>Manage Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                {editingUser === user.id ? (
                                    <input
                                        value={user.username}
                                        onChange={(e) =>
                                            setUsers(
                                                users.map((u) =>
                                                    u.id === user.id
                                                        ? { ...u, username: e.target.value }
                                                        : u
                                                )
                                            )
                                        }
                                    />
                                ) : (
                                    user.username
                                )}
                            </td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{`${user.first_name} ${user.last_name}`}</td>
                            <td>{user.status}</td>
                            <td>
                                {editingUser === user.id ? (
                                    <button onClick={() => handleUpdate(user.id)}>Save</button>
                                ) : (
                                    <button onClick={() => setEditingUser(user.id)}>Edit</button>
                                )}
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
