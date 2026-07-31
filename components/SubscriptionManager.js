import { useEffect, useState } from 'react';
import api from '../services/api';
import { differenceInDays, differenceInHours, parseISO } from 'date-fns';

function SubscriptionManager({ children }) {
  const [status, setStatus] = useState({ isLoading: true, isSubscribed: false, trialEndDate: null, trialExpired: false });
  const [showModal, setShowModal] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

 import { useSchool } from '../context/SchoolContext';

// Inside the component:
const { schoolId } = useSchool();

useEffect(() => {
  const fetchStatus = async () => {
    try {
      const response = await api.get(`/api/subscription/status?schoolId=${schoolId}`);
      // ... rest of the code
    } catch (error) {
      // ...
    }
  };
  fetchStatus();
}, [schoolId]);
  async function handleSubscribe() {
    setIsActivating(true);
    try {
      // Simulate payment: call activation endpoint
      await api.post('/api/subscription/activate');
      setStatus(prev => ({ ...prev, isSubscribed: true, trialExpired: false }));
      setShowModal(false);
      alert('✅ Subscription activated successfully!');
    } catch (error) {
      alert('❌ Activation failed: ' + error.message);
    } finally {
      setIsActivating(false);
    }
  }

  // If still loading, don't show anything
  if (status.isLoading) return null;

  // If already subscribed, show children normally
  if (status.isSubscribed) return children;

  // Calculate days and hours remaining
  const trialEnd = status.trialEndDate ? parseISO(status.trialEndDate) : null;
  const now = new Date();
  let daysRemaining = 0, hoursRemaining = 0;
  if (trialEnd && trialEnd > now) {
    daysRemaining = differenceInDays(trialEnd, now);
    hoursRemaining = differenceInHours(trialEnd, now) % 24;
  }

  // ----- BANNER (trial active but within 5 days) -----
  const showBanner = !status.isSubscribed && !status.trialExpired && daysRemaining <= 5 && daysRemaining >= 0;

  return (
    <>
      {/* Banner */}
      {showBanner && (
        <div style={{
          backgroundColor: '#f39c12',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '10px',
          textAlign: 'center',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          ⚠️ Your trial will expire in {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} 
          {hoursRemaining > 0 && ` and ${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''}`}. 
          <button 
            onClick={() => setShowModal(true)}
            style={{
              marginLeft: '15px',
              padding: '5px 15px',
              backgroundColor: 'white',
              color: '#f39c12',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Subscribe Now
          </button>
        </div>
      )}

      {/* Modal for expired trial or when user clicks subscribe */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '20px',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ color: '#e74c3c' }}>{status.trialExpired ? '🚫 Trial Expired' : '💳 Subscribe Now'}</h2>
            <p>
              {status.trialExpired 
                ? 'Your free trial has ended. To continue using all features, please subscribe.'
                : 'Upgrade to a paid subscription to keep using the system without interruption.'}
            </p>
            <div style={{ marginTop: '30px' }}>
              <button
                onClick={handleSubscribe}
                disabled={isActivating}
                style={{
                  padding: '12px 30px',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {isActivating ? 'Processing...' : '🔓 Subscribe Now'}
              </button>
            </div>
            {!status.trialExpired && (
              <button
                onClick={() => setShowModal(false)}
                style={{
                  marginTop: '15px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#888',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textDecoration: 'underline'
                }}
              >
                Continue with trial
              </button>
            )}
          </div>
        </div>
      )}

      {/* Render children (the dashboard) – but if trial expired, we will show a message instead of children? 
          However, the middleware already blocks POST/DELETE, so we can still show the dashboard but the user will see errors. 
          We can optionally hide the write functionality. For now, we pass children through, but we might want to show an overlay. 
          We'll let the backend handle blocking, and the modal will be persistent if expired. 
      */}
      {!status.trialExpired ? children : (
        <>
          {/* If trial expired, we show a full-page overlay with the modal already shown */}
          <div style={{ opacity: 0.3, pointerEvents: 'none' }}>
            {children}
          </div>
        </>
      )}
    </>
  );
}

export default SubscriptionManager;