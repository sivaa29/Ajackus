// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = 'https://jsonplaceholder.typicode.com/users';

// const initialFormState = {
//   name: '',
//   email: '',
//   company: { name: '' }
// };

// export default function UserForm({ user, onSuccess, onCancel }) {
//   const [formData, setFormData] = useState(initialFormState);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setFormData(user);
//     }
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       if (user) {
//         // Edit existing user
//         await axios.put(`${API_URL}/${user.id}`, formData);
//       } else {
//         // Add new user
//         await axios.post(API_URL, formData);
//       }
//       onSuccess();
//       setFormData(initialFormState);
//     } catch (err) {
//       setError(user ? 'Failed to update user' : 'Failed to create user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'companyName') {
//       setFormData(prev => ({
//         ...prev,
//         company: { ...prev.company, name: value }
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>
//         {user ? 'Edit User' : 'Add New User'}
//       </h2>
      
//       {error && (
//         <div>
//           {error}
//         </div>
//       )}

//       <div>
//         <label htmlFor="name">
//           Name
//         </label>
//         <input
//           id="name"
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="email">
//           Email
//         </label>
//         <input
//           id="email"
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label htmlFor="companyName">
//           Company Name
//         </label>
//         <input
//           id="companyName"
//           type="text"
//           name="companyName"
//           value={formData.company.name}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <button
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? 'Processing...' : (user ? 'Update User' : 'Add User')}
//         </button>
//         <button
//           type="button"
//           onClick={onCancel}
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }

import React from 'react';

export function UserForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = React.useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    department: initialData?.department || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
          Department
        </label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  );
}

export default UserForm