import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './TOTDifference.module.css';

const TOTDifference = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values for parallax and scaling effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
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
      {/* Background with Parallax */}
      <motion.div 
        className={styles.backgroundContainer}
        style={{ y: backgroundY, scale }}
      >
        <div className={styles.backgroundImage}>
          <img 
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" 
            alt="Jury Discussion" 
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
          variants={itemVariants}
        >
          No bias. No bro-club. Only merit.
        </motion.h2>

        <motion.div 
          className={styles.textContent}
          variants={containerVariants}
        >
          <motion.p variants={itemVariants}>
            TOT Awards is India's only jury-led, category-wide recognition platform.
          </motion.p>
          <motion.p variants={itemVariants}>
            Backed by real industry leaders. Zero paid PR.
          </motion.p>
          <motion.p variants={itemVariants}>
            Only substance. Only impact.
          </motion.p>
          <motion.p 
            className={styles.closingText}
            variants={itemVariants}
          >
            Because talent doesn't need a filter — it needs a fair shot.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TOTDifference; 