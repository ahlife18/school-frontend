import { useState, useEffect } from 'react';
import api from '../services/api';
import { useSchool } from '../context/SchoolContext';

function UploadResult() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [term, setTerm] = useState('');
  const [score, setScore] = useState('');
  const [message, setMessage] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const { schoolId } = useSchool();

  // Fetch students when component loads
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

  // Filter students when class filter changes
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
    if (!selectedStudent || !subject || !term || !score) {
      setMessage('❌ Please fill in all fields');
      return;
    }

    try {
      await api.post('/api/results', {
        studentId: selectedStudent,
        subject,
        term,
        score: parseFloat(score),
        schoolId: schoolId
      });
      setMessage(`✅ Result uploaded for ${subject} (${term})!`);
      setSubject('');
      setTerm('');
      setScore('');
      setSelectedStudent('');
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <form onSubmit={handleSubmit}>
        {/* ✨ NEW CLASS FILTER DROPDOWN */}
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

        {/* Student Selector (Now shows filtered list) */}
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
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <input 
            value={subject} 
            onChange={e => setSubject(e.target.value)} 
            placeholder="📚 Subject (e.g. Mathematics)"
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '10px', 
              border: '1px solid #ddd' 
            }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <input 
            value={term} 
            onChange={e => setTerm(e.target.value)} 
            placeholder="📅 Term (e.g. Term 1, 2026)"
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '10px', 
              border: '1px solid #ddd' 
            }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <input 
            value={score} 
            onChange={e => setScore(e.target.value)} 
            type="number"
            placeholder="📊 Score (0-100)"
            min="0"
            max="100"
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '10px', 
              border: '1px solid #ddd' 
            }}
          />
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
            fontWeight: 'bold' 
          }}
        >
          📤 Upload Result
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

export default UploadResult;