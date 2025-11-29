'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectorenRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const { scrollYProgress: sectorenScrollProgress } = useScroll({
    target: sectorenRef,
    offset: ['start end', 'end start']
  });

  // Sectie glijdt van beneden naar boven over de hero
  const y = useTransform(scrollYProgress, [0, 1], ['100vh', '0vh']);
  
  // Parallax effect voor sectoren achtergrond (scrollt langzamer)
  const backgroundY = useTransform(sectorenScrollProgress, [0, 1], ['0%', '30%']);

  return (
    <main className="min-h-screen bg-pure-black relative">
      <Header />
      
      {/* Hero - Statisch */}
      <div ref={heroRef} className="relative h-screen w-full z-10">
        <Hero />
      </div>

      {/* Diensten Sectie - Glijdt direct over hero zonder ruimte */}
      <motion.section 
        id="diensten" 
        className="relative py-20 md:py-28 bg-white z-30"
        style={{ 
          y,
          marginTop: '-100vh'
        }}
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 md:mb-20"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block px-4 py-1.5 border border-black text-black text-[10px] font-elegant font-semibold tracking-[0.2em] uppercase mb-4"
              >
                Onze Diensten
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-black mb-3 tracking-tight"
              >
                Samen bouwen aan succes
              </motion.h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-16 h-px bg-black mx-auto"
              ></motion.div>
            </motion.div>

            {/* Voor Werkgevers - Full Width Premium Block */}
            <motion.div 
              id="werkgevers" 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-12 md:mb-16 lg:mb-24"
            >
              <div className="bg-gray-50 border-t-4 border-black overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 rounded-lg">
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Image Section */}
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-2 relative h-48 sm:h-64 lg:h-auto lg:min-h-[400px] overflow-hidden rounded-l-lg"
                  >
                    <Image
                      src="/werkgeversindex.webp"
                      alt="Voor Werkgevers - SA Personeel"
                      fill
                      className="object-cover"
                      quality={85}
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:hidden"></div>
                  </motion.div>
                  
                  {/* Content Section */}
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="lg:col-span-3 p-6 sm:p-8 md:p-12"
                  >
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: 'auto' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-8 md:w-12 h-px bg-black"
                      ></motion.div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-semibold text-black tracking-tight uppercase">
                        Voor Werkgevers
                      </h3>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6 mb-6">
                      {[
                        { title: 'Werving & Selectie', desc: 'Het vinden van de juiste kandidaat voor een vaste aanstelling.', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
                        { title: 'Uitzenden', desc: 'Flexibele inzet van personeel met mogelijkheid tot overname.', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                        { title: 'Screening', desc: 'Grondige screening op vaardigheden en betrouwbaarheid.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
                      ].map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                          className="group"
                        >
                          <div className="flex items-start gap-3 mb-3">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-8 h-8 bg-black flex items-center justify-center flex-shrink-0 rounded-sm"
                      >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                              </svg>
                            </motion.div>
                            <div className="flex-1">
                              <h4 className="text-base font-display font-semibold text-black mb-1 tracking-tight">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <Link
                        href="/werkgevers"
                        className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white font-elegant font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider text-xs md:text-sm group rounded-sm"
                      >
                        <span>Ontdek Onze Diensten</span>
                        <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Voor Talenten - Full Width Premium Block (Reversed) */}
            <motion.div 
              id="talenten"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="bg-black border-t-4 border-white overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 rounded-lg">
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Content Section */}
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-3 p-6 sm:p-8 md:p-12 order-2 lg:order-1"
                  >
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: 'auto' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-8 md:w-12 h-px bg-white"
                      ></motion.div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-semibold text-white tracking-tight uppercase">
                        Voor Talenten
                      </h3>
                    </div>
                    
                    <div className="space-y-6">
                      {[
                        { title: 'Persoonlijke Begeleiding', desc: '1-op-1 coaching, ook na plaatsing.', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                        { title: 'Sollicitatieondersteuning', desc: 'Begeleiding bij gesprekken en introductie bij opdrachtgever.', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
                        { title: 'Carrièreplanning', desc: 'Focus op lange termijn doelen en de droombaan.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' }
                      ].map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          className="group border-l-2 border-white/30 pl-6 hover:border-white transition-colors duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <motion.div 
                              whileHover={{ scale: 1.1 }}
                              className="w-8 h-8 border border-white flex items-center justify-center flex-shrink-0"
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                              </svg>
                            </motion.div>
                            <div className="flex-1">
                              <h4 className="text-base font-display font-semibold text-white mb-1 tracking-tight">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-300 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="mt-6"
                    >
                      <Link
                        href="/talenten"
                        className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-black font-elegant font-medium hover:bg-gray-200 transition-all duration-300 uppercase tracking-wider text-xs md:text-sm group rounded-sm"
                      >
                        <span>Start Jouw Carrière</span>
                        <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </motion.div>
                  </motion.div>
                  {/* Image Section */}
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="lg:col-span-2 relative h-48 sm:h-64 lg:h-auto lg:min-h-[400px] order-1 lg:order-2 overflow-hidden rounded-r-lg"
                  >
                    <Image
                      src="/talentenindex.webp"
                      alt="Voor Talenten - SA Personeel"
                      fill
                      className="object-cover"
                      quality={85}
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent lg:hidden"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Sectoren - Ultra Premium Compact */}
      <motion.section 
        ref={sectorenRef}
        id="sectoren" 
        className="relative py-16 md:py-20 bg-black overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/sectoren.webp"
              alt="Sectoren achtergrond"
              fill
              className="object-cover opacity-35"
              quality={90}
            />
          </motion.div>
          {/* Dark overlay for better contrast */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-10 md:mb-12"
            >
              {/* Header Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <span className="inline-block px-4 py-1.5 border-b-2 border-white text-white text-[10px] font-elegant font-semibold tracking-[0.2em] uppercase mb-4">
                  Onze Sectoren
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 tracking-tight leading-tight">
                  <span className="text-white">Zeven Sectoren,</span>
                  <br />
                  <span className="text-gray-400">Onze Expertise</span>
                </h2>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  Wij leveren toptalent met specifieke expertise per vakgebied aan zeven verschillende <span className="text-gray-400">sectoren</span>.
                </p>
              </motion.div>
            </motion.div>

            {/* Auto-Scrolling Carousel */}
            <div className="relative">
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
              
              {/* Scrolling Container */}
              <div className="overflow-hidden">
                <div className="flex gap-6 animate-scroll">
                  {/* All sector cards - keeping existing structure */}
                  {[
                    { name: 'Operators & Productie', desc: 'Productiemedewerker • Machine Operator • Procesoperator', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
                    { name: 'Techniek & Engineering', desc: 'Engineer • Onderhoudsmonteur • IT-specialist', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                    { name: 'Bouw & Infra', desc: 'Bouwvakker • Grondwerker • Timmerman', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                    { name: 'Procestechniek', desc: 'Procesbeheerder • Technisch Operator', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
                    { name: 'Transport & Logistiek', desc: 'Logistiek medewerker • Heftruckchauffeur • Chauffeur', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
                    { name: 'HR & Office', desc: 'Administratief • HR-support • Klantenservice', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                    { name: 'Sales', desc: 'Account Manager • Sales Representative • Business Developer', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
                  ].map((sector, idx) => (
                    <div key={`${sector.name}-${idx}`} className="flex-shrink-0 w-80 bg-white p-5 border-t-4 border-white shadow-lg rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0 rounded-sm">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sector.icon} />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-display font-semibold text-black mb-1.5 tracking-tight">
                            {sector.name}
                          </h3>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {sector.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {[
                    { name: 'Operators & Productie', desc: 'Productiemedewerker • Machine Operator • Procesoperator', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
                    { name: 'Techniek & Engineering', desc: 'Engineer • Onderhoudsmonteur • IT-specialist', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                    { name: 'Bouw & Infra', desc: 'Bouwvakker • Grondwerker • Timmerman', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                    { name: 'Procestechniek', desc: 'Procesbeheerder • Technisch Operator', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
                    { name: 'Transport & Logistiek', desc: 'Logistiek medewerker • Heftruckchauffeur • Chauffeur', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
                    { name: 'HR & Office', desc: 'Administratief • HR-support • Klantenservice', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                    { name: 'Sales', desc: 'Account Manager • Sales Representative • Business Developer', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
                  ].map((sector, idx) => (
                    <div key={`dup-${sector.name}-${idx}`} className="flex-shrink-0 w-80 bg-white p-5 border-t-4 border-white shadow-lg rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0 rounded-sm">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sector.icon} />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-display font-semibold text-black mb-1.5 tracking-tight">
                            {sector.name}
                          </h3>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {sector.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium CTA Button - Centered */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 md:mt-16 text-center"
            >
              <Link
                href="/sectoren"
                className="group inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-white text-black font-elegant font-semibold hover:bg-gray-50 border-2 border-white transition-all duration-500 uppercase tracking-[0.2em] text-xs md:text-sm shadow-2xl hover:shadow-white/30 hover:scale-105 relative overflow-hidden rounded-lg"
              >
                {/* Animated Background Gradient Shine */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full"></span>
                
                {/* Glow Effect */}
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 blur-xl transition-all duration-500"></span>
                
                {/* Content */}
                <span className="relative z-10">Bekijk Alle Informatie</span>
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
          </div>
        </div>
        </div>
      </motion.section>

      {/* Over Ons Sectie - Professional & Compact */}
      <section id="over-ons" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Compact Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-10"
            >
              <span className="inline-block px-4 py-1.5 border-b-2 border-black text-black text-[10px] font-elegant font-semibold tracking-[0.2em] uppercase mb-3">
                Over Ons
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-black mb-2 tracking-tight">
                Samen bouwen aan succes
              </h2>
            </motion.div>

            {/* Image + Content Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="grid lg:grid-cols-5 gap-0 bg-gray-50 shadow-xl overflow-hidden rounded-lg"
            >
              {/* Left Image */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 relative h-64 lg:h-auto lg:min-h-[450px] overflow-hidden rounded-l-lg"
              >
                <Image
                  src="/shero.webp"
                  alt="SA Personeel - Professioneel Team"
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'left center' }}
                  quality={85}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </motion.div>
              
              {/* Main Content */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3 p-6 md:p-8 lg:p-10"
              >
                {/* Intro Text */}
                <div className="mb-8">
                  <div className="w-12 h-0.5 bg-black mb-4"></div>
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 font-body">
                    SA Personeel Talent Solutions verbindt gekwalificeerde vakmensen met toonaangevende bedrijven. 
                    Gespecialiseerd in productie, techniek, bouw, transport, logistiek en sales professionals.
                  </p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    Met jarenlange ervaring maken wij recruitment weer persoonlijk. 
                    De juiste match gaat verder dan een cv - wij bouwen aan langetermijn relaties.
                  </p>
                </div>
                
                {/* Premium USP Grid */}
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8">
                  {[
                    { title: 'Uitstekende Service', desc: 'Premium dienstverlening met persoonlijke aandacht', icon: 'M5 13l4 4L19 7' },
                    { title: 'Perfecte Match', desc: 'Grondige screening voor lange termijn succes', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                    { title: 'Doelgericht', desc: 'Bewezen resultaten in diverse sectoren', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { title: '1-op-1 Begeleiding', desc: 'Persoonlijke coaching gedurende het hele proces', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="group border-l-4 border-black/20 hover:border-black transition-colors duration-300 pl-4 py-2 rounded-r-sm"
                    >
                      <div className="flex items-start gap-3">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0 rounded-sm"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                          </svg>
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-base font-display font-semibold text-black mb-1 tracking-tight">{item.title}</h3>
                          <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Dual CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    href="/overons"
                    className="group inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white font-elegant font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider text-xs md:text-sm rounded-sm"
                  >
                    <span>Ontdek Ons Verhaal</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 border-2 border-black text-black font-elegant font-medium hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-wider text-xs md:text-sm rounded-sm"
                  >
                    <span>Neem Contact Op</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
