'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // Wait longer before loading video to ensure animations are smooth first
    const loadTimer = setTimeout(() => {
      // Use Intersection Observer to only load video when in viewport
      if (containerRef.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setShouldLoadVideo(true);
                observer.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
      } else {
        // Fallback if observer not supported
        setShouldLoadVideo(true);
      }
    }, 2000); // Wait 2 seconds after page load

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;

    const video = videoRef.current;
    if (!video) return;

    // Handle video loading with lower priority
    const handleLoadedMetadata = () => {
      // First frame is loaded, show it
      setIsVideoLoaded(true);
    };

    const handleCanPlay = () => {
      // Use requestAnimationFrame to not block animations
      requestAnimationFrame(() => {
        video.play().catch((error) => {
          console.log('Video autoplay prevented:', error);
        });
      });
    };

    const handleError = () => {
      console.error('Video failed to load');
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Load video metadata to get first frame
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [shouldLoadVideo]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
        {/* Video - Uses first frame as fallback */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-100'
            }`}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'translateZ(0)', // GPU acceleration
              willChange: 'opacity', // Optimize for opacity changes
            }}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* Subtle glass effect overlay */}
        <div 
          className="absolute inset-0 backdrop-blur-[1px] bg-white/5"
          style={{
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)',
          }}
        />
        
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-pure-black via-transparent to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-center"
          style={{ willChange: 'opacity' }}
        >
          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center">
            {/* Voor Werkgevers Button */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link
                href="/werkgevers"
                className="group inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-white text-black font-elegant font-semibold hover:bg-gray-100 border-2 border-white transition-all duration-500 uppercase tracking-[0.2em] text-xs md:text-sm shadow-2xl hover:shadow-white/30 hover:scale-105 relative overflow-hidden"
              >
                {/* Animated Background Gradient Shine */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full"></span>
                
                {/* Content */}
                <span className="relative z-10">Voor Werkgevers</span>
                <svg 
                  className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                
                {/* Bottom Border Accent */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-500"></span>
              </Link>
            </motion.div>

            {/* Voor Talenten Button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Link
                href="/talenten"
                className="group inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-transparent text-white font-elegant font-semibold hover:bg-white/10 border-2 border-white transition-all duration-500 uppercase tracking-[0.2em] text-xs md:text-sm shadow-2xl hover:shadow-white/30 hover:scale-105 relative overflow-hidden backdrop-blur-sm"
              >
                {/* Animated Background Gradient Shine */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full"></span>
                
                {/* Content */}
                <span className="relative z-10">Voor Talenten</span>
                <svg 
                  className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                
                {/* Bottom Border Accent */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500"></span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{ willChange: 'transform, opacity' }}
      >
        <motion.div
          className="flex flex-col items-center gap-3 cursor-pointer group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ willChange: 'transform' }}
        >
          <span className="text-pure-white/70 text-xs font-elegant tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-6 h-10 border-2 border-pure-white/30 rounded-full flex justify-center pt-2 group-hover:border-pure-white/60 transition-colors duration-300">
            <motion.div
              className="w-1 h-2 bg-pure-white/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/3 right-12 w-px h-32 bg-gradient-to-b from-transparent via-pure-white/20 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ willChange: 'transform' }}
      />
      <motion.div
        className="absolute bottom-1/3 left-12 w-px h-32 bg-gradient-to-b from-transparent via-pure-white/20 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{ willChange: 'transform' }}
      />
    </section>
  );
};

export default Hero;

