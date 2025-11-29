'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    telefoon: '',
    onderwerp: '',
    bericht: '',
    type: 'werkgever',
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
      case 'onderwerp':
        if (!value.trim()) return 'Onderwerp is verplicht'
        if (value.trim().length < 3) return 'Onderwerp moet minimaal 3 tekens bevatten'
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      if (key !== 'kopie' && key !== 'type') allTouched[key] = true
    })
    setTouched(allTouched)

    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'kopie' && key !== 'type') {
        const error = validateField(key, value as string)
        if (error && error.trim()) newErrors[key] = error
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

  const contactInfo = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      ),
      label: 'Telefoon',
      value: '+31 (0)XX XXX XXXX',
      link: 'tel:+31XXXXXXXXX'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      ),
      label: 'E-mail',
      value: 'info@sapersoneel.nl',
      link: 'mailto:info@sapersoneel.nl'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      ),
      label: 'Adres',
      value: 'Heerlerbaan 58 C, 6418 CH Heerlen',
      link: 'https://maps.google.com/?q=Heerlerbaan+58+C+6418+CH+Heerlen'
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Ultra Premium Hero - Compact */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1 border-b-2 border-white text-white text-[10px] font-elegant font-semibold tracking-[0.25em] uppercase mb-4"
            >
              Contact
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight"
            >
              <span className="text-white">Neem Contact </span>
              <span className="text-gray-400">Op</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto"
            >
              Wij staan klaar om uw vragen te beantwoorden en u te helpen bij het vinden van het juiste talent of de perfecte baan.
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

      {/* Contact Info Cards - Premium */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.link}
                  target={info.label === 'Adres' ? '_blank' : undefined}
                  rel={info.label === 'Adres' ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-black text-white p-6 md:p-8 border-t-4 border-white hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 border border-white flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {info.icon}
                    </svg>
                  </div>
                  <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-elegant">{info.label}</h3>
                  <p className="text-sm font-display font-semibold group-hover:text-gray-300 transition-colors">
                    {info.value}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Grid */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-white p-6 md:p-8 shadow-xl border-l-4 border-black">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-3 tracking-tight">
                    Stuur ons een bericht
                  </h2>
                  <div className="w-12 h-0.5 bg-black mb-6"></div>

                  <form 
                    action="https://formsubmit.co/tomcreemers24@icloud.com" 
                    method="POST"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* FormSubmit Hidden Fields */}
                    <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}/success?type=contact` : ''} />
                    <input type="hidden" name="_subject" value={`Nieuw contactbericht van ${formData.naam || 'bezoeker'}`} />
                    <input type="hidden" name="_template" value="box" />
                    <input type="hidden" name="_captcha" value="false" />

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

                    <div className="grid md:grid-cols-2 gap-4">
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
                          placeholder="email@voorbeeld.nl"
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
                      <label htmlFor="type" className="block text-xs font-elegant font-medium text-black mb-1.5 uppercase tracking-wider">
                        Ik ben een *
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 focus:border-black focus:outline-none focus:ring-2 focus:ring-black transition-all bg-white"
                      >
                        <option value="werkgever">Werkgever</option>
                        <option value="talent">Talent</option>
                        <option value="anders">Anders</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="onderwerp" className="block text-xs font-elegant font-medium text-black mb-1.5 uppercase tracking-wider">
                        Onderwerp *
                      </label>
                      <input
                        type="text"
                        id="onderwerp"
                        name="onderwerp"
                        required
                        value={formData.onderwerp}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2.5 border focus:outline-none focus:ring-2 transition-all ${
                          touched.onderwerp && errors.onderwerp
                            ? 'border-red-500 ring-2 ring-red-500'
                            : 'border-gray-300 focus:border-black'
                        }`}
                        placeholder="Onderwerp van uw bericht"
                      />
                      {touched.onderwerp && errors.onderwerp && (
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-xs text-red-600 font-medium">{errors.onderwerp}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="bericht" className="block text-xs font-elegant font-medium text-black mb-1.5 uppercase tracking-wider">
                        Bericht *
                      </label>
                      <textarea
                        id="bericht"
                        name="bericht"
                        required
                        rows={5}
                        value={formData.bericht}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2.5 border focus:outline-none focus:ring-2 transition-all resize-none ${
                          touched.bericht && errors.bericht
                            ? 'border-red-500 ring-2 ring-red-500'
                            : 'border-gray-300 focus:border-black'
                        }`}
                        placeholder="Uw bericht..."
                      ></textarea>
                      {touched.bericht && errors.bericht && (
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-xs text-red-600 font-medium">{errors.bericht}</p>
                        </div>
                      )}
                      {formData.bericht && !errors.bericht && (
                        <p className="mt-1.5 text-xs text-gray-500">
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
                      <label htmlFor="kopie" className="text-xs text-gray-700">
                        Stuur mij een kopie
                      </label>
                    </div>

                    {Object.keys(errors).filter(key => errors[key] && errors[key].trim()).length > 0 && (
                      <div className="bg-red-500/10 border-l-4 border-red-500 p-4">
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
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || Object.keys(errors).filter(key => errors[key] && errors[key].trim()).length > 0}
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
                        'Verstuur Bericht'
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Info Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Openingstijden */}
                <div className="bg-black text-white p-6 border-t-4 border-white">
                  <h3 className="text-lg font-display font-semibold mb-4 tracking-tight">Openingstijden</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-gray-400">Maandag - Vrijdag</span>
                      <span className="font-display font-semibold">08:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-gray-400">Zaterdag</span>
                      <span className="font-display font-semibold">Op afspraak</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Zondag</span>
                      <span className="font-display font-semibold">Gesloten</span>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white p-6 border-l-4 border-black shadow-xl">
                  <h3 className="text-lg font-display font-semibold text-black mb-4 tracking-tight">Snelle Links</h3>
                  <div className="space-y-2">
                    <Link 
                      href="/werkgevers#contact" 
                      className="flex items-center justify-between text-sm text-gray-700 hover:text-black transition-colors py-2 border-b border-gray-200 group"
                    >
                      <span>Zoek Personeel</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link 
                      href="/talenten#contact" 
                      className="flex items-center justify-between text-sm text-gray-700 hover:text-black transition-colors py-2 border-b border-gray-200 group"
                    >
                      <span>Solliciteer Nu</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link 
                      href="/vacatures" 
                      className="flex items-center justify-between text-sm text-gray-700 hover:text-black transition-colors py-2 border-b border-gray-200 group"
                    >
                      <span>Bekijk Vacatures</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link 
                      href="/overons" 
                      className="flex items-center justify-between text-sm text-gray-700 hover:text-black transition-colors py-2 group"
                    >
                      <span>Over Ons</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Bedrijfsgegevens */}
                <div className="bg-gray-100 p-6 border-l-4 border-black">
                  <h3 className="text-lg font-display font-semibold text-black mb-4 tracking-tight">Bedrijfsgegevens</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider font-elegant mb-1">KVK-nummer</p>
                      <p className="font-display font-semibold text-black">98514040</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider font-elegant mb-1">BTW-nummer</p>
                      <p className="font-display font-semibold text-black">NL004904458B59</p>
                    </div>
                    <div className="pt-3 border-t border-gray-300">
                      <p className="text-xs text-gray-600">
                        Gecertificeerd door NEN 4400-1, SNA en VCU
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us - Premium */}
      <section className="py-12 md:py-16 bg-black text-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 tracking-tight">
                Waarom contact met ons opnemen?
              </h2>
              <div className="w-12 h-px bg-white mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Snelle Reactie',
                  description: 'We streven ernaar binnen 24 uur te reageren op alle berichten',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                },
                {
                  title: 'Persoonlijk Advies',
                  description: 'Onze experts geven u direct het juiste advies voor uw situatie',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                },
                {
                  title: 'Vrijblijvend',
                  description: 'Een eerste kennismaking is altijd vrijblijvend en zonder kosten',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm p-6 border-l-4 border-white"
                >
                  <div className="w-10 h-10 border border-white flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-base font-display font-semibold mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
