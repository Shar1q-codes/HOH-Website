import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Footer.module.css';

const Footer = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Transform values for parallax and scaling effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const glowVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
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
      {/* Background with Parallax */}
      <motion.div 
        className={styles.backgroundContainer}
        style={{ y: backgroundY }}
      >
        <div className={styles.backgroundImage}>
          <img 
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop" 
            alt="Footer Background" 
          />
        </div>
        <div className={styles.gradientOverlay} />
      </motion.div>

      {/* Content */}
      <motion.div 
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ scale }}
      >
        <motion.div 
          className={styles.glowEffect}
          variants={glowVariants}
        />

        <motion.h2 
          className={styles.quote}
          variants={textVariants}
        >
          Hyderabad isn't just growing. It's rising. And so are its heroes.
        </motion.h2>

        <motion.div 
          className={styles.subtext}
          variants={textVariants}
        >
          Powered by <strong>TOT Awards – Triumphs of Talent</strong>
        </motion.div>

        <motion.div 
          className={styles.copyright}
          variants={textVariants}
        >
          © 2024 TOT Awards. All rights reserved.
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Footer; 