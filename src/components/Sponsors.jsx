import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Sponsors.module.css';

const sponsorTiers = [
  {
    title: "Presenting Partner",
    logos: [
      {
        name: "Google",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
      }
    ]
  },
  {
    title: "Powered By",
    logos: [
      {
        name: "Adobe",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adobe_Systems_logo_and_wordmark.svg/1200px-Adobe_Systems_logo_and_wordmark.svg.png"
      },
      {
        name: "Airtable",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Airtable_Logo.svg/1200px-Airtable_Logo.svg.png"
      }
    ]
  },
  {
    title: "Associate Partners",
    logos: [
      {
        name: "Microsoft",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png"
      },
      {
        name: "Notion",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Notion_app_logo.png/1200px-Notion_app_logo.png"
      }
    ]
  },
  {
    title: "Community Partners",
    logos: [
      {
        name: "Slack",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1200px-Slack_icon_2019.svg.png"
      },
      {
        name: "Zapier",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Zapier_logo.svg/1200px-Zapier_logo.svg.png"
      }
    ]
  }
];

const Sponsors = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values for parallax and scaling effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
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

  const tierVariants = {
    hidden: { 
      opacity: 0,
      y: 50
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

  const logoVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
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
            alt="Gala Background" 
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
      >
        <motion.h2 
          className={styles.headline}
          variants={textVariants}
        >
          Heroes rise. And these brands rise with them.
        </motion.h2>

        <motion.div 
          className={styles.textContent}
          variants={containerVariants}
        >
          <motion.p variants={textVariants}>
            We don't look for sponsors. We look for believers.
          </motion.p>
          <motion.p variants={textVariants}>
            Those who see value beyond visibility. Impact beyond impressions.
          </motion.p>
          <motion.p variants={textVariants}>
            These are brands who stand up for talent, and put their weight behind recognition with integrity.
          </motion.p>
          <motion.p variants={textVariants}>
            Together, we're not just hosting a show — we're rewriting what awards should stand for.
          </motion.p>
        </motion.div>

        {/* Sponsor Tiers */}
        <div className={styles.sponsorTiers}>
          {sponsorTiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              className={styles.tier}
              variants={tierVariants}
              custom={index}
            >
              <h3 className={styles.tierTitle}>{tier.title}</h3>
              <div className={styles.logoGrid}>
                {tier.logos.map((logo) => (
                  <motion.div
                    key={logo.name}
                    className={styles.logoContainer}
                    variants={logoVariants}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <img 
                      src={logo.image} 
                      alt={logo.name} 
                      className={styles.logo}
                    />
                    <div className={styles.glowEffect} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sponsors; 