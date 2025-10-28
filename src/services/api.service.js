const axios = require('axios');

const COURSES_SERVICE_URL = process.env.COURSES_SERVICE_URL || 'http://localhost:5001/api';
const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL || 'http://localhost:5002/api';

// Courses Service
const getAllCourses = async () => {
    const response = await axios.get(`${COURSES_SERVICE_URL}/courses`);
    return response.data;
};

const getCourseById = async (id) => {
    const response = await axios.get(`${COURSES_SERVICE_URL}/courses/${id}`);
    return response.data;
};

const getPublishedCourses = async () => {
    const response = await axios.get(`${COURSES_SERVICE_URL}/courses/published`);
    return response.data;
};

const createCourse = async (courseData) => {
    const response = await axios.post(`${COURSES_SERVICE_URL}/courses`, courseData);
    return response.data;
};

const updateCourse = async (id, courseData) => {
    const response = await axios.put(`${COURSES_SERVICE_URL}/courses/${id}`, courseData);
    return response.data;
};

const deleteCourse = async (id) => {
    const response = await axios.delete(`${COURSES_SERVICE_URL}/courses/${id}`);
    return response.data;
};

// Users Service
const getAllUsers = async () => {
    const response = await axios.get(`${USERS_SERVICE_URL}/users`);
    return response.data;
};

const getUserById = async (id) => {
    const response = await axios.get(`${USERS_SERVICE_URL}/users/${id}`);
    return response.data;
};

const getUserByEmail = async (email) => {
    const response = await axios.get(`${USERS_SERVICE_URL}/users/email/${email}`);
    return response.data;
};

const createUser = async (userData) => {
    const response = await axios.post(`${USERS_SERVICE_URL}/users`, userData);
    return response.data;
};

const updateUser = async (id, userData) => {
    const response = await axios.put(`${USERS_SERVICE_URL}/users/${id}`, userData);
    return response.data;
};

const deleteUser = async (id) => {
    const response = await axios.delete(`${USERS_SERVICE_URL}/users/${id}`);
    return response.data;
};

module.exports = {
    // Courses
    getAllCourses,
    getCourseById,
    getPublishedCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    // Users
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};
