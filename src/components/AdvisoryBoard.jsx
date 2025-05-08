import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './AdvisoryBoard.module.css';

const advisors = [
  {
    name: "Dr. Aisha Khan",
    title: "Strategic Vision Lead",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    position: { x: 0, y: 0 }
  },
  {
    name: "Prof. Rajiv Menon",
    title: "Innovation Architect",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    position: { x: 1, y: 1 }
  },
  {
    name: "Dr. Priya Sharma",
    title: "Research Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    position: { x: -1, y: 1 }
  },
  {
    name: "Vikram Singh",
    title: "Tech Strategy Lead",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    position: { x: 1, y: -1 }
  },
  {
    name: "Ananya Patel",
    title: "Cultural Strategy",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    position: { x: -1, y: -1 }
  }
];

const AdvisoryBoard = () => {
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
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const cardVariants = {
    hidden: (position) => ({ 
      opacity: 0,
      x: position.x * 100,
      y: position.y * 100,
      scale: 0.8
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
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
      {/* Blueprint Background */}
      <motion.div 
        className={styles.backgroundContainer}
        style={{ y: backgroundY, scale }}
      >
        <div className={styles.blueprintGrid} />
        <div className={styles.connectionLines} />
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
          variants={textVariants}
        >
          We don't just execute. We evolve — with the right minds beside us.
        </motion.h2>

        <motion.div 
          className={styles.textContent}
          variants={containerVariants}
        >
          <motion.p variants={textVariants}>
            The Heroes of Hyderabad is mentored by a diverse advisory board of thinkers, builders, dreamers, and enablers.
          </motion.p>
          <motion.p variants={textVariants}>
            Their role? To keep us real. Sharp. Grounded. And always ahead of the curve.
          </motion.p>
          <motion.p variants={textVariants}>
            They shape the strategy, steer the spirit, and stand as the moral compass behind TOT.
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.advisorGrid}
          variants={containerVariants}
        >
          {advisors.map((advisor) => (
            <motion.div
              key={advisor.name}
              className={styles.advisorCard}
              custom={advisor.position}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <div className={styles.advisorImage}>
                <img src={advisor.image} alt={advisor.name} />
                <div className={styles.glowEffect} />
              </div>
              <div className={styles.advisorInfo}>
                <h3>{advisor.name}</h3>
                <p className={styles.advisorTitle}>{advisor.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdvisoryBoard; 