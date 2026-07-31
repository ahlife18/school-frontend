import { useState } from 'react';
import api from '../services/api';

function ParentPortal() {
  const [rollNo, setRollNo] = useState('');
  const [student, setStudent] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStudent(null);
    setResults([]);
    setSearched(false);

    try {
      // Fetch student info
      const studentRes = await api.get(`/api/student-by-roll/${rollNo}`);
      setStudent(studentRes.data);
      
      // Fetch results for this roll number
      const resultsRes = await api.get(`/api/results/roll/${rollNo}`);
      setResults(resultsRes.data);
      
      setSearched(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('No student found with this roll number.');
      } else {
        setError('Something went wrong. Please try again.');
      }
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '50px auto',
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#2c3e50' }}>👨‍👩‍👧 Parent Portal</h2>
        <p style={{ color: '#888' }}>Check attendance & results</p>
      </div>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          placeholder="Enter Roll Number (e.g. 12)"
          required
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #ddd',
            fontSize: '16px',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px 25px',
            background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Searching...' : '🔍 Search'}
        </button>
      </form>

      {error && (
        <div style={{ padding: '15px', backgroundColor: '#fee', color: '#c00', borderRadius: '10px', marginBottom: '20px', textAlign: 'center' }}>
          ❌ {error}
        </div>
      )}

      {student && (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '15px', border: '1px solid #eee' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>{student.name}</h3>
              <p style={{ margin: '5px 0 0', color: '#888' }}>
                Class: {student.class} | Roll: {student.rollNo}
              </p>
            </div>
            <span style={{ padding: '6px 12px', backgroundColor: '#27ae60', color: 'white', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
              ✅ Confirmed
            </span>
          </div>

          {/* 📅 Attendance History */}
          <div style={{ marginTop: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
            <h4 style={{ margin: '0 0 10px', color: '#555' }}>📅 Attendance History</h4>
            {Object.keys(student.attendance || {}).length === 0 ? (
              <p style={{ color: '#aaa' }}>No attendance records yet.</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {Object.entries(student.attendance).map(([date, status]) => (
                  <span key={date} style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    backgroundColor: status === 'present' ? '#d4edda' : '#f8d7da',
                    color: status === 'present' ? '#155724' : '#721c24',
                    fontSize: '13px',
                    fontWeight: 'bold'
                  }}>
                    {date}: {status.toUpperCase()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 📊 Results History */}
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ margin: '0 0 10px', color: '#555' }}>📊 Academic Results</h4>
            {results.length === 0 ? (
              <p style={{ color: '#aaa' }}>No results uploaded yet.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                      <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Term</th>
                      <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Subject</th>
                      <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result) => (
                      <tr key={result.id}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{result.term}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{result.subject}</td>
                        <td style={{ 
                          padding: '8px', 
                          borderBottom: '1px solid #eee',
                          fontWeight: 'bold',
                          color: result.score >= 70 ? '#27ae60' : result.score >= 50 ? '#f39c12' : '#e74c3c'
                        }}>
                          {result.score}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {searched && !student && !error && (
        <p style={{ textAlign: 'center', color: '#888' }}>
          ℹ️ No student found. Please check the roll number and try again.
        </p>
      )}
    </div>
  );
}

export default ParentPortal;