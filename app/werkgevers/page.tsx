'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Werkgevers() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  
  const [formData, setFormData] = useState({
    voornaam: '',
    achternaam: '',
    email: '',
    telefoon: '',
    bedrijfsnaam: '',
    bedrijfsadres: '',
    bericht: '',
    kopie: false
  })

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'voornaam':
        if (!value.trim()) return 'Voornaam is verplicht'
        if (value.trim().length < 2) return 'Voornaam moet minimaal 2 tekens bevatten'
        if (!/^[a-zA-Z\s\-'\.]+$/.test(value)) return 'Voornaam mag alleen letters bevatten'
        return ''
      case 'achternaam':
        if (!value.trim()) return 'Achternaam is verplicht'
        if (value.trim().length < 2) return 'Achternaam moet minimaal 2 tekens bevatten'
        if (!/^[a-zA-Z\s\-'\.]+$/.test(value)) return 'Achternaam mag alleen letters bevatten'
        return ''
      case 'email':
        if (!value.trim()) return 'E-mail is verplicht'
        if (!validateEmail(value)) return 'Voer een geldig e-mailadres in'
        return ''
      case 'telefoon':
        if (!value.trim()) return 'Telefoonnummer is verplicht'
        if (!validatePhone(value)) return 'Voer een geldig telefoonnummer in (minimaal 10 cijfers)'
        return ''
      case 'bedrijfsnaam':
        if (!value.trim()) return 'Bedrijfsnaam is verplicht'
        if (value.trim().length < 2) return 'Bedrijfsnaam moet minimaal 2 tekens bevatten'
        return ''
      case 'bedrijfsadres':
        if (!value.trim()) return 'Bedrijfsadres is verplicht'
        if (value.trim().length < 5) return 'Bedrijfsadres moet minimaal 5 tekens bevatten'
        return ''
      case 'bericht':
        if (!value.trim()) return 'Bericht is verplicht'
        if (value.trim().length < 10) return 'Bericht moet minimaal 10 tekens bevatten'
        if (value.trim().length > 2000) return 'Bericht mag maximaal 2000 tekens bevatten'
        return ''
      default:
        return ''
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors(prev => {
      const newErrors = { ...prev }
      if (error && error.trim()) {
        newErrors[name] = error
      } else {
        delete newErrors[name]
      }
      return newErrors
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    // Clear error when user starts typing
    if (touched[name] && errors[name]) {
      const error = validateField(name, value)
      setErrors(prev => {
        const newErrors = { ...prev }
        if (error && error.trim()) {
          newErrors[name] = error
        } else {
          delete newErrors[name]
        }
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'kopie') allTouched[key] = true
    })
    setTouched(allTouched)

    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'kopie') {
        const error = validateField(key, value as string)
        if (error) newErrors[key] = error
      }
    })
    setErrors(newErrors)

    // If there are errors, prevent submission
    if (Object.keys(newErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    // Form will submit naturally to FormSubmit
    ;(e.target as HTMLFormElement).submit()
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Compact */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 backdrop-blur-sm px-5 py-2 border-b-2 border-white/80"
                >
                  <span className="text-white text-[11px] font-elegant font-semibold tracking-[0.25em] uppercase">
                    Voor Werkgevers
                  </span>
                </motion.div>
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-tight"
              >
                <span className="text-white">Toptalent, </span>
                <span className="text-gray-400">Direct Beschikbaar</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto"
              >
                Uitstekend personeel is de ruggengraat van uw organisatie. Wij leveren de juiste mensen, snel.
              </motion.p>
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

      {/* Services Overview - Ultra Premium Compact */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-10"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1.5 border-b-2 border-black text-black text-[10px] font-elegant font-semibold tracking-[0.2em] uppercase mb-3"
              >
                Onze Diensten
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-black mb-2 tracking-tight"
              >
                Uw Expert in Personeelszaken
              </motion.h2>
            </motion.div>

            {/* Image + Services Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="grid lg:grid-cols-5 gap-0 bg-gray-50 shadow-xl overflow-hidden mb-10"
            >
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 relative h-64 lg:h-auto lg:min-h-[450px]"
              >
                <Image
                  src="/werkgevers.webp"
                  alt="SA Personeel - Voor Werkgevers"
                  fill
                  className="object-cover"
                  quality={85}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3 p-6 md:p-8"
              >
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  Snelle oplossingen voor uw vacatures. Ons uitgebreide netwerk (nationaal + internationaal) 
                  en expertise in diverse sectoren maken ons uw ideale partner.
                </p>
                
                {/* Services Compact Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Werving & Selectie', desc: 'Vaste aanstellingen', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
                    { title: 'Uitzenden', desc: 'Flexibel personeel', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                    { title: 'Screening', desc: 'Kwaliteitscontrole', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-8 h-8 bg-black flex items-center justify-center flex-shrink-0"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </motion.div>
                      <div>
                        <h3 className="text-sm font-display font-semibold text-black mb-1">{item.title}</h3>
                        <p className="text-xs text-gray-600">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Sectoren Tags */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-wrap gap-2 mt-6"
                >
                  {['Procestechniek', 'Productie', 'Techniek', 'Bouw', 'Transport', 'Logistiek', 'Sales'].map((sector, index) => (
                    <motion.span
                      key={sector}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-black text-white text-xs font-elegant font-medium uppercase tracking-wide"
                    >
                      {sector}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certificeringen - Compact */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="py-8 md:py-10 bg-gray-50"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-elegant font-semibold text-black uppercase tracking-wider">Certificeringen:</span>
              {['NEN 4400-1', 'SNA', 'VCU', 'NBBU', 'G-rekening', 'StiPP'].map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-white px-3 py-1.5 border-l-2 border-black"
                >
                  <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-elegant font-medium text-black">{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* USPs - Compact Premium */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-10 md:py-12 bg-black text-white"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Lange Termijn Partnerships', desc: 'Investeren in duurzame relaties, niet eenmalige transacties' },
                { title: 'Bewezen Aanpak', desc: 'Grondige screening voor de perfecte match tussen talent en bedrijf' },
                { title: 'Flexibel & Snel', desc: 'Aantrekkelijke tarieven met focus op vaste dienst na uitzendperiode' }
              ].map((usp, index) => (
                <motion.div
                  key={usp.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/10 backdrop-blur-sm p-5 border-l-4 border-white"
                >
                  <h3 className="text-base font-display font-semibold mb-2 tracking-tight">{usp.title}</h3>
                  <p className="text-xs text-gray-300">{usp.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Onze Aanpak - Compact */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-12 md:py-16 bg-white"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-3 tracking-tight">
                Zo Zorgen Wij Voor Uw Groei
              </h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-12 h-0.5 bg-black mx-auto"
              ></motion.div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 p-6 border-l-4 border-black"
              >
                <h3 className="text-lg font-display font-semibold text-black mb-3 tracking-tight">Onze Aanpak</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Talent centraal. Grondige screening voor perfecte matches. Flexibel dienstverband, 
                  aantrekkelijke tarieven, focus op vast contract na uitzendperiode.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>Van uitzending naar vast contract</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black text-white p-6"
              >
                <h3 className="text-lg font-display font-semibold mb-4 tracking-tight">Wat Wij Bieden</h3>
                <div className="space-y-2.5">
                  {[
                    'Op maat wervingsoplossingen',
                    'Kwalitatief personeel',
                    'Flexibele dienstverlening',
                    'Toegewijde ondersteuning',
                    'Partner die meebeweegt'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-4 h-4 border border-white flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 bg-gray-50 p-6">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-display font-bold text-black mb-1">Snel</p>
                <p className="text-xs text-gray-600">Kandidaten Vinden</p>
              </div>
              <div className="text-center border-l border-r border-gray-300">
                <p className="text-2xl md:text-3xl font-display font-bold text-black mb-1">100%</p>
                <p className="text-xs text-gray-600">Kwaliteit Focus</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-display font-bold text-black mb-1">24/7</p>
                <p className="text-xs text-gray-600">Bereikbaar</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section - Compact */}
      <section id="contact" className="py-12 md:py-16 bg-black text-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 tracking-tight">
                Neem Contact Op
              </h2>
              <div className="w-12 h-px bg-white mx-auto mb-3"></div>
              <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
                We voorzien u graag van bekwaam personeel. Neem vrijblijvend contact op.
              </p>
            </div>

            <form 
              action="https://formsubmit.co/tomcreemers24@icloud.com" 
              method="POST"
              onSubmit={handleSubmit} 
              className="space-y-4"
            >
              {/* FormSubmit Hidden Fields */}
              <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}/success?type=werkgevers` : ''} />
              <input type="hidden" name="_subject" value={`Nieuwe aanvraag van ${formData.bedrijfsnaam || 'werkgever'}`} />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="voornaam" className="block text-xs font-elegant font-medium text-white mb-1.5 uppercase tracking-wider">
                    Voornaam *
                  </label>
                  <input
                    type="text"
                    id="voornaam"
                    name="voornaam"
                    required
                    value={formData.voornaam}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2.5 bg-white text-black focus:outline-none focus:ring-2 transition-all ${
                      touched.voornaam && errors.voornaam
                        ? 'ring-2 ring-red-500 border-red-500'
                        : 'focus:ring-white'
                    }`}
                    placeholder="Uw voornaam"
                  />
                  {touched.voornaam && errors.voornaam && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-red-400 font-medium">{errors.voornaam}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="achternaam" className="block text-xs font-elegant font-medium text-white mb-1.5 uppercase tracking-wider">
                    Achternaam *
                  </label>
                  <input
                    type="text"
                    id="achternaam"
                    name="achternaam"
                    required
                    value={formData.achternaam}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2.5 bg-white text-black focus:outline-none focus:ring-2 transition-all ${
                      touched.achternaam && errors.achternaam
                        ? 'ring-2 ring-red-500 border-red-500'
                        : 'focus:ring-white'
                    }`}
                    placeholder="Uw achternaam"
                  />
                  {touched.achternaam && errors.achternaam && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-red-400 font-medium">{errors.achternaam}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-elegant font-medium text-white mb-1.5 uppercase tracking-wider">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2.5 bg-white text-black focus:outline-none focus:ring-2 transition-all ${
                      touched.email && errors.email
                        ? 'ring-2 ring-red-500 border-red-500'
                        : 'focus:ring-white'
                    }`}
                    placeholder="bedrijf@email.com"
                  />
                  {touched.email && errors.email && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-red-400 font-medium">{errors.email}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="telefoon" className="block text-xs font-elegant font-medium text-white mb-1.5 uppercase tracking-wider">
                    Telefoon *
                  </label>
                  <input
                    type="tel"
                    id="telefoon"
                    name="telefoon"
                    required
                    value={formData.telefoon}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2.5 bg-white text-black focus:outline-none focus:ring-2 transition-all ${
                      touched.telefoon && errors.telefoon
                        ? 'ring-2 ring-red-500 border-red-500'
                        : 'focus:ring-white'
                    }`}
                    placeholder="06 12345678"
                  />
                  {touched.telefoon && errors.telefoon && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-red-400 font-medium">{errors.telefoon}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bedrijfsnaam" className="block text-xs font-elegant font-medium text-white mb-1.5 uppercase tracking-wider">
                    Bedrijf *
                  </label>
                  <input
                    type="text"
                    id="bedrijfsnaam"
                    name="bedrijfsnaam"
                    required
                    value={formData.bedrijfsnaam}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2.5 bg-white text-black focus:outline-none focus:ring-2 transition-all ${
                      touched.bedrijfsnaam && errors.bedrijfsnaam
                        ? 'ring-2 ring-red-500 border-red-500'
                        : 'focus:ring-white'
                    }`}
                    placeholder="Bedrijfsnaam"
                  />
                  {touched.bedrijfsnaam && errors.bedrijfsnaam && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-red-400 font-medium">{errors.bedrijfsnaam}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="bedrijfsadres" className="block text-xs font-elegant font-medium text-white mb-1.5 uppercase tracking-wider">
                    Adres *
                  </label>
                  <input
                    type="text"
                    id="bedrijfsadres"
                    name="bedrijfsadres"
                    required
                    value={formData.bedrijfsadres}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2.5 bg-white text-black focus:outline-none focus:ring-2 transition-all ${
                      touched.bedrijfsadres && errors.bedrijfsadres
                        ? 'ring-2 ring-red-500 border-red-500'
                        : 'focus:ring-white'
                    }`}
                    placeholder="Bedrijfsadres"
                  />
                  {touched.bedrijfsadres && errors.bedrijfsadres && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-red-400 font-medium">{errors.bedrijfsadres}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="bericht" className="block text-xs font-elegant font-medium text-white mb-1.5 uppercase tracking-wider">
                  Bericht *
                </label>
                <textarea
                  id="bericht"
                  name="bericht"
                  required
                  rows={4}
                  value={formData.bericht}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 bg-white text-black focus:outline-none focus:ring-2 transition-all resize-none ${
                    touched.bericht && errors.bericht
                      ? 'ring-2 ring-red-500 border-red-500'
                      : 'focus:ring-white'
                  }`}
                  placeholder="Beschrijf uw personeelsbehoefte..."
                ></textarea>
                {touched.bericht && errors.bericht && (
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-red-400 font-medium">{errors.bericht}</p>
                  </div>
                )}
                {formData.bericht && !errors.bericht && (
                  <p className="mt-1.5 text-xs text-gray-400">
                    {formData.bericht.length}/2000 tekens
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="kopie"
                  name="kopie"
                  checked={formData.kopie}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <label htmlFor="kopie" className="text-xs text-gray-300">
                  Stuur mij een kopie
                </label>
              </div>

              {Object.keys(errors).filter(key => errors[key] && errors[key].trim()).length > 0 && (
                <div className="bg-red-500/10 border-l-4 border-red-500 p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-elegant font-semibold text-red-400 mb-1">Controleer de volgende velden:</p>
                      <ul className="text-xs text-red-300 space-y-1">
                        {Object.entries(errors)
                          .filter(([field, error]) => error && error.trim())
                          .map(([field, error]) => (
                            <li key={field}>• {error}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className="w-full px-8 py-3 bg-white text-black font-elegant font-medium hover:bg-gray-200 transition-all uppercase tracking-wider text-xs disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Verzenden...</span>
                  </>
                ) : (
                  'Verstuur Aanvraag'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
