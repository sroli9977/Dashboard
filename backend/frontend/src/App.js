import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from './components/UserTable';
import UserFormModal from './components/UserFormModal';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users');
    setUsers(res.data);
  };

  const handleAdd = () => {
    setEditUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>CRUD Database</h2>
      <button className="btn btn-success mb-3" onClick={handleAdd}>Add Item</button>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <UserFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        fetchUsers={fetchUsers}
        editUser={editUser}
      />
    </div>
  );
}

export default App;
