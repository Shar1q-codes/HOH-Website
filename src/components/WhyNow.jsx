import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './WhyNow.module.css';

const WhyNow = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values for parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className={styles.container}
      style={{ opacity }}
    >
      {/* Background Timeline */}
      <motion.div 
        className={styles.backgroundContainer}
        style={{ y: backgroundY }}
      >
        <div className={styles.timelineImages}>
          <div className={styles.imageLayer}>
            <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop" alt="Hyderabad Heritage" />
          </div>
          <div className={styles.imageLayer}>
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" alt="Modern Hyderabad" />
          </div>
          <div className={styles.imageLayer}>
            <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop" alt="Tech Hub" />
          </div>
        </div>
        
        {/* Face Overlays */}
        <div className={styles.faceOverlays}>
          <div className={styles.faceLayer}>
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt="Student" />
          </div>
          <div className={styles.faceLayer}>
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" alt="Doctor" />
          </div>
          <div className={styles.faceLayer}>
            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop" alt="Worker" />
          </div>
        </div>
      </motion.div>

      {/* Timeline Line */}
      <div className={styles.timelineLine} />

      {/* Content */}
      <motion.div 
        className={styles.content}
        style={{ y: contentY }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          className={styles.headline}
          variants={itemVariants}
        >
          Because real heroes don't wait for applause.
        </motion.h2>

        <motion.div 
          className={styles.textContent}
          variants={containerVariants}
        >
          <motion.p variants={itemVariants}>
            While the world scrolls past headlines, we pause to honour the people writing them.
          </motion.p>
          <motion.p variants={itemVariants}>
            In classrooms, clinics, kitchens, codebases — they're redefining what it means to lead.
          </motion.p>
          <motion.p variants={itemVariants}>
            We're not just telling their stories. We're making sure they echo.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WhyNow; 