import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function UserFormModal({ show, handleClose, fetchUsers, editUser }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', age: '' });

  useEffect(() => {
    if (editUser) setFormData(editUser);
    else setFormData({ name: '', email: '', phone: '', age: '' });
  }, [editUser]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !/^\d{10}$/.test(formData.phone) || !(formData.age > 0 && formData.age <= 100)) {
      alert('Please enter valid data');
      return;
    }

    if (editUser) {
      await axios.put(`http://localhost:5000/users/${editUser._id}`, formData);
    } else {
      await axios.post('http://localhost:5000/users', formData);
    }

    fetchUsers();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton><Modal.Title>{editUser ? "Edit User" : "Add User"}</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group><Form.Label>Name</Form.Label><Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required /></Form.Group>
          <Form.Group><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required /></Form.Group>
          <Form.Group><Form.Label>Phone</Form.Label><Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required /></Form.Group>
          <Form.Group><Form.Label>Age</Form.Label><Form.Control type="number" name="age" value={formData.age} onChange={handleChange} required /></Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>{editUser ? "Update" : "Add"}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserFormModal;
