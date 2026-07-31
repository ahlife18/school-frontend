import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login({ onLogin, onPrincipalLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [principalCode, setPrincipalCode] = useState('');
  const [isPrincipal, setIsPrincipal] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isPrincipal) {
        if (principalCode !== 'ahlife') {
          setError('Invalid principal code');
          return;
        }
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (isPrincipal) {
        onPrincipalLogin(userCredential.user);
      } else {
        onLogin(userCredential.user);
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        textAlign: 'center'
      }}>
        {/* School Logo / Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 15px',
          backgroundColor: '#667eea',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          color: 'white'
        }}>
          🏫
        </div>

        <h2 style={{ 
          margin: '0 0 5px', 
          color: '#333', 
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          Welcome Back!
        </h2>
        <p style={{ 
          margin: '0 0 25px', 
          color: '#888',
          fontSize: '14px'
        }}>
          Sign in to manage your school
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="teacher@school.com"
              style={{
                width: '100%',
                padding: '12px 15px',
                marginTop: '5px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s',
                backgroundColor: '#f9f9f9'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 15px',
                marginTop: '5px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s',
                backgroundColor: '#f9f9f9'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          {/* Principal Toggle - Colorful Switch */}
          <div style={{ 
            marginBottom: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '14px', color: '#666' }}>👨‍🏫 Teacher</span>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
              <input
                type="checkbox"
                checked={isPrincipal}
                onChange={(e) => setIsPrincipal(e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: isPrincipal ? '#764ba2' : '#ccc',
                transition: '0.4s',
                borderRadius: '26px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '20px',
                  width: '20px',
                  left: isPrincipal ? '26px' : '3px',
                  bottom: '3px',
                  backgroundColor: 'white',
                  transition: '0.4s',
                  borderRadius: '50%'
                }} />
              </span>
            </label>
            <span style={{ fontSize: '14px', color: '#666' }}>👑 Principal</span>
          </div>

          {isPrincipal && (
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>Secret Principal Code</label>
              <input
                type="password"
                value={principalCode}
                onChange={(e) => setPrincipalCode(e.target.value)}
                required
                placeholder="Enter secret code"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s',
                  backgroundColor: '#f9f9f9'
                }}
                onFocus={(e) => e.target.style.borderColor = '#764ba2'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
          )}

          {error && (
            <div style={{
              padding: '10px',
              backgroundColor: '#fee',
              color: '#c00',
              borderRadius: '8px',
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: 'bold',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            {isPrincipal ? '👑 Login as Principal' : '🚀 Login as Teacher'}
          </button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '12px', color: '#aaa' }}>
          School Management System v2.0
        </p>
      </div>
    </div>
  );
}

export default Login;
