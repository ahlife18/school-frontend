import { useState, useEffect } from 'react';
import api from '../services/api';

function MarkAttendance() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [status, setStatus] = useState('present');
  const [message, setMessage] = useState('');
  const [classFilter, setClassFilter] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/api/students');
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  // When class filter changes, update filtered students
  useEffect(() => {
    if (classFilter === '') {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter(s => s.class === classFilter));
    }
    // Reset selected student when filter changes
    setSelectedStudent('');
  }, [classFilter, students]);

  // Get unique classes from students
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
        status: status
      });
      setMessage(`✅ Marked as ${status} for today!`);
      // Refresh student list to update attendance data
      const response = await api.get('/api/students');
      setStudents(response.data);
      // Reapply filter
      if (classFilter) {
        setFilteredStudents(response.data.filter(s => s.class === classFilter));
      } else {
        setFilteredStudents(response.data);
      }
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    }
  };

  // ✨ Parent Notification
  const notifyParent = (studentName) => {
    if (!selectedStudent) {
      alert('Please select a student first!');
      return;
    }
    
    const message = `Dear Parent, your child ${studentName} was marked as ${status.toUpperCase()} today (${today}). Please contact the school if you have any questions. - School Management System`;
    
    navigator.clipboard.writeText(message);
    alert('✅ Parent notification copied to clipboard! Just paste it into WhatsApp or SMS.');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <form onSubmit={handleSubmit}>
        {/* ✨ Class Filter Dropdown */}
        <div style={{ marginBottom: '12px' }}>
          <select 
            value={classFilter} 
            onChange={(e) => setClassFilter(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '10px', 
              border: '1px solid #ddd',
              fontSize: '14px',
              outline: 'none',
              marginBottom: '8px'
            }}
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
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '10px', 
              border: '1px solid #ddd',
              fontSize: '14px',
              outline: 'none'
            }}
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
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white', 
            border: 'none', 
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          📋 Mark Attendance
        </button>
      </form>

      {message && <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#2c3e50' }}>{message}</p>}

      {/* Parent Notification Button */}
      {selectedStudent && (
        <div style={{ marginTop: '15px' }}>
          <button
            onClick={() => {
              const student = filteredStudents.find(s => s.id === selectedStudent);
              if (student) notifyParent(student.name);
            }}
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(135deg, #25D366 0%, #075E54 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            📲 Notify Parent via WhatsApp
          </button>
          <p style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
            Copies message to clipboard. Paste it into WhatsApp.
          </p>
        </div>
      )}
    </div>
  );
}

export default MarkAttendance;