import { useState, useEffect } from 'react';
import api from '../services/api';
import { useSchool } from '../context/SchoolContext';

function MarkAttendance() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [status, setStatus] = useState('present');
  const [message, setMessage] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const { schoolId } = useSchool();

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`/api/students?schoolId=${schoolId}`);
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, [schoolId]);

  useEffect(() => {
    if (classFilter === '') {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter(s => s.class === classFilter));
    }
    setSelectedStudent('');
  }, [classFilter, students]);

  const uniqueClasses = [...new Set(students.map(s => s.class))].sort();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) {
      setMessage('❌ Please select a student');
      return;
    }

    try {
      await api.post('/api/attendance', {
        studentId: selectedStudent,
        date: today,
        status: status,
        schoolId: schoolId // <-- This is CRITICAL!
      });
      setMessage(`✅ Marked as ${status} for today!`);
      const response = await api.get(`/api/students?schoolId=${schoolId}`);
      setStudents(response.data);
      if (classFilter) {
        setFilteredStudents(response.data.filter(s => s.class === classFilter));
      } else {
        setFilteredStudents(response.data);
      }
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    }
  };

  const notifyParent = (studentName) => {
    if (!selectedStudent) {
      alert('Please select a student first!');
      return;
    }
    const message = `Dear Parent, your child ${studentName} was marked as ${status.toUpperCase()} today (${today}). - School System`;
    navigator.clipboard.writeText(message);
    alert('✅ Copied to clipboard! Paste into WhatsApp.');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <select 
            value={classFilter} 
            onChange={(e) => setClassFilter(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd' }}
          >
            <option value="">-- All Classes --</option>
            {uniqueClasses.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            Showing {filteredStudents.length} student(s)
          </div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <select 
            value={selectedStudent} 
            onChange={(e) => setSelectedStudent(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd' }}
          >
            <option value="">-- Select Student --</option>
            {filteredStudents.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} (Roll: {s.rollNo})
                {s.attendance && s.attendance[today] ? ` - Already marked ${s.attendance[today]}` : ''}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#27ae60' }}>
            <input type="radio" value="present" checked={status === 'present'} onChange={() => setStatus('present')} /> ✅ Present
          </label>
          <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#e74c3c' }}>
            <input type="radio" value="absent" checked={status === 'absent'} onChange={() => setStatus('absent')} /> ❌ Absent
          </label>
        </div>

        <button 
          type="submit" 
          style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
        >
          📋 Mark Attendance
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{message}</p>}
      {selectedStudent && (
        <div style={{ marginTop: '15px' }}>
          <button onClick={() => { const student = filteredStudents.find(s => s.id === selectedStudent); if (student) notifyParent(student.name); }} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #25D366 0%, #075E54 100%)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
            📲 Notify Parent
          </button>
        </div>
      )}
    </div>
  );
}

export default MarkAttendance;