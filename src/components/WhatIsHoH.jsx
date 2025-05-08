import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './WhatIsHoH.module.css';

const WhatIsHoH = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Animation variants for staggered children
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const emojiVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className={styles.container}
      style={{ opacity }}
    >
      <motion.div 
        className={styles.background}
        style={{ y }}
      />
      
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
          Not your usual award show.
        </motion.h2>

        <motion.div 
          className={styles.textContent}
          variants={containerVariants}
        >
          <motion.p variants={itemVariants}>
            Heroes of Hyderabad is TOT Awards' tribute to real impact.
          </motion.p>
          <motion.p variants={itemVariants}>
            This isn't about TRPs, red carpets, or celebrity selfies.
          </motion.p>
          <motion.p variants={itemVariants}>
            It's about the real deal —
          </motion.p>

          <motion.div className={styles.heroesList}>
            {[
              { emoji: "🚀", text: "Entrepreneurs" },
              { emoji: "💡", text: "Innovators" },
              { emoji: "🛡️", text: "Social warriors" },
              { emoji: "🏥", text: "Health heroes" },
              { emoji: "🎨", text: "Cultural torchbearers" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={styles.heroItem}
                variants={itemVariants}
              >
                <motion.span 
                  className={styles.emoji}
                  variants={emojiVariants}
                >
                  {item.emoji}
                </motion.span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p 
            className={styles.closingText}
            variants={itemVariants}
          >
            …who shape Hyderabad's tomorrow, today.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WhatIsHoH; 