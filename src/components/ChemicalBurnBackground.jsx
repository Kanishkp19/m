import { motion } from 'framer-motion';

/**
 * ChemicalBurnBackground — A dark, moody animated gradient layer mimicking a "chemical burn".
 * Uses deep charcoal base with subtle warm grey and dark slate blue blurs.
 */
export default function ChemicalBurnBackground({ children }) {
  return (
    <div className="chemical-root">
      {/* Animated gradient layer */}
      <div className="chemical-layer">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="chemical-blobs"
        />
      </div>

      {/* Dark vignette for depth */}
      <div className="chemical-vignette" />

      {/* Content on top */}
      <div className="chemical-content">
        {children}
      </div>
    </div>
  );
}
