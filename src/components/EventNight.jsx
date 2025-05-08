import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './EventNight.module.css';

const EventNight = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values for parallax and scaling effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2
      }
    }
  };

  const headlineVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      filter: "blur(5px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
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
      {/* Background with Parallax */}
      <motion.div 
        className={styles.backgroundContainer}
        style={{ y: backgroundY, scale }}
      >
        <div className={styles.backgroundImage}>
          <img 
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop" 
            alt="Stage Celebration" 
          />
        </div>
        
        {/* Light Effects */}
        <div className={styles.lightEffect} />
        <div className={styles.lightPulse} />
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
          A night to remember. A legacy to build.
        </motion.h2>

        <motion.div 
          className={styles.textContent}
          variants={containerVariants}
        >
          <motion.p variants={textVariants}>
            Expect bold speeches. Unfiltered stories.
          </motion.p>
          <motion.p variants={textVariants}>
            Powerful performances. And moments that make you believe again.
          </motion.p>
          <motion.p variants={textVariants}>
            The kind of night you don't just attend —
          </motion.p>
          <motion.p 
            className={styles.closingText}
            variants={textVariants}
          >
            You feel it. You remember it. You talk about it for years.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EventNight; 