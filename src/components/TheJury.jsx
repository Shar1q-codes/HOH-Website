import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './TheJury.module.css';

const jurors = [
  {
    name: "Dr. Sarah Chen",
    title: "Tech Innovation Lead",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    intro: "Pioneering AI solutions for social impact"
  },
  {
    name: "Rajesh Kumar",
    title: "Social Enterprise Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    intro: "Building sustainable communities"
  },
  {
    name: "Priya Sharma",
    title: "Policy Innovator",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    intro: "Championing inclusive development"
  },
  {
    name: "Dr. Michael Chang",
    title: "Research Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    intro: "Advancing scientific frontiers"
  },
  {
    name: "Ananya Patel",
    title: "Cultural Curator",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    intro: "Preserving heritage through innovation"
  },
  {
    name: "Vikram Singh",
    title: "Community Builder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    intro: "Empowering grassroots initiatives"
  }
];

const TheJury = () => {
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

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const jurorCardVariants = {
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
            alt="Background" 
          />
        </div>
        
        {/* Justice Scale SVG */}
        <div className={styles.justiceScale}>
          <svg viewBox="0 0 100 100" className={styles.scaleSvg}>
            <path d="M50,10 L50,90 M30,30 L70,30 M20,50 L80,50" 
                  stroke="rgba(255,255,255,0.1)" 
                  strokeWidth="2" 
                  fill="none"/>
            <circle cx="50" cy="30" r="5" fill="rgba(255,255,255,0.2)"/>
            <circle cx="30" cy="50" r="5" fill="rgba(255,255,255,0.2)"/>
            <circle cx="70" cy="50" r="5" fill="rgba(255,255,255,0.2)"/>
          </svg>
        </div>
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
          This isn't a popularity contest. It's judgment by the wise.
        </motion.h2>

        <motion.div 
          className={styles.textContent}
          variants={containerVariants}
        >
          <motion.p variants={textVariants}>
            Our jury doesn't just watch. They listen. They dig deep. They debate.
          </motion.p>
          <motion.p variants={textVariants}>
            These are the ones who've led, built, broken barriers — and now, they pick the trailblazers who deserve the spotlight.
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.subhead}
          variants={textVariants}
        >
          <p>Each nomination is vetted by professionals with proven skin in the game.</p>
          <p>Meet our jurors — CEOs, change-makers, creators, policy champions, and quiet revolutionaries.</p>
        </motion.div>

        <motion.div 
          className={styles.jurorGrid}
          variants={containerVariants}
        >
          {jurors.map((juror, index) => (
            <motion.div
              key={juror.name}
              className={styles.jurorCard}
              variants={jurorCardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.jurorImage}>
                <img src={juror.image} alt={juror.name} />
                <div className={styles.spotlight} />
              </div>
              <div className={styles.jurorInfo}>
                <h3>{juror.name}</h3>
                <p className={styles.jurorTitle}>{juror.title}</p>
                <p className={styles.jurorIntro}>{juror.intro}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TheJury; 