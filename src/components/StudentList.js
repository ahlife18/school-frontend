import { useEffect, useState } from 'react';
import api from '../services/api';
import { useSchool } from '../context/SchoolContext';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { schoolId } = useSchool();
  const today = new Date().toISOString().split('T')[0];

  const fetchStudents = async () => {
    try {
      const response = await api.get(`/api/students?schoolId=${schoolId}`);
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [schoolId]);

  useEffect(() => {
    const results = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(results);
  }, [searchTerm, students]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }
    
    setDeleting(true);
    try {
      await api.delete(`/api/students/${id}`, {
        data: { schoolId: schoolId } // <-- Pass schoolId in body
      });
      fetchStudents();
    } catch (error) {
      alert('Error deleting student: ' + error.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '40px', color: '#fff', fontSize: '18px' }}>⏳ Loading students...</div>;

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#2c3e50' }}>
            📚 Student List 
            <span style={{ fontSize: '16px', fontWeight: 'normal', color: '#666', marginLeft: '10px' }}>
              ({filteredStudents.length} students)
            </span>
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px 15px', borderRadius: '12px', border: '1px solid #ddd', outline: 'none', width: '200px', fontSize: '14px', transition: 'all 0.3s' }}
            onFocus={(e) => e.target.style.borderColor = '#43e97b'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <button 
            onClick={fetchStudents}
            style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {filteredStudents.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '15px', color: '#888' }}>
          {searchTerm ? '🔍 No students match your search.' : '📭 No students added yet. Add one above!'}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {filteredStudents.map((student) => {
          const todayStatus = student.attendance && student.attendance[today];
          const statusColor = todayStatus === 'present' ? '#d4edda' : todayStatus === 'absent' ? '#f8d7da' : '#f9f9f9';
          const statusTextColor = todayStatus === 'present' ? '#155724' : todayStatus === 'absent' ? '#721c24' : '#666';
          
          return (
            <div 
              key={student.id}
              style={{ padding: '18px 22px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', transition: 'all 0.3s ease', borderLeft: `6px solid ${todayStatus === 'present' ? '#28a745' : todayStatus === 'absent' ? '#dc3545' : '#6c757d'}`, display: 'flex', flexDirection: 'column' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#2c3e50' }}>{student.name}</span>
                  <span style={{ marginLeft: '12px', fontSize: '14px', color: '#888', backgroundColor: '#f0f0f0', padding: '4px 10px', borderRadius: '20px' }}>
                    Class {student.class}
                  </span>
                </div>
                <span style={{ color: '#666', fontSize: '14px', fontWeight: '500' }}>🪪 Roll: {student.rollNo}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                <div>
                  {todayStatus ? (
                    <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '30px', backgroundColor: statusColor, color: statusTextColor, fontSize: '14px', fontWeight: 'bold' }}>
                      📅 Today: {todayStatus.toUpperCase()}
                    </span>
                  ) : (
                    <span style={{ color: '#aaa', fontSize: '14px' }}>⏳ Not marked today</span>
                  )}
                </div>
                <button 
                  onClick={() => handleDelete(student.id)}
                  disabled={deleting}
                  style={{ backgroundColor: '#ffe0e0', color: '#dc3545', border: 'none', padding: '6px 14px', borderRadius: '30px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = '#dc3545'; e.target.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = '#ffe0e0'; e.target.style.color = '#dc3545'; }}
                >
                  {deleting ? '⏳...' : '🗑️ Delete'}
                </button>
              </div>

              {student.attendance && Object.keys(student.attendance).length > 0 && (
                <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #f0f0f0', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#888', marginRight: '5px' }}>📊 History:</span>
                  {Object.entries(student.attendance).map(([date, status]) => (
                    <span key={date} style={{ padding: '3px 10px', borderRadius: '15px', fontSize: '11px', fontWeight: 'bold', backgroundColor: status === 'present' ? '#d4edda' : '#f8d7da', color: status === 'present' ? '#155724' : '#721c24' }}>
                      {date.slice(5)}: {status.slice(0, 3).toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentList;