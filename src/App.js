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
        fontFamily: 'Segoe UI, Inter, -apple-system, Arial, sans-serif',
        minHeight: '100vh',
        padding: '20px',
        // 🌐 ELEGANT DEEP BACKGROUND (Subtle gradient, not plain grey)
        background: 'linear-gradient(145deg, #eef2f5 0%, #d9e2ec 100%)'
      }}>
        
        {/* Top Header Bar - DEEP NAVY GRADIENT (Premium Look) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '25px' 
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            padding: '18px 28px', 
            borderRadius: '16px', 
            flex: 1, 
            marginRight: '20px',
            boxShadow: '0 8px 30px rgba(15, 23, 42, 0.2)'
          }}>
            <h1 style={{ margin: 0, color: 'white', fontSize: '26px', fontWeight: 700, letterSpacing: '-0.5px' }}>🏫 School Management System</h1>
            <p style={{ margin: '5px 0 0', color: '#94a3b8', fontSize: '14px' }}>
              {isPrincipal ? '👑 Principal Mode' : '👨‍🏫 Teacher Mode'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setView(view === 'parent' ? 'dashboard' : 'parent')}
              style={{
                padding: '10px 20px',
                backgroundColor: 'white',
                color: '#0f172a',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                transition: 'all 0.2s'
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
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
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
            <div style={{ maxWidth: '800px', margin: '0 auto 25px' }}>
              <StatsCard />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '25px',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {/* Add Student Box - GLASSMORPHISM STYLE */}
              <div style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '25px', 
                borderRadius: '20px', 
                boxShadow: '0 10px 40px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03)',
                border: '1px solid rgba(255,255,255,0.8)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <span style={{ fontSize: '22px' }}>➕</span>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>Add New Student</h3>
                </div>
                <AddStudent />
              </div>

              {/* Mark Attendance Box - GLASSMORPHISM STYLE */}
              <div style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '25px', 
                borderRadius: '20px', 
                boxShadow: '0 10px 40px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03)',
                border: '1px solid rgba(255,255,255,0.8)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <span style={{ fontSize: '22px' }}>📋</span>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>Mark Attendance</h3>
                </div>
                <MarkAttendance />
              </div>
              
              {/* Upload Results Box - GLASSMORPHISM STYLE */}
              <div style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '25px', 
                borderRadius: '20px', 
                boxShadow: '0 10px 40px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03)',
                border: '1px solid rgba(255,255,255,0.8)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  <span style={{ fontSize: '22px' }}>📤</span>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>Upload Results</h3>
                </div>
                <UploadResult />
              </div>
            </div>

            {/* Student List Box - GLASSMORPHISM STYLE */}
            <div style={{ 
              maxWidth: '800px', 
              margin: '35px auto 0', 
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              padding: '25px', 
              borderRadius: '20px', 
              boxShadow: '0 10px 40px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03)',
              border: '1px solid rgba(255,255,255,0.8)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <span style={{ fontSize: '22px' }}>📚</span>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>Student List</h3>
              </div>
              <StudentList />
            </div>
          </>
        )}
      </div>
    </SubscriptionManager>
  );
}

export default App;