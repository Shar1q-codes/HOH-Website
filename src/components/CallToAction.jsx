import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './CallToAction.module.css';

const CallToAction = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values for parallax and scaling effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const dimming = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

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

  const headlineVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const handleNominateClick = () => {
    const formSection = document.getElementById('nominate-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className={styles.container}
      style={{ opacity }}
    >
      {/* Background with Parallax */}
      <motion.div 
        className={styles.backgroundContainer}
        style={{ y: backgroundY, scale, opacity: dimming }}
      >
        <div className={styles.backgroundImage}>
          <img 
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop" 
            alt="Cityscape Background" 
          />
        </div>
        
        {/* Spotlight Effect */}
        <div className={styles.spotlight} />
      </motion.div>

      {/* Content */}
      <motion.div 
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          className={styles.headline}
          variants={headlineVariants}
        >
          Every hero deserves their moment. This is yours.
        </motion.h2>

        <motion.div 
          className={styles.buttonContainer}
          variants={containerVariants}
        >
          <motion.button
            className={styles.ctaButton}
            variants={buttonVariants}
            onClick={handleNominateClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Nominate a Hero
          </motion.button>

          <motion.button
            className={styles.secondaryButton}
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Community
          </motion.button>

          <motion.button
            className={styles.secondaryButton}
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Become a Partner
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CallToAction; 