import React from 'react';
import { motion } from 'framer-motion';

// Replace this with your actual image path or asset setup from Solution 1/2
import LogoImage from '/logoloader.png';

const LogoLoader = () => {
  // Ultra-smooth physical transitions for a high-end application feel
  const springTransition = {
    type: 'spring',
    stiffness: 65,
    damping: 16,
    mass: 1,
  };

  return (
    <div style={styles.container}>
      {/* Dynamic Font Injection directly within the component */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Croissant+One&family=Montserrat:wght@700&display=swap');

        @keyframes loaderPulse {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 1; }
        }
        .loader-dot {
          animation: loaderPulse 1.4s ease-in-out infinite;
        }
      `}</style>

      <div style={styles.wrapper}>

        {/* 1. Logo Icon: Drops smoothly from the top — full image, no cropping */}
        <motion.div
          style={styles.logoIconContainer}
          initial={{ y: -120, opacity: 0, scale: 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ ...springTransition, delay: 0.1 }}
        >
          <img
            src={LogoImage}
            alt="Raju's Mobiles"
            style={styles.logoImgOnly}
          />
        </motion.div>

        {/* 2. Main Text: RAJU'S MOBILES (Using Croissant One Font) */}
        <div style={styles.textRow}>
          {/* RAJU'S slides from Left to Right */}
          <motion.span
            style={{ ...styles.textCommon, ...styles.rajuText }}
            initial={{ x: -160, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...springTransition, delay: 0.6 }}
          >
            RAJUS
          </motion.span>

          {/* MOBILES slides from Right to Left */}
          <motion.span
            style={{ ...styles.textCommon, ...styles.mobileText }}
            initial={{ x: 160, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...springTransition, delay: 0.6 }}
          >
            MOBILES
          </motion.span>
        </div>

        {/* 3. The Animated Accents & Slogan Area */}
        <div style={styles.sloganArea}>

          {/* Left Decorative Line: Grows from right to left */}
          <motion.div
            style={{ ...styles.lineAccent, ...styles.leftLine }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.8, delay: 1.1 }}
          />

          {/* Slogan Container: Scales gracefully outwards from the center */}
          <motion.div
            style={styles.sloganContainer}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...springTransition, delay: 1.0 }}
          >
            <span style={styles.blueDot}>•</span>
            <span style={styles.sloganText}>WE CARE WE REPAIR</span>
            <span style={styles.redDot}>•</span>
          </motion.div>

          {/* Right Decorative Line: Grows from left to right */}
          <motion.div
            style={{ ...styles.lineAccent, ...styles.rightLine }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.8, delay: 1.1 }}
          />

        </div>

        {/* 4. Subtle loading indicator dots — purely visual, signals "still loading" */}
        <motion.div
          style={styles.dotsRow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <span className="loader-dot" style={{ ...styles.loadDot, animationDelay: '0s' }} />
          <span className="loader-dot" style={{ ...styles.loadDot, animationDelay: '0.2s' }} />
          <span className="loader-dot" style={{ ...styles.loadDot, animationDelay: '0.4s' }} />
        </motion.div>

      </div>
    </div>
  );
};

// Layout configuration
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f0eb', // Custom requested background color — unchanged
    overflow: 'hidden',
    width: '100vw',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    padding: '0 20px',
  },

  /* ── Logo container — sized to fit the FULL image, no cropping ── */
  logoIconContainer: {
    width: 'min(260px, 60vw)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '4px',
  },
  logoImgOnly: {
    width: '100%',
    height: 'auto',
    display: 'block',
    objectFit: 'contain',
    filter: 'drop-shadow(0 8px 20px rgba(11,19,58,0.12))',
  },

  textRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '14px',
    whiteSpace: 'nowrap',
    marginTop: '6px',
    marginBottom: '2px',
    flexWrap: 'wrap',
  },
  textCommon: {
    fontFamily: '"Croissant One", serif', // Custom font style — unchanged
    fontSize: 'clamp(1.7rem, 6vw, 2.4rem)',
    fontWeight: 'normal',
    textTransform: 'uppercase',
  },
  rajuText: {
    color: '#0b133a', // Exact original dark deep blue/navy — unchanged
  },
  mobileText: {
    color: '#e41c1c', // Exact original red accent — unchanged
  },

  sloganArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '0 20px',
    gap: '12px',
    marginTop: '10px',
  },
  lineAccent: {
    height: '2px',
    flexGrow: 1,
    maxWidth: '100px',
    borderRadius: '2px',
  },
  leftLine: {
    background: 'linear-gradient(to left, #0b133a, transparent)',
    transformOrigin: 'right', // Forces growth animation outwards from center
  },
  rightLine: {
    background: 'linear-gradient(to right, #e41c1c, transparent)',
    transformOrigin: 'left', // Forces growth animation outwards from center
  },
  sloganContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
  },
  sloganText: {
    fontFamily: '"Montserrat", "Segoe UI", sans-serif',
    fontSize: 'clamp(0.72rem, 2.4vw, 0.9rem)',
    fontWeight: '700',
    color: '#202020',
    letterSpacing: '3px',
  },
  blueDot: {
    color: '#1e52d7',
    fontSize: '1.1rem',
  },
  redDot: {
    color: '#e41c1c',
    fontSize: '1.1rem',
  },

  /* ── Loading dots ── */
  dotsRow: {
    display: 'flex',
    gap: '6px',
    marginTop: '26px',
  },
  loadDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#0b133a',
    display: 'inline-block',
  },
};

export default LogoLoader;
