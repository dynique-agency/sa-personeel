'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function OverOns() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Ultra Premium Hero - Compact */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 border-b-2 border-white text-white text-[10px] font-elegant font-semibold tracking-[0.25em] uppercase mb-4"
            >
              Over Ons
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight"
            >
              <span className="text-white">SA Personeel</span> <span className="text-gray-400">Talent Solutions</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto"
            >
              Uw partner in professioneel recruitment. Verbinding tussen talent en toonaangevende organisaties.
            </motion.p>
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

      {/* Unified Content Block - Ultra Premium Compact */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-12 md:py-16 bg-white"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-0 bg-black shadow-2xl overflow-hidden rounded-lg">
              {/* Left Image - Zoomed In */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 relative h-64 lg:h-auto lg:min-h-[500px] overflow-hidden rounded-l-lg"
              >
                <Image
                  src="/sapersoneel.webp"
                  alt="SA Personeel - Professioneel Team"
                  fill
                  className="object-cover"
                  style={{ 
                    objectPosition: 'center center',
                    transform: 'scale(1.3)',
                    transformOrigin: 'center center'
                  }}
                  quality={85}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                {/* Gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent lg:hidden"></div>
              </motion.div>

              {/* Main Content - Compact & Visual */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3 p-6 md:p-10 bg-white"
              >
                {/* Header */}
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 border-b-2 border-black text-black text-[10px] font-elegant font-semibold tracking-[0.2em] uppercase mb-3">
                    Over Ons
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-black mb-3 tracking-tight">
                    SA Personeel Talent Solutions
                  </h2>
                  <div className="w-12 h-0.5 bg-black mb-4"></div>
                </div>

                {/* Compact Intro */}
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  Gespecialiseerd uitzend- en recruitmentbureau in <span className="font-display font-semibold text-black">Heerlen</span>. 
                  Wij verbinden gekwalificeerde vakmensen met toonaangevende bedrijven.
                </p>

                {/* Visual Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 border-l-4 border-black rounded-sm">
                    <div className="text-2xl md:text-3xl font-display font-bold text-black mb-1">7</div>
                    <p className="text-xs text-gray-600 font-elegant uppercase tracking-wider">Sectoren</p>
                  </div>
                  <div className="bg-gray-50 p-4 border-l-4 border-black rounded-sm">
                    <div className="text-2xl md:text-3xl font-display font-bold text-black mb-1">100%</div>
                    <p className="text-xs text-gray-600 font-elegant uppercase tracking-wider">Persoonlijk</p>
                  </div>
                </div>

                {/* Compact USP Icons - Horizontal */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {[
                    { title: 'Premium Service', icon: 'M5 13l4 4L19 7' },
                    { title: 'Perfecte Match', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                    { title: 'Doelgericht', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { title: '1-op-1 Coaching', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-sm group hover:bg-gray-800 transition-colors"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      <span className="text-xs font-elegant font-medium uppercase tracking-wide">{item.title}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Sectoren Tags */}
                <div className="mb-6">
                  <p className="text-xs text-gray-600 mb-2 font-elegant uppercase tracking-wider">Gespecialiseerd in:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Productie', 'Procestechniek', 'Techniek', 'Bouw', 'HR & Office', 'Transport', 'Sales'].map((sector) => (
                      <span key={sector} className="px-3 py-1 bg-gray-100 text-black text-xs font-elegant font-medium border border-gray-300 rounded-sm">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-black text-white font-elegant font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider text-xs md:text-sm rounded-sm"
                  >
                    <span>Neem Contact Op</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Founder Section - Ultra Premium Compact */}
      <section className="py-12 md:py-16 bg-black text-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-1 relative h-64 md:h-[400px] lg:h-auto lg:min-h-[450px]">
                <Image
                  src="/shero.webp"
                  alt="Shero Gergeri - Eigenaar SA Personeel"
                  fill
                  className="object-cover border-l-4 border-white"
                  style={{ objectPosition: 'left center' }}
                  quality={85}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>

              <div className="lg:col-span-2">
                <span className="inline-block px-3 py-1 border-b-2 border-white text-white text-[10px] font-elegant font-semibold tracking-[0.2em] uppercase mb-4">
                  Leiderschap
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 tracking-tight">
                  Shero Gergeri
                </h2>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-elegant font-medium">Oprichter & Eigenaar</p>
                <div className="w-12 h-px bg-white mb-4"></div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4">
                  Met jarenlange ervaring binnen de uitzendbranche en een sterke passie voor het verbinden van mensen 
                  en organisaties, heb ik SA Personeel Talent Solutions opgericht met één duidelijke missie: 
                  <span className="text-white font-display font-semibold"> recruitment weer persoonlijk maken</span>.
                </p>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Ik geloof dat de juiste match verder gaat dan alleen een cv. Succesvolle samenwerking draait om motivatie, 
                  betrouwbaarheid en wederzijds vertrouwen. Vanuit die overtuiging zet ik mij dagelijks in om duurzame relaties 
                  op te bouwen tussen werkgevers en werknemers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus & Approach - Combined Premium Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-3 tracking-tight">
                Onze Aanpak
              </h2>
              <div className="w-12 h-px bg-black mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black text-white p-6 md:p-8 border-t-4 border-white">
                <h3 className="text-lg md:text-xl font-display font-semibold mb-3 tracking-tight">Persoonlijke Begeleiding</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Bij SA Personeel Talent Solutions staat het matchen van talent met werkgevers centraal. 
                  Wat ons onderscheidt, is onze persoonlijke 1-op-1 begeleiding gedurende het hele sollicitatieproces 
                  en wanneer talenten worden aangenomen.
                </p>
              </div>

              <div className="bg-black text-white p-6 md:p-8 border-t-4 border-white">
                <h3 className="text-lg md:text-xl font-display font-semibold mb-3 tracking-tight">Langdurige Partnerschappen</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We streven naar het opbouwen van langdurige partnerschappen met zowel kandidaten als bedrijven. 
                  Ontdek vandaag nog hoe wij jou kunnen helpen bij het realiseren van jouw carrièredoelen en bedrijfsambities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Stats & Benefits - Compact */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border-l-4 border-black">
                <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-base font-display font-semibold text-black mb-2 tracking-tight">Ervaren Experts</h3>
                <p className="text-xs text-gray-600">Jarenlange ervaring en bewezen resultaten</p>
              </div>

              <div className="bg-white p-6 border-l-4 border-black">
                <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-base font-display font-semibold text-black mb-2 tracking-tight">Snelle Service</h3>
                <p className="text-xs text-gray-600">Excellente en snelle ondersteuning</p>
              </div>

              <div className="bg-white p-6 border-l-4 border-black">
                <div className="w-10 h-10 bg-black flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-base font-display font-semibold text-black mb-2 tracking-tight">Lange Termijn</h3>
                <p className="text-xs text-gray-600">Focus op duurzame partnerschappen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ultra Premium CTA - Compact */}
      <section className="py-12 md:py-16 bg-black text-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white text-black p-8 md:p-12 border-t-4 border-black">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight">
                    Klaar om samen te werken?
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed mb-6">
                    Neem vandaag nog contact met ons op voor meer informatie, advies of om direct te solliciteren. 
                    Wij helpen je graag verder.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 border-2 border-black flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-600 uppercase tracking-wider font-elegant">Locatie</p>
                        <p className="text-sm font-display font-semibold text-black">Heerlerbaan 58 C, 6418 CH Heerlen</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="block w-full px-6 py-3.5 bg-black text-white text-center font-elegant font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider text-xs"
                  >
                    Neem Contact Op
                  </Link>
                  <Link
                    href="/vacatures"
                    className="block w-full px-6 py-3.5 border-2 border-black text-black text-center font-elegant font-medium hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-wider text-xs"
                  >
                    Bekijk Vacatures
                  </Link>
                  <p className="text-[10px] text-gray-500 text-center pt-2 font-elegant">
                    KVK: 98514040 • Gecertificeerd & Betrouwbaar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
