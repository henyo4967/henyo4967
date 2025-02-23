const express = require('express');
const { Student, Course, Enrollment } = require('./models');
const router = express.Router();

// GET all students
router.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a specific student
router.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST - Add a new student
router.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.json({ message: "Student added successfully", student });
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT - Update student details
router.put('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student updated successfully", student });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE - Remove a student
router.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE - Remove all students (only if students exist)
router.delete('/students', async (req, res) => {
    try {
        const studentsCount = await Student.countDocuments();
        if (studentsCount === 0) {
            return res.status(404).json({ message: "No students found to delete" });
        }
        
        await Student.deleteMany({});
        res.json({ message: "All students deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
