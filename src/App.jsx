// import { useState } from 'react';
// import UserList from './components/UserList';
// import UserForm from './components/UserForm';

// function App() {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//     setShowForm(true);
//   };

//   const handleSuccess = () => {
//     setShowForm(false);
//     setSelectedUser(null);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">User Management System</h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Add New User
//         </button>
//       </div>

//       {showForm ? (
//         <UserForm
//           user={selectedUser}
//           onSuccess={handleSuccess}
//           onCancel={() => {
//             setShowForm(false);
//             setSelectedUser(null);
//           }}
//         />
//       ) : (
//         <UserList onEdit={handleEdit} />
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

import { Users } from 'lucide-react';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      // Transform the data to match our schema
      const transformedData = data.map((user) => ({
        id: user.id,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
        email: user.email,
        department: user.company.name,
      }));
      setUsers(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to add user');
      // const data = await response.json();
      // In a real app, we would use the returned data
      // For demo, we'll create a mock response
      const newUser = {
        id: users.length + 1,
        ...userData,
      };
      setUsers([...users, newUser]);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add user');
    }
  };

  const handleEditUser = async (userData) => {
    if (!selectedUser) return;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to update user');
      // Update local state
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...userData } : user
      );
      setUsers(updatedUsers);
      setSelectedUser(null);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add User
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        {showForm ? (
          <div className="mb-8">
            <UserForm
              onSubmit={selectedUser ? handleEditUser : handleAddUser}
              onCancel={() => {
                setShowForm(false);
                setSelectedUser(null);
              }}
              initialData={selectedUser || undefined}
            />
          </div>
        ) : (
          <UserList
            users={users}
            onEdit={handleEdit}
            onDelete={handleDeleteUser}
          />
        )}
      </div>
    </div>
  );
}

export default App;