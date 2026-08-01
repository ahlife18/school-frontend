import { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { useSchool } from '../context/SchoolContext';

function SchoolBranding({ children }) {
  const { schoolId } = useSchool();
  const [logoUrl, setLogoUrl] = useState('');
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!schoolId) return;

    // 1. Load the logo
    const logoRef = ref(storage, `schools/${schoolId}/logo.png`);
    getDownloadURL(logoRef)
      .then(url => setLogoUrl(url))
      .catch(() => setLogoUrl('')); // fallback if no logo

    // 2. Load all slide images
    const slidesRef = ref(storage, `schools/${schoolId}`);
    listAll(slidesRef).then(async (res) => {
      const urls = await Promise.all(
        res.items
          .filter(item => item.name.startsWith('slide'))
          .map(item => getDownloadURL(item))
      );
      setSlides(urls);
    }).catch(() => setSlides([]));
  }, [schoolId]);

  // Auto-rotate slides every 6 seconds
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* BACKGROUND SLIDESHOW (only if slides exist) */}
      {slides.length > 0 && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: -1,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${slides[currentSlide]})`,
          transition: 'background-image 1s ease-in-out',
          filter: 'brightness(0.4)' // darkens images so text remains readable
        }} />
      )}

      {/* FALLBACK BACKGROUND (if no slides) – your professional blue/grey */}
      {slides.length === 0 && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: -1,
          background: '#f0f4f8'
        }} />
      )}

      {/* LOGO (top‑left of header) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '20px'
      }}>
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt="School Logo" 
            style={{ height: '60px', borderRadius: '8px', background: 'white', padding: '4px' }}
          />
        ) : (
          <div style={{ height: '60px', width: '60px', background: '#e2e8f0', borderRadius: '8px' }} />
        )}
        {children}
      </div>
    </div>
  );
}

export default SchoolBranding;