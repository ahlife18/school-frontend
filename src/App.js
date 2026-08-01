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
import { useSchool } from './context/SchoolContext';

function App() {
  const [user, setUser] = useState(null);
  const [isPrincipal, setIsPrincipal] = useState(false);
  const [view, setView] = useState('dashboard');
  const { setSchoolId } = useSchool();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('schoolId');
    if (id) {
      setSchoolId(id);
    }
  }, [setSchoolId]);

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

  if (!user) {
    return <Login onLogin={handleLogin} onPrincipalLogin={handlePrincipalLogin} />;
  }

  return (
    <SubscriptionManager>
      <div style={{ 
        fontFamily: 'Segoe UI, Inter, Arial, sans-serif',
        minHeight: '100vh',
        padding: '20px',
        // 🌐 PROFESSIONAL BACKGROUND (Clean white/grey with subtle blue)
        background: '#f0f4f8' // Soft, institutional light grey-blue
      }}>
        
        {/* Top Header Bar - DEEP BLUE (Professional & Trusted) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}>
          <div style={{ 
            background: '#1e293b', // Deep, dark slate blue (Corporate)
            padding: '15px 25px', 
            borderRadius: '12px', 
            flex: 1, 
            marginRight: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h1 style={{ margin: 0, color: 'white', fontSize: '24px', fontWeight: 600 }}>🏫 School Management System</h1>
            <p style={{ margin: '5px 0 0', color: '#94a3b8', fontSize: '14px' }}>
              {isPrincipal ? '👑 Principal Mode' : '👨‍🏫 Teacher Mode'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setView(view === 'parent' ? 'dashboard' : 'parent')}
              style={{
                padding: '10px 18px',
                backgroundColor: 'white',
                color: '#1e293b',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '14px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              {view === 'parent' ? '📊 Dashboard' : '👨‍👩‍👧 Parent Portal'}
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px'
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
              gap: '20px',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {/* Add Student Box - CLEAN WHITE */}
              <div style={{ 
                backgroundColor: 'white',
                padding: '20px', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ margin: '0 0 15px', fontSize: '18px', color: '#1e293b' }}>➕ Add New Student</h3>
                <AddStudent />
              </div>

              {/* Mark Attendance Box - CLEAN WHITE */}
              <div style={{ 
                backgroundColor: 'white',
                padding: '20px', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ margin: '0 0 15px', fontSize: '18px', color: '#1e293b' }}>📋 Mark Attendance</h3>
                <MarkAttendance />
              </div>
              
              {/* Upload Results Box - CLEAN WHITE */}
              <div style={{ 
                backgroundColor: 'white',
                padding: '20px', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ margin: '0 0 15px', fontSize: '18px', color: '#1e293b' }}>📤 Upload Results</h3>
                <UploadResult />
              </div>
            </div>

            {/* Student List Box - CLEAN WHITE */}
            <div style={{ 
              maxWidth: '800px', 
              margin: '30px auto 0', 
              backgroundColor: 'white',
              padding: '20px', 
              borderRadius: '12px', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ margin: '0 0 15px', fontSize: '18px', color: '#1e293b' }}>📚 Student List</h3>
              <StudentList />
            </div>
          </>
        )}
      </div>
    </SubscriptionManager>
  );
}

export default App;