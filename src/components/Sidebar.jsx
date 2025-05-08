import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Sidebar.module.css';

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'what-is-hoh', label: 'What is HoH' },
  { id: 'why-now', label: 'Why Now' },
  { id: 'nominate', label: 'Who Gets Nominated' },
  { id: 'tot-difference', label: 'TOT Difference' },
  { id: 'event-night', label: 'Event Night' },
  { id: 'jury', label: 'The Jury' },
  { id: 'guests', label: 'Our Guests' },
  { id: 'advisory-board', label: 'Advisory Board' },
  { id: 'sponsors', label: 'Sponsors' },
  { id: 'cta', label: 'Join Us' }
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const isMobile = useRef(window.innerWidth < 768);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };

    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
      if (!isMobile.current) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      if (isMobile.current) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {isMobile.current && (
        <motion.button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </motion.button>
      )}
      
      <AnimatePresence>
        {(!isMobile.current || isMobileMenuOpen) && (
          <motion.nav
            className={`${styles.sidebar} ${isVisible ? styles.visible : ''}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className={styles.sidebarContent}>
              {sections.map(({ id, label }) => (
                <motion.button
                  key={id}
                  className={`${styles.navItem} ${activeSection === id ? styles.active : ''}`}
                  onClick={() => scrollToSection(id)}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={styles.navLabel}>{label}</span>
                  {activeSection === id && (
                    <motion.div
                      className={styles.activeIndicator}
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar; 