const express = require('express');
const router = express.Router();
const apiService = require('../services/api.service');

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await apiService.getAllCourses();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error.message);
        res.status(500).json({ error: 'Failed to fetch courses', details: error.message });
    }
});

// Get course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await apiService.getCourseById(req.params.id);
        res.json(course);
    } catch (error) {
        console.error('Error fetching course:', error.message);
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(500).json({ error: 'Failed to fetch course', details: error.message });
    }
});

// Get published courses
router.get('/filter/published', async (req, res) => {
    try {
        const courses = await apiService.getPublishedCourses();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching published courses:', error.message);
        res.status(500).json({ error: 'Failed to fetch published courses', details: error.message });
    }
});

// Create course
router.post('/', async (req, res) => {
    try {
        const course = await apiService.createCourse(req.body);
        res.status(201).json(course);
    } catch (error) {
        console.error('Error creating course:', error.message);
        res.status(500).json({ error: 'Failed to create course', details: error.message });
    }
});

// Update course
router.put('/:id', async (req, res) => {
    try {
        await apiService.updateCourse(req.params.id, req.body);
        res.status(204).send();
    } catch (error) {
        console.error('Error updating course:', error.message);
        res.status(500).json({ error: 'Failed to update course', details: error.message });
    }
});

// Delete course
router.delete('/:id', async (req, res) => {
    try {
        await apiService.deleteCourse(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting course:', error.message);
        res.status(500).json({ error: 'Failed to delete course', details: error.message });
    }
});

module.exports = router;
