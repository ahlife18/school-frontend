import { useEffect, useState } from 'react';
import api from '../services/api';
import { useSchool } from '../context/SchoolContext';

function SubscriptionManager({ children }) {
  const [status, setStatus] = useState({ isLoading: true, isSubscribed: false, trialEndDate: null, trialExpired: false });
  const [showModal, setShowModal] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
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

  // 💳 PAYSTACK PAYMENT HANDLER (₦100,000/year)
  const handlePaystackPayment = () => {
    const paystack = new window.PaystackPop();
    paystack.newTransaction({
      key: 'pk_live_827aae9b1ef3daa5bec39d6a04107e7131631541',
      email: 'kolawoleemanuel63@gmail.com', // Your email for receipts
      amount: 10000000, // ₦100,000.00 (Paystack expects kobo: 100,000 × 100 = 10,000,000)
      currency: 'NGN',
      callback: async (response) => {
        // Payment successful!
        setIsActivating(true);
        try {
          await api.post('/api/subscription/activate', { schoolId });
          setStatus(prev => ({ ...prev, isSubscribed: true, trialExpired: false }));
          setShowModal(false);
          alert('✅ Payment successful! Your school subscription is now active for 1 year.');
        } catch (error) {
          alert('❌ Activation failed: ' + error.message);
        } finally {
          setIsActivating(false);
        }
      },
      onClose: () => {
        alert('Payment window closed. You can subscribe anytime.');
      }
    });
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
                disabled={isActivating}
                style={{ padding: '12px 30px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {isActivating ? 'Processing...' : `🔓 Subscribe ₦100,000 / year`}
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