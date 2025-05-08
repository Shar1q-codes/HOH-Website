import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './WhoGetsNominated.module.css';

const WhoGetsNominated = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values for parallax and scaling effects
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className={styles.container}
      style={{ opacity }}
    >
      {/* Mosaic Background */}
      <motion.div 
        className={styles.mosaicContainer}
        style={{ scale }}
      >
        <div className={styles.mosaicGrid}>
          {[
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1573497019236-a73cb5a89240?q=80&w=1974&auto=format&fit=crop"
          ].map((src, index) => (
            <div key={index} className={styles.mosaicItem}>
              <img src={src} alt={`Portrait ${index + 1}`} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Content Overlay */}
      <motion.div 
        className={styles.content}
        style={{ y }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          className={styles.headline}
          variants={itemVariants}
        >
          No ivory towers. Just incredible humans.
        </motion.h2>

        <motion.div 
          className={styles.textContent}
          variants={containerVariants}
        >
          <motion.p variants={itemVariants}>
            You don't need a million followers to be a Hero.
          </motion.p>
          <motion.p variants={itemVariants}>
            You need courage. Consistency. And that stubborn refusal to give up.
          </motion.p>
          
          <motion.p variants={itemVariants}>
            We look for:
          </motion.p>

          <motion.ul className={styles.bulletList}>
            {[
              "Groundbreakers, not gatekeepers",
              "Community-first leaders",
              "Game changers in arts, science, sports, startups, service & more"
            ].map((text, index) => (
              <motion.li 
                key={index}
                variants={bulletVariants}
                className={styles.bulletItem}
              >
                <span className={styles.bullet}>•</span>
                {text}
              </motion.li>
            ))}
          </motion.ul>

          <motion.p variants={itemVariants}>
            Nominate someone. Or nominate yourself.
          </motion.p>
          <motion.p 
            className={styles.closingText}
            variants={itemVariants}
          >
            This city knows how to back its own.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WhoGetsNominated; 