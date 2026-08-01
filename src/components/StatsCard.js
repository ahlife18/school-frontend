import { useEffect, useState } from 'react';
import api from '../services/api';
import { useSchool } from '../context/SchoolContext';

function StatsCard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { schoolId } = useSchool();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // ✅ FIXED: Append schoolId to the URL
        const response = await api.get(`/api/students?schoolId=${schoolId}`);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [schoolId]);

  if (loading) return <div>Loading stats...</div>;

  const total = students.length;
  const present = students.filter(s => s.attendance && s.attendance[today] === 'present').length;
  const absent = students.filter(s => s.attendance && s.attendance[today] === 'absent').length;
  const notMarked = total - present - absent;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '20px' }}>
      <div style={{ backgroundColor: '#3498db', color: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '24px' }}>{total}</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Total Students</p>
      </div>
      <div style={{ backgroundColor: '#27ae60', color: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '24px' }}>{present}</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Present Today</p>
      </div>
      <div style={{ backgroundColor: '#e74c3c', color: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '24px' }}>{absent}</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Absent Today</p>
      </div>
      <div style={{ backgroundColor: '#95a5a6', color: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '24px' }}>{notMarked}</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Not Marked</p>
      </div>
    </div>
  );
}

export default StatsCard;