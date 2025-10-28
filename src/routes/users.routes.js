const express = require('express');
const router = express.Router();
const apiService = require('../services/api.service');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await apiService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await apiService.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error.message);
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(500).json({ error: 'Failed to fetch user', details: error.message });
    }
});

// Get user by email
router.get('/email/:email', async (req, res) => {
    try {
        const user = await apiService.getUserByEmail(req.params.email);
        res.json(user);
    } catch (error) {
        console.error('Error fetching user by email:', error.message);
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(500).json({ error: 'Failed to fetch user', details: error.message });
    }
});

// Create user
router.post('/', async (req, res) => {
    try {
        const user = await apiService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
});

// Update user
router.put('/:id', async (req, res) => {
    try {
        await apiService.updateUser(req.params.id, req.body);
        res.status(204).send();
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ error: 'Failed to update user', details: error.message });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        await apiService.deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: 'Failed to delete user', details: error.message });
    }
});

module.exports = router;
