'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { sectoren } from '@/data/sectoren'

export default function Sectoren() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Ultra Premium Hero */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 border-b-2 border-white text-white text-[10px] font-elegant font-semibold tracking-[0.25em] uppercase mb-4"
            >
              Onze Sectoren
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight"
            >
              <span className="text-white">Expertise in Elke</span> <span className="text-gray-400">Sector</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8"
            >
              Van productie tot sales, van techniek tot HR. Wij matchen talent met toonaangevende organisaties in diverse sectoren.
            </motion.p>
            
            {/* Dual CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/werkgevers"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-elegant font-medium hover:bg-gray-100 transition-all duration-300 uppercase tracking-wider text-xs"
              >
                <span>Voor Werkgevers</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/talenten"
                className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-elegant font-medium hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wider text-xs"
              >
                <span>Voor Talenten</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
        {/* Decorative Elements */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/3 right-12 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-1/3 left-12 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent"
        />
      </section>

      {/* Sectoren Grid - Ultra Premium */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-12 md:py-16 bg-white"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {sectoren.map((sector, index) => (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-black text-white p-6 md:p-8 border-t-4 border-white hover:border-gray-400 transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 border border-white flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sector.icon} />
                    </svg>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-display font-semibold mb-3 tracking-tight group-hover:text-gray-300 transition-colors">
                    {sector.naam}
                  </h2>

                  {/* Functions */}
                  <p className="text-xs text-gray-400 mb-4 uppercase tracking-wider font-elegant font-medium">
                    {sector.functies}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-300 leading-relaxed mb-6">
                    {sector.beschrijving}
                  </p>

                  {/* Dual CTAs per sector */}
                  <div className="space-y-2 pt-4 border-t border-white/20">
                    <Link
                      href="/werkgevers#contact"
                      className="block w-full px-4 py-2 bg-white text-black text-center text-xs font-elegant font-medium hover:bg-gray-100 transition-all duration-300 uppercase tracking-wider"
                    >
                      Zoek Personeel
                    </Link>
                    <Link
                      href="/vacatures"
                      className="block w-full px-4 py-2 border border-white text-white text-center text-xs font-elegant font-medium hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wider"
                    >
                      Bekijk Vacatures
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us - Compact Premium */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-3 tracking-tight">
                Waarom kiezen voor onze sectoren?
              </h2>
              <div className="w-12 h-px bg-black mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border-l-4 border-black">
                <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-display font-semibold text-black mb-2 tracking-tight">Bewezen Expertise</h3>
                <p className="text-xs text-gray-600">Jarenlange ervaring in alle sectoren</p>
              </div>

              <div className="bg-white p-6 border-l-4 border-black">
                <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-display font-semibold text-black mb-2 tracking-tight">Perfecte Match</h3>
                <p className="text-xs text-gray-600">Grondige screening voor de juiste match</p>
              </div>

              <div className="bg-white p-6 border-l-4 border-black">
                <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-base font-display font-semibold text-black mb-2 tracking-tight">Snelle Service</h3>
                <p className="text-xs text-gray-600">Snel en efficiënt plaatsen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual CTA Section - Ultra Premium */}
      <section className="py-12 md:py-16 bg-black text-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {/* Voor Werkgevers */}
              <div className="bg-white text-black p-8 md:p-10 border-t-4 border-white">
                <div className="w-12 h-12 bg-black flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight">
                  Voor Werkgevers
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  Op zoek naar gekwalificeerd personeel in een specifieke sector? Onze sectorale expertise helpt u 
                  snel de juiste professionals te vinden die direct waarde toevoegen aan uw organisatie.
                </p>
                <Link
                  href="/werkgevers"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-elegant font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider text-xs w-full justify-center"
                >
                  <span>Zoek Personeel</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Voor Talenten */}
              <div className="bg-white text-black p-8 md:p-10 border-t-4 border-white">
                <div className="w-12 h-12 bg-black flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight">
                  Voor Talenten
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  Klaar voor een nieuwe stap in jouw carrière? Ontdek boeiende vacatures in verschillende sectoren 
                  en laat ons je helpen om de perfecte match te vinden die bij jouw ambities past.
                </p>
                <Link
                  href="/vacatures"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-elegant font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider text-xs w-full justify-center"
                >
                  <span>Bekijk Vacatures</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA - Final */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-4 tracking-tight">
              Vragen over onze sectoren?
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-8 max-w-2xl mx-auto">
              Neem vrijblijvend contact met ons op. We helpen je graag verder met het vinden van het juiste talent 
              of de perfecte baan in jouw sector.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white font-elegant font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider text-xs"
            >
              <span>Neem Contact Op</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

