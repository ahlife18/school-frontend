import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';

function SchoolSignUp() {
  const [schoolName, setSchoolName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [schoolLink, setSchoolLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSchoolLink('');

    try {
      const db = getFirestore(getApp());
      
      // ✅ Create the school document
      const schoolRef = await addDoc(collection(db, 'schools'), {
        schoolName,
        adminEmail,
        trialStartDate: new Date().toISOString(),
        isSubscribed: false,
        subscriptionEndDate: null,
      });

      const schoolId = schoolRef.id;
      const link = `${window.location.origin}?schoolId=${schoolId}`;

      setSchoolLink(link);
      setMessage('✅ School registered successfully! Share this link with the school.');
    } catch (error) {
      console.error('Firestore Error:', error);
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏫 Register Your School</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="School Name (e.g., St. Mary's)"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Admin Email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Registering...' : '🚀 Register School'}
        </button>
      </form>
      {message && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{message}</p>}
      {schoolLink && (
        <div style={styles.linkBox}>
          <p style={{ fontSize: '14px' }}>Share this link with the school:</p>
          <code style={styles.code}>{schoolLink}</code>
          <button
            onClick={() => navigator.clipboard.writeText(schoolLink)}
            style={styles.copyBtn}
          >
            📋 Copy Link
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '100px auto',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: 'Segoe UI, Arial, sans-serif',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  linkBox: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    textAlign: 'center',
  },
  code: {
    display: 'block',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '5px',
    border: '1px solid #ddd',
    wordBreak: 'break-all',
    fontSize: '14px',
    margin: '10px 0',
  },
  copyBtn: {
    padding: '8px 20px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default SchoolSignUp;