// UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BASE_URL from '../config';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">No.</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
          <tr key={user.userId}>
              <td>
                <span>{index + 1 + '.'}</span>
              </td>
              <td>
                <div>
                <Link to={`/users/${user.userId}/orders`}>{user.username}</Link>

                </div>
              </td>
              <td>
                <div>{user.email}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;