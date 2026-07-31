const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

// 1. Add a student
app.post('/api/students', async (req, res) => {
  try {
    const { name, class: className, rollNo } = req.body;
    const studentRef = db.collection('students').doc();
    await studentRef.set({ name, class: className, rollNo, attendance: {} });
    res.status(201).json({ message: 'Student added', id: studentRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get all students
app.get('/api/students', async (req, res) => {
  try {
    const snapshot = await db.collection('students').get();
    const students = [];
    snapshot.forEach(doc => students.push({ id: doc.id, ...doc.data() }));
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Mark attendance
app.post('/api/attendance', async (req, res) => {
  try {
    const { studentId, date, status } = req.body;
    await db.collection('students').doc(studentId).update({
      [`attendance.${date}`]: status
    });
    res.json({ message: 'Attendance marked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));