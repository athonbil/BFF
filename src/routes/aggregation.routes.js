const express = require('express');
const router = express.Router();
const apiService = require('../services/api.service');

// Get aggregated data (Users + Courses)
router.get('/dashboard', async (req, res) => {
    try {
        const [users, courses] = await Promise.all([
            apiService.getAllUsers(),
            apiService.getAllCourses()
        ]);

        const aggregatedData = {
            summary: {
                totalUsers: users.length,
                totalCourses: courses.length,
                publishedCourses: courses.filter(c => c.isPublished).length
            },
            users: users.slice(0, 10), // Last 10 users
            courses: courses.slice(0, 10) // Last 10 courses
        };

        res.json(aggregatedData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch dashboard data',
            details: error.message 
        });
    }
});

// Get user with enrolled courses details
router.get('/users/:id/details', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await apiService.getUserById(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get all courses to match with user's enrolled courses
        const allCourses = await apiService.getAllCourses();
        const enrolledCourses = allCourses.filter(course => 
            user.enrolledCourseIds && user.enrolledCourseIds.includes(parseInt(course.id))
        );

        res.json({
            user,
            enrolledCourses,
            enrollmentCount: enrolledCourses.length
        });
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch user details',
            details: error.message 
        });
    }
});

// Get course with enrolled users
router.get('/courses/:id/details', async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await apiService.getCourseById(courseId);
        
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const allUsers = await apiService.getAllUsers();
        const enrolledUsers = allUsers.filter(user => 
            user.enrolledCourseIds && user.enrolledCourseIds.includes(parseInt(courseId))
        );

        res.json({
            course,
            enrolledUsers,
            enrollmentCount: enrolledUsers.length
        });
    } catch (error) {
        console.error('Error fetching course details:', error.message);
        res.status(500).json({ 
            error: 'Failed to fetch course details',
            details: error.message 
        });
    }
});

module.exports = router;
