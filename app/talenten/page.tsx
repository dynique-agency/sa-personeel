'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Talenten() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    telefoon: '',
    ambities: '',
    kopie: false
  })

  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvError, setCvError] = useState('')

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
      case 'naam':
        if (!value.trim()) return 'Naam is verplicht'
        if (value.trim().length < 2) return 'Naam moet minimaal 2 tekens bevatten'
        if (!/^[a-zA-Z\s\-'\.]+$/.test(value)) return 'Naam mag alleen letters bevatten'
        return ''
      case 'email':
        if (!value.trim()) return 'E-mail is verplicht'
        if (!validateEmail(value)) return 'Voer een geldig e-mailadres in'
        return ''
      case 'telefoon':
        if (!value.trim()) return 'Telefoonnummer is verplicht'
        if (!validatePhone(value)) return 'Voer een geldig telefoonnummer in (minimaal 10 cijfers)'
        return ''
      case 'ambities':
        if (!value.trim()) return 'Ambities zijn verplicht'
        if (value.trim().length < 10) return 'Ambities moeten minimaal 10 tekens bevatten'
        if (value.trim().length > 2000) return 'Ambities mogen maximaal 2000 tekens bevatten'
        return ''
      default:
        return ''
    }
  }

  const validateFile = (file: File | null): string => {
    if (!file) return 'CV is verplicht'
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) return 'Bestand is te groot (maximaal 5MB)'
    const allowedTypes = ['.pdf', '.doc', '.docx']
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!allowedTypes.includes(fileExtension)) return 'Alleen PDF, DOC of DOCX bestanden zijn toegestaan'
    return ''
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setCvFile(file)
      const error = validateFile(file)
      setCvError(error)
    } else {
      setCvFile(null)
      setCvError('CV is verplicht')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'kopie') allTouched[key] = true
    })
    allTouched['cv'] = true
    setTouched(allTouched)

    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'kopie') {
        const error = validateField(key, value as string)
        if (error) newErrors[key] = error
      }
    })

    // Validate file
    const fileError = validateFile(cvFile)
    if (fileError) {
      newErrors['cv'] = fileError
      setCvError(fileError)
    }

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
                    Voor Talenten
                  </span>
                </motion.div>
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-tight"
              >
                <span className="text-white">Vind Jouw </span>
                <span className="text-gray-400">Droombaan</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto"
              >
                Zekerheid, stabiliteit en persoonlijke aandacht in Limburg.
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

      {/* Intro Section - Compact */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-12 md:py-16 bg-white"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-0 bg-gray-50 shadow-xl overflow-hidden">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 relative h-64 lg:h-auto lg:min-h-[450px]"
              >
                <Image
                  src="/talenten.webp"
                  alt="SA Personeel - Voor Talenten"
                  fill
                  className="object-cover"
                  quality={85}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3 p-6 md:p-10"
              >
                <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-4 tracking-tight">
                  Klaar voor jouw volgende stap?
                </h2>
                <div className="w-12 h-0.5 bg-black mb-4"></div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                  Gedreven professional in procestechniek, productie, techniek, bouw, transport, logistiek of sales? 
                  Wij hebben boeiende vacatures in Limburg voor jou.
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
                  Onze coaches zorgen voor de perfecte match en maken jouw carrière-aspiraties waar!
                </p>
                
                {/* Compact Sectoren */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Procestechniek', 'Productie', 'Techniek', 'Bouw', 'Transport', 'Logistiek', 'Sales'].map((sector) => (
                    <span key={sector} className="px-3 py-1.5 bg-black text-white text-xs font-elegant font-medium uppercase tracking-wide">
                      {sector}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Wat kan jij verwachten - Compact */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-12 md:py-16 bg-gray-50"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-2 tracking-tight">
                Wat kan jij verwachten?
              </h2>
              <div className="w-12 h-0.5 bg-black mx-auto"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 border-l-4 border-black">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-semibold text-black mb-1">Uitstekende Service</h3>
                    <p className="text-xs text-gray-600">Premium begeleiding</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 border-l-4 border-black">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-semibold text-black mb-1">Lange Termijn</h3>
                    <p className="text-xs text-gray-600">Baan die perfect past</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 border-l-4 border-black">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-semibold text-black mb-1">Doelgericht</h3>
                    <p className="text-xs text-gray-600">Bewezen aanpak</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 border-l-4 border-black">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-black flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-semibold text-black mb-1">1-op-1 Coach</h3>
                    <p className="text-xs text-gray-600">Persoonlijke aandacht</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Actuele Vacatures */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <span className="inline-block px-4 py-1.5 border-b-2 border-black text-black text-[10px] font-elegant font-semibold tracking-[0.2em] uppercase mb-3">
                Actuele Vacatures
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-black mb-2 tracking-tight">
                Ontdek Jouw Kansen
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
              {/* Vacature 1 */}
              <Link href="/vacature/monteur-werktuigbouw-vekoma" className="block bg-black text-white p-6 hover:shadow-2xl transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-elegant">Vekoma</span>
                    <h3 className="text-lg font-display font-semibold mt-1 tracking-tight group-hover:text-gray-300 transition-colors">Monteur Werktuigbouw</h3>
                  </div>
                  <div className="w-8 h-8 border border-white flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="text-gray-300">Vlopdrop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300">Fulltime • 40 uur</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  Ervaren monteur gezocht voor assemblage en onderhoud van attracties. MBO niveau 3-4 vereist.
                </p>
                <span className="text-xs font-elegant font-medium uppercase tracking-wider text-white group-hover:text-gray-300 transition-colors">
                  Bekijk Vacature →
                </span>
              </Link>

              {/* Vacature 2 */}
              <Link href="/vacature/lasser-mig-mag-vekoma" className="block bg-black text-white p-6 hover:shadow-2xl transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-elegant">Vekoma</span>
                    <h3 className="text-lg font-display font-semibold mt-1 tracking-tight group-hover:text-gray-300 transition-colors">Lasser MIG/MAG</h3>
                  </div>
                  <div className="w-8 h-8 border border-white flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="text-gray-300">Vlopdrop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300">Fulltime • 40 uur</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  Gecertificeerd lasser voor staalkonstrukties. Werkervaring in productieomgeving gewenst.
                </p>
                <span className="text-xs font-elegant font-medium uppercase tracking-wider text-white group-hover:text-gray-300 transition-colors">
                  Bekijk Vacature →
                </span>
              </Link>

              {/* Vacature 3 */}
              <Link href="/vacature/productiemedewerker-vekoma" className="block bg-black text-white p-6 hover:shadow-2xl transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-elegant">Vekoma</span>
                    <h3 className="text-lg font-display font-semibold mt-1 tracking-tight group-hover:text-gray-300 transition-colors">Productiemedewerker</h3>
                  </div>
                  <div className="w-8 h-8 border border-white flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="text-gray-300">Vlopdrop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-300">Fulltime • 40 uur</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  Assemblagewerkzaamheden voor wereldwijde attractieprojecten. Technische affiniteit vereist.
                </p>
                <span className="text-xs font-elegant font-medium uppercase tracking-wider text-white group-hover:text-gray-300 transition-colors">
                  Bekijk Vacature →
                </span>
              </Link>
            </div>

            {/* Premium CTA Button - Centered */}
            <div className="text-center mt-10 md:mt-12">
              <Link
                href="/vacatures"
                className="group inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-black text-white font-elegant font-semibold hover:bg-gray-800 border-2 border-black transition-all duration-500 uppercase tracking-[0.2em] text-xs md:text-sm shadow-2xl hover:shadow-black/30 hover:scale-105 relative overflow-hidden"
              >
                {/* Animated Background Gradient Shine */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full"></span>
                
                {/* Content */}
                <span className="relative z-10">Bekijk Alle Vacatures</span>
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
            </div>
          </div>
        </div>
      </section>

      {/* Wat onderscheidt ons - Compact */}
      <section className="py-12 md:py-16 bg-black text-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 tracking-tight">
                Waarom SA Personeel?
              </h2>
              <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
                Persoonlijke begeleiding gedurende het hele sollicitatieproces.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-5 border-l-4 border-white">
                <h3 className="text-base font-display font-semibold mb-2 tracking-tight">Stap voor Stap</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Van CV tot interview - we lopen met je mee. Je voelt je nooit alleen.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-5 border-l-4 border-white">
                <h3 className="text-base font-display font-semibold mb-2 tracking-tight">Toegewijde Coaches</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We gaan zelfs mee naar gesprekken bij werkgevers. Volledige ondersteuning.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-5 border-l-4 border-white">
                <h3 className="text-base font-display font-semibold mb-2 tracking-tight">Jouw Droombaan</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Met vertrouwen en zekerheid naar jouw perfecte baan.
                </p>
              </div>
            </div>

            {/* Compact Services */}
            <div className="mt-8 bg-white text-black p-6 md:p-8">
              <h3 className="text-lg font-display font-semibold mb-4 text-center">Wat wij bieden</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'Gratis carrièreadvies',
                  'CV optimalisatie',
                  'Interview training',
                  'Persoonlijke begeleiding',
                  'Nazorg na plaatsing',
                  'Langetermijn support'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-black flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-xs font-elegant font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sollicitatie Form Section - Compact */}
      <section id="contact" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-3 tracking-tight">
                Solliciteer Nu
              </h2>
              <div className="w-12 h-0.5 bg-black mx-auto mb-4"></div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Deel je carrièredoelen. Ons team begeleidt je naar jouw droombaan.
              </p>
            </div>

            <form 
              action="https://formsubmit.co/tomcreemers24@icloud.com" 
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleSubmit} 
              className="bg-gray-50 p-6 md:p-8 shadow-xl border-l-4 border-black"
            >
              {/* FormSubmit Hidden Fields */}
              <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}/success?type=talenten` : ''} />
              <input type="hidden" name="_subject" value={`Nieuwe sollicitatie van ${formData.naam || 'kandidaat'}`} />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_captcha" value="false" />
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="naam" className="block text-xs font-elegant font-medium text-black mb-1.5 uppercase tracking-wider">
                      Naam *
                    </label>
                    <input
                      type="text"
                      id="naam"
                      name="naam"
                      required
                      value={formData.naam}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2.5 border focus:outline-none focus:ring-2 transition-all ${
                        touched.naam && errors.naam
                          ? 'border-red-500 ring-2 ring-red-500'
                          : 'border-gray-300 focus:border-black'
                      }`}
                      placeholder="Volledige naam"
                    />
                    {touched.naam && errors.naam && (
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs text-red-600 font-medium">{errors.naam}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="telefoon" className="block text-xs font-elegant font-medium text-black mb-1.5 uppercase tracking-wider">
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
                      className={`w-full px-4 py-2.5 border focus:outline-none focus:ring-2 transition-all ${
                        touched.telefoon && errors.telefoon
                          ? 'border-red-500 ring-2 ring-red-500'
                          : 'border-gray-300 focus:border-black'
                      }`}
                      placeholder="06 12345678"
                    />
                    {touched.telefoon && errors.telefoon && (
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs text-red-600 font-medium">{errors.telefoon}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-elegant font-medium text-black mb-1.5 uppercase tracking-wider">
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
                    className={`w-full px-4 py-2.5 border focus:outline-none focus:ring-2 transition-all ${
                      touched.email && errors.email
                        ? 'border-red-500 ring-2 ring-red-500'
                        : 'border-gray-300 focus:border-black'
                    }`}
                    placeholder="je@email.com"
                  />
                  {touched.email && errors.email && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-red-600 font-medium">{errors.email}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="ambities" className="block text-xs font-elegant font-medium text-black mb-1.5 uppercase tracking-wider">
                    Jouw Ambities *
                  </label>
                  <textarea
                    id="ambities"
                    name="ambities"
                    required
                    rows={4}
                    value={formData.ambities}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2.5 border focus:outline-none focus:ring-2 transition-all resize-none ${
                      touched.ambities && errors.ambities
                        ? 'border-red-500 ring-2 ring-red-500'
                        : 'border-gray-300 focus:border-black'
                    }`}
                    placeholder="Carrièredoelen en ervaring..."
                  ></textarea>
                  {touched.ambities && errors.ambities && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-red-600 font-medium">{errors.ambities}</p>
                    </div>
                  )}
                  {formData.ambities && !errors.ambities && (
                    <p className="mt-1.5 text-xs text-gray-500">
                      {formData.ambities.length}/2000 tekens
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="cv" className="block text-xs font-elegant font-medium text-black mb-1.5 uppercase tracking-wider">
                    CV * (PDF, DOC, DOCX - Max 5MB)
                  </label>
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                    className={`w-full px-4 py-2.5 border focus:outline-none focus:ring-2 transition-colors text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-black file:text-white file:font-elegant file:font-medium file:uppercase file:text-[10px] file:tracking-wider hover:file:bg-gray-800 file:cursor-pointer ${
                      touched.cv && (errors.cv || cvError)
                        ? 'border-red-500 ring-2 ring-red-500'
                        : 'border-gray-300 focus:border-black'
                    }`}
                  />
                  {cvFile && !cvError && (
                    <p className="mt-2 text-xs text-gray-600">
                      <span className="font-elegant font-medium">{cvFile.name}</span> ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                  {(touched.cv && (errors.cv || cvError)) && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-red-600 font-medium">{errors.cv || cvError}</p>
                    </div>
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
                  <label htmlFor="kopie" className="text-xs text-gray-700">
                    Stuur mij een kopie
                  </label>
                </div>

                {(Object.keys(errors).filter(key => errors[key] && errors[key].trim()).length > 0 || cvError) && (
                  <div className="bg-red-500/10 border-l-4 border-red-500 p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-elegant font-semibold text-red-600 mb-1">Controleer de volgende velden:</p>
                        <ul className="text-xs text-red-500 space-y-1">
                          {Object.entries(errors)
                            .filter(([field, error]) => error && error.trim())
                            .map(([field, error]) => (
                              <li key={field}>• {error}</li>
                            ))}
                          {cvError && <li>• {cvError}</li>}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || Object.keys(errors).length > 0 || !!cvError}
                  className="w-full px-8 py-3 bg-black text-white font-elegant font-medium hover:bg-gray-800 transition-all uppercase tracking-wider text-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    'Verstuur Sollicitatie'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
