import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: 'shubham',
    lastName: 'soni',
    email: '',
    password: '12345678',
    confirmPassword: '12345678',
  });

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      
      } else {
        console.error('Failed to fetch users');
        toast.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  //

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch('http://localhost:3001/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
       
        fetchUsers(); // Refresh user list after adding
        toast.success('User added successfully'); 
       
      } 
      else {
        console.error('Failed to add user');
        toast.error('Failed to add user');
        
      }
    } catch (error) {
      if (error.message.includes('User already exists')) {
        console.error('User already exists:', error);
        toast.warning('User with this email already exists');
      } else {
        console.error('Error adding user:', error);
        toast.error('Failed to add user');
      }
    
    }
  };

  const handleEditUser = async (userId, newData) => {
    try {
      const response = await fetch(`http://localhost:3001/edit-user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        console.log('User updated successfully');
        fetchUsers(); // Refresh user list after updating
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/delete-user/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchUsers(); // Refresh user list after deletion
        toast.success('User deleted successfully');
        console.log('User deleted successfully');
        
      } else {
        console.error('Failed to delete user');
        toast.error('Failed to delete user');
      }
    } catch (error) {
      
      toast.error(error);
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      {/* Your user management interface */}
      {/* Display user list */}
      <h2>User List</h2>
      <ul>
       { console.log('users',users)}
        {users.map(user => (
          <li key={user.id}>
            {user.firstname} {user.lastname} {user.username}
            <button onClick={() => handleEditUser(user.id,)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Form to add new user */}
      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserManagement;
