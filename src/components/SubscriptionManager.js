import { useEffect, useState } from 'react';
import api from '../services/api';
import { useSchool } from '../context/SchoolContext';

function SubscriptionManager({ children }) {
  const [status, setStatus] = useState({ isLoading: true, isSubscribed: false, trialEndDate: null, trialExpired: false });
  const [showModal, setShowModal] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const { schoolId } = useSchool();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get(`/api/subscription/status?schoolId=${schoolId}`);
        setStatus({
          isLoading: false,
          isSubscribed: response.data.isSubscribed,
          trialEndDate: response.data.trialEndDate,
          trialExpired: response.data.trialExpired,
        });
        if (response.data.trialExpired && !response.data.isSubscribed) {
          setShowModal(true);
        }
      } catch (error) {
        console.error('Failed to fetch subscription status', error);
        setStatus({ isLoading: false, isSubscribed: false, trialEndDate: null, trialExpired: false });
      }
    };
    fetchStatus();
  }, [schoolId]);

  useEffect(() => {
    const checkPaystack = setInterval(() => {
      if (window.PaystackPop) {
        setPaystackLoaded(true);
        clearInterval(checkPaystack);
        console.log('✅ Paystack loaded successfully');
      }
    }, 500);

    return () => clearInterval(checkPaystack);
  }, []);

  const handlePaystackPayment = () => {
    if (!paystackLoaded) {
      alert('⚠️ Paystack is still loading. Please wait a moment and try again.');
      return;
    }

    try {
      // ✅ FIXED: Used 'function' instead of 'async' arrow function
      window.PaystackPop.setup({
        key: 'pk_live_827aae9b1ef3daa5bec39d6a04107e7131631541',
        email: 'kolawoleemanuel63@gmail.com',
        amount: 10000000,
        currency: 'NGN',
        callback: function(response) {
          // ✅ We handle the async logic inside the function
          const activateSubscription = async () => {
            setIsActivating(true);
            try {
              await api.post('/api/subscription/activate', { schoolId });
              setStatus(prev => ({ ...prev, isSubscribed: true, trialExpired: false }));
              setShowModal(false);
              alert('✅ Payment successful! Subscription active.');
            } catch (error) {
              alert('❌ Activation failed: ' + error.message);
            } finally {
              setIsActivating(false);
            }
          };
          activateSubscription();
        },
        onClose: function() {
          alert('Payment window closed.');
        }
      });
    } catch (error) {
      alert('❌ Error launching Paystack: ' + error.message);
    }
  };

  if (status.isLoading) return null;
  if (status.isSubscribed) return children;

  const trialEnd = status.trialEndDate ? new Date(status.trialEndDate) : null;
  const now = new Date();
  let daysRemaining = 0;
  if (trialEnd && trialEnd > now) {
    daysRemaining = Math.floor((trialEnd - now) / (1000 * 60 * 60 * 24));
  }

  const showBanner = !status.isSubscribed && !status.trialExpired && daysRemaining <= 5 && daysRemaining >= 0;

  return (
    <>
      {showBanner && (
        <div style={{ backgroundColor: '#f39c12', color: 'white', padding: '12px 20px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
          ⚠️ Trial ends in {daysRemaining} day{daysRemaining !== 1 ? 's' : ''}! 
          <button onClick={() => setShowModal(true)} style={{ marginLeft: '15px', padding: '5px 15px', backgroundColor: 'white', color: '#f39c12', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Subscribe Now</button>
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', maxWidth: '400px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
            <h2 style={{ color: '#e74c3c' }}>{status.trialExpired ? '🚫 Trial Expired' : '💳 Subscribe Now'}</h2>
            <p>{status.trialExpired ? 'Upgrade to keep using the system.' : 'Secure your school data with a subscription.'}</p>
            <div style={{ marginTop: '30px' }}>
              <button
                onClick={handlePaystackPayment}
                disabled={isActivating || !paystackLoaded}
                style={{ 
                  padding: '12px 30px', 
                  backgroundColor: '#27ae60', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '10px', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  opacity: (!paystackLoaded || isActivating) ? 0.7 : 1
                }}
              >
                {!paystackLoaded ? '⏳ Loading Paystack...' : isActivating ? 'Processing...' : `🔓 Subscribe ₦100,000 / year`}
              </button>
            </div>
            {!status.trialExpired && (
              <button onClick={() => setShowModal(false)} style={{ marginTop: '15px', backgroundColor: 'transparent', border: 'none', color: '#888', cursor: 'pointer', textDecoration: 'underline' }}>
                Continue with trial
              </button>
            )}
          </div>
        </div>
      )}

      {!status.trialExpired ? children : <div style={{ opacity: 0.3, pointerEvents: 'none' }}>{children}</div>}
    </>
  );
}

export default SubscriptionManager;