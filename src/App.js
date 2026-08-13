import { useState, useEffect } from 'react';
import Login from './components/Login';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';
import MarkAttendance from './components/MarkAttendance';
import StatsCard from './components/StatsCard';
import PrincipalDashboard from './components/PrincipalDashboard';
import ParentPortal from './components/ParentPortal';
import UploadResult from './components/UploadResult';
import SubscriptionManager from './components/SubscriptionManager';
import SchoolSignUp from './components/SchoolSignUp';
import { useSchool } from './context/SchoolContext';

function App() {
  const [user, setUser] = useState(null);
  const [isPrincipal, setIsPrincipal] = useState(false);
  const [view, setView] = useState('dashboard');
  const { setSchoolId } = useSchool();

  // ✅ Read schoolId from URL on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('schoolId');
    if (id) {
      setSchoolId(id);
    }
  }, [setSchoolId]);

  // ✅ These functions were MISSING and causing the build error!
  const handleLogin = (user) => {
    setUser(user);
    setIsPrincipal(false);
    setView('dashboard');
  };

  const handlePrincipalLogin = (user) => {
    setUser(user);
    setIsPrincipal(true);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setIsPrincipal(false);
    setView('dashboard');
  };

  // ✅ FIXED: Only redirect to Sign-Up if on root path (/) with no schoolId
  const params = new URLSearchParams(window.location.search);
  const schoolIdFromUrl = params.get('schoolId');

  if (window.location.pathname === '/' && !schoolIdFromUrl && !user) {
    return <SchoolSignUp />;
  }

  if (!user) {
    return <Login onLogin={handleLogin} onPrincipalLogin={handlePrincipalLogin} />;
  }

  return (
    <SubscriptionManager>
      <div style={{ 
        fontFamily: 'Segoe UI, Arial, sans-serif',
        minHeight: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      }}>
        {/* Top Header Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
            padding: '15px 25px', 
            borderRadius: '15px', 
            flex: 1, 
            marginRight: '15px',
            boxShadow: '0 4px 15px rgba(0, 114, 255, 0.4)'
          }}>
            <h1 style={{ margin: 0, color: 'white' }}>🏫 School Management System</h1>
            <p style={{ margin: '5px 0 0', color: 'rgba(255,255,255,0.9)' }}>
              {isPrincipal ? '👑 Principal Mode' : '👨‍🏫 Teacher Mode'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setView(view === 'parent' ? 'dashboard' : 'parent')}
              style={{
                padding: '12px 20px',
                backgroundColor: '#fff',
                color: '#2c3e50',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              {view === 'parent' ? '📊 Back to Dashboard' : '👨‍👩‍👧 Parent Portal'}
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '12px 25px',
                backgroundColor: '#fff',
                color: '#e74c3c',
                border: '2px solid #e74c3c',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e74c3c';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#fff';
                e.target.style.color = '#e74c3c';
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {view === 'parent' ? (
          <ParentPortal />
        ) : isPrincipal ? (
          <PrincipalDashboard />
        ) : (
          <>
            <div style={{ maxWidth: '800px', margin: '0 auto 20px' }}>
              <StatsCard />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '25px',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              <div style={{ background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', padding: '25px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(161, 140, 209, 0.4)', color: 'white' }}>
                <h3 style={{ margin: '0 0 15px', fontSize: '20px' }}>➕ Add New Student</h3>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px', padding: '15px' }}>
                  <AddStudent />
                </div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '25px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(245, 87, 108, 0.4)', color: 'white' }}>
                <h3 style={{ margin: '0 0 15px', fontSize: '20px' }}>📋 Mark Attendance</h3>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px', padding: '15px' }}>
                  <MarkAttendance />
                </div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', padding: '25px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(67, 233, 123, 0.4)', color: 'white' }}>
                <h3 style={{ margin: '0 0 15px', fontSize: '20px' }}>📤 Upload Results</h3>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px', padding: '15px' }}>
                  <UploadResult />
                </div>
              </div>
            </div>

            <div style={{ maxWidth: '800px', margin: '30px auto 0', background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', padding: '25px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(67, 233, 123, 0.4)', color: 'white' }}>
              <h3 style={{ margin: '0 0 15px', fontSize: '20px' }}>📚 Student List</h3>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px', padding: '15px' }}>
                <StudentList />
              </div>
            </div>
          </>
        )}
      </div>
    </SubscriptionManager>
  );
}

export default App;