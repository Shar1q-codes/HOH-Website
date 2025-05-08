import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values for parallax and scaling effects
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className={styles.heroContainer}>
      <motion.div 
        className={styles.backgroundImage}
        style={{
          scale,
          backgroundImage: 'url("https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop")'
        }}
      />
      
      <motion.div 
        className={styles.content}
        style={{ opacity, y }}
      >
        <motion.h1 
          className={styles.headline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A city isn't built by stone. It's built by spirit.
        </motion.h1>
        
        <motion.p 
          className={styles.subtext}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          From quiet changemakers to bold visionaries, Hyderabad pulses with unsung brilliance.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Hero; 