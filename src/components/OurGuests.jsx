import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimation } from 'framer-motion';
import styles from './OurGuests.module.css';

const guests = [
  {
    name: "Dr. Maya Reddy",
    title: "State Innovation Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Arjun Mehta",
    title: "Tech Entrepreneur",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Dr. Neha Sharma",
    title: "Healthcare Pioneer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Vikram Aditya",
    title: "Cultural Ambassador",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Priya Kapoor",
    title: "Social Impact Leader",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Dr. Rajan Patel",
    title: "Research Visionary",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  }
];

const OurGuests = () => {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values for parallax and scaling effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Calculate drag constraints
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  
  useEffect(() => {
    if (carouselRef.current) {
      const trackWidth = carouselRef.current.scrollWidth;
      const containerWidth = carouselRef.current.parentElement.offsetWidth;
      const maxDrag = -(trackWidth - containerWidth);
      setDragConstraints({ left: maxDrag, right: 0 });
    }
  }, []);

  // Handle drag end
  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const { offset, velocity } = info;
    
    if (Math.abs(velocity.x) > 500) {
      const direction = velocity.x < 0 ? 1 : -1;
      const targetX = x.get() + (direction * 300);
      controls.start({ x: targetX, transition: { type: "spring", damping: 30, stiffness: 200 } });
    }
  };

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
    hidden: { 
      opacity: 0,
      x: 100,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
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
            alt="Gala Background" 
          />
        </div>
        
        {/* Light Effects */}
        <div className={styles.lightBeam} />
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
          variants={textVariants}
        >
          Not just names on a list. Forces behind change.
        </motion.h2>

        <motion.div 
          className={styles.textContent}
          variants={containerVariants}
        >
          <motion.p variants={textVariants}>
            From state leaders to startup legends, from grassroots icons to global influencers — our guests are here not for visibility, but because they believe in visibility for others.
          </motion.p>
          <motion.p variants={textVariants}>
            They're not here to be seen. They're here to celebrate those who often go unseen.
          </motion.p>
        </motion.div>

        {/* Horizontal Scroll Carousel */}
        <motion.div 
          ref={carouselRef}
          className={styles.carouselContainer}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
          whileTap={{ cursor: "grabbing" }}
        >
          <div className={styles.carouselTrack}>
            {guests.map((guest, index) => (
              <motion.div
                key={guest.name}
                className={styles.guestCard}
                variants={cardVariants}
                whileHover={{ 
                  scale: isDragging ? 1 : 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className={styles.guestImage}>
                  <img src={guest.image} alt={guest.name} />
                  <div className={styles.glowEffect} />
                </div>
                <div className={styles.guestInfo}>
                  <h3>{guest.name}</h3>
                  <p className={styles.guestTitle}>{guest.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicators */}
        <motion.div 
          className={styles.scrollIndicators}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div 
            className={styles.scrollArrow}
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ←
          </motion.div>
          <div className={styles.scrollText}>Drag to explore</div>
          <motion.div 
            className={styles.scrollArrow}
            animate={{ x: [5, -5, 5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OurGuests; 