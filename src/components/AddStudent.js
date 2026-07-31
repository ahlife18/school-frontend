import { useState } from 'react';
import api from '../services/api';

function AddStudent() {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('api/students', {
        name,
        class: className,
        rollNo: parseInt(rollNo)
      });
      setMessage(`✅ ${name} added! (ID: ${response.data.id})`);
      setName(''); setClassName(''); setRollNo('');
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <input 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="👤 Student Name" 
            required 
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '10px', 
              border: '1px solid #ddd',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <input 
            value={className} 
            onChange={e => setClassName(e.target.value)} 
            placeholder="📚 Class (e.g. 5A)" 
            required 
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '10px', 
              border: '1px solid #ddd',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <input 
            value={rollNo} 
            onChange={e => setRollNo(e.target.value)} 
            placeholder="🔢 Roll Number" 
            required 
            type="number"
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '10px', 
              border: '1px solid #ddd',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
            color: 'white', 
            border: 'none', 
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          ➕ Add Student
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#2c3e50' }}>{message}</p>}
    </div>
  );
}

export default AddStudent;