'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Sectoren() {
  // Alle sectoren
  const sectoren = [
    {
      id: 'operators-productie',
      naam: 'Operators & Productie',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      functies: 'Productiemedewerker • Machine Operator • Procesoperator',
      beschrijving: 'Gespecialiseerd in productie- en operatiefuncties. Wij matchen ervaren operators met toonaangevende productiebedrijven.',
      voorWerkgevers: 'Perfect gekwalificeerd productiepersoneel voor uw productielijn.',
      voorTalenten: 'Ontdek productiefuncties die perfect bij jouw expertise passen.'
    },
    {
      id: 'techniek-engineering',
      naam: 'Techniek & Engineering',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      functies: 'Engineer • Onderhoudsmonteur • IT-specialist',
      beschrijving: 'Technische expertise op hoog niveau. Van engineers tot onderhoudsspecialisten, wij vinden de perfecte technische match.',
      voorWerkgevers: 'Top technisch talent dat direct waarde toevoegt aan uw organisatie.',
      voorTalenten: 'Carrièremogelijkheden in techniek en engineering.'
    },
    {
      id: 'bouw-infra',
      naam: 'Bouw & Infra',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      functies: 'Bouwvakker • Grondwerker • Timmerman',
      beschrijving: 'Bouw en infrastructuur vormen de ruggengraat van onze samenleving. Wij matchen ervaren bouwprofessionals met topprojecten.',
      voorWerkgevers: 'Betrouwbaar bouwpersoneel voor uw projecten.',
      voorTalenten: 'Diverse bouw- en infra functies wachten op jou.'
    },
    {
      id: 'procestechniek',
      naam: 'Procestechniek',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      functies: 'Procesbeheerder • Technisch Operator',
      beschrijving: 'Procestechniek vereist precisie en expertise. Wij verbinden gespecialiseerde procesoperators met innovatieve bedrijven.',
      voorWerkgevers: 'Ervaren procesoperators die uw processen optimaliseren.',
      voorTalenten: 'Uitdagende functies in procestechniek en procesbeheer.'
    },
    {
      id: 'transport-logistiek',
      naam: 'Transport & Logistiek',
      icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
      functies: 'Logistiek medewerker • Heftruckchauffeur • Chauffeur',
      beschrijving: 'Logistiek en transport zijn cruciaal. Wij matchen ervaren logistiek professionals en chauffeurs met betrouwbare werkgevers.',
      voorWerkgevers: 'Gekwalificeerd transport- en logistiekpersoneel.',
      voorTalenten: 'Diverse functies in transport, logistiek en distributie.'
    },
    {
      id: 'hr-office',
      naam: 'HR & Office',
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      functies: 'Administratief • HR-support • Klantenservice',
      beschrijving: 'Office en HR professionals zijn onmisbaar. Wij matchen administratieve en HR-specialisten met organisaties die groeien.',
      voorWerkgevers: 'Professionele office- en HR-medewerkers.',
      voorTalenten: 'Diverse administratieve en HR-functies beschikbaar.'
    },
    {
      id: 'sales',
      naam: 'Sales',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      functies: 'Account Manager • Sales Representative • Business Developer',
      beschrijving: 'Sales professionals die resultaten boeken. Wij matchen gedreven verkopers met bedrijven die groeien.',
      voorWerkgevers: 'Resultaatgerichte salesprofessionals die uw omzet verhogen.',
      voorTalenten: 'Uitdagende salesfuncties met onbeperkte groeimogelijkheden.'
    }
  ]

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

