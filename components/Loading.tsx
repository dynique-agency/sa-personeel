'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    // Minimum 3 seconds loading time
    const minLoadTime = 3000;
    const startTime = Date.now();

    const startZoom = () => {
      setIsZooming(true);
      // Start fade out after zoom animation
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    };

    // Check if page is fully loaded
    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minLoadTime - elapsed);

      setTimeout(() => {
        startZoom();
      }, remaining);
    };

    // If page is already loaded
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
      }

      // Fallback: ensure minimum 3 seconds
      const fallbackTimer = setTimeout(() => {
        if (isLoading) {
          startZoom();
        }
      }, minLoadTime);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Logo Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isZooming ? { 
              scale: 1.5,
              opacity: 0
            } : { 
              scale: 1,
              opacity: 1
            }}
            transition={{ 
              duration: isZooming ? 0.8 : 1.2,
              ease: isZooming ? [0.25, 0.1, 0.25, 1] : [0.34, 1.56, 0.64, 1]
            }}
            className="relative w-48 h-24"
          >
            <Image
              src="/logo.webp"
              alt="SA Personeel"
              fill
              className="object-contain brightness-0 invert"
              priority
              quality={100}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;

