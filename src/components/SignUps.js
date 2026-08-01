import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';

function SignUp() {
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
      // Generate a unique school ID
      const schoolRef = await addDoc(collection(db, 'schools'), {
        schoolName,
        adminEmail,
        trialStartDate: new Date().toISOString(),
        isSubscribed: false,
        subscriptionEndDate: null
      });
      
      const schoolId = schoolRef.id;
      const link = `${window.location.origin}?schoolId=${schoolId}`;
      
      setSchoolLink(link);
      setMessage('✅ School registered successfully! Share this link with the school.');
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '100px auto', padding: '30px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>🏫 Register Your School</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="School Name (e.g. St. Mary's)"
            required
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            placeholder="Admin Email"
            required
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '12px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', cursor: 'pointer' }}
        >
          {loading ? 'Registering...' : 'Register School'}
        </button>
      </form>
      {message && <p style={{ marginTop: '15px', textAlign: 'center', fontWeight: 'bold' }}>{message}</p>}
      {schoolLink && (
        <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '10px', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#555' }}>Share this link with the school:</p>
          <code style={{ display: 'block', padding: '10px', backgroundColor: '#fff', borderRadius: '5px', border: '1px solid #ddd', wordBreak: 'break-all', fontSize: '14px' }}>
            {schoolLink}
          </code>
          <button
            onClick={() => navigator.clipboard.writeText(schoolLink)}
            style={{ marginTop: '10px', padding: '8px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            📋 Copy Link
          </button>
        </div>
      )}
    </div>
  );
}

export default SignUp;