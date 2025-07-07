import React from 'react';

function UserTable({ users, onEdit, onDelete }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th><th>Email</th><th>Phone</th><th>Age</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.age}</td>
            <td>
              <button className="btn btn-warning me-2" onClick={() => onEdit(user)}>Edit</button>
              <button className="btn btn-danger" onClick={() => onDelete(user._id)}>Del</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
