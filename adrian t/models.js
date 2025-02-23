const mongoose = require('mongoose');

// Function to generate an 8-character hexadecimal ID
const generateHexId = () => {
    return Math.random().toString(16).substr(2, 8);
};

// Student Schema (Custom 8-character ID)
const StudentSchema = new mongoose.Schema({
    _id: { type: String, default: generateHexId }, // Custom 8-char ID
    name: String,
    email: String,
});

const Student = mongoose.model('Student', StudentSchema);

// Course Schema
const CourseSchema = new mongoose.Schema({
    course_name: String,
    description: String,
});

const Course = mongoose.model('Course', CourseSchema);

// Enrollment Schema
const EnrollmentSchema = new mongoose.Schema({
    student_id: { type: String, ref: 'Student' }, // Reference to 8-char Student ID
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
});

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

module.exports = { Student, Course, Enrollment };
