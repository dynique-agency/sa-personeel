'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { vacatures } from '@/data/vacatures'

export default function VacatureDetail() {
  const params = useParams()
  const vacatureId = params.id as string
  const vacature = vacatures[vacatureId]

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    telefoon: '',
    motivatie: ''
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
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
      case 'motivatie':
        if (!value.trim()) return 'Motivatie is verplicht'
        if (value.trim().length < 10) return 'Motivatie moet minimaal 10 tekens bevatten'
        if (value.trim().length > 2000) return 'Motivatie mag maximaal 2000 tekens bevatten'
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
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      setTouched(prev => ({ ...prev, cv: true }))
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
      allTouched[key] = true
    })
    allTouched['cv'] = true
    setTouched(allTouched)

    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value as string)
      if (error && error.trim()) newErrors[key] = error
    })

    // Validate file
    const fileError = validateFile(cvFile)
    if (fileError && fileError.trim()) {
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

  if (!vacature) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="min-h-screen flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-display font-semibold mb-4">Vacature niet gevonden</h1>
            <Link href="/vacatures" className="text-black hover:underline font-elegant">
              Terug naar vacatures
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/vacatures" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 font-elegant">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Terug naar vacatures
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              {[
                { text: vacature.bedrijf, bg: 'bg-white/10' },
                { text: vacature.sector, bg: 'bg-white/10' },
                { text: vacature.type, bg: 'bg-white text-black' }
              ].map((badge, index) => (
                <motion.span
                  key={badge.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 ${badge.bg} text-white text-xs font-elegant font-medium uppercase tracking-wider`}
                >
                  {badge.text}
                </motion.span>
              ))}
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight leading-tight"
            >
              {vacature.title}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-6 text-sm"
            >
              {[
                { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', text: vacature.locatie },
                { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: vacature.uren },
                { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', text: vacature.salaris }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span className="text-gray-300">{item.text}</span>
                </motion.div>
              ))}
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

      {/* Vacature Details */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-12 md:py-16 bg-white"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 space-y-8"
              >
                {/* Beschrijving */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-display font-bold text-black mb-4 tracking-tight">Over de functie</h2>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-16 h-1 bg-black mb-4"
                  ></motion.div>
                  <p className="text-gray-700 leading-relaxed">{vacature.beschrijving}</p>
                </motion.div>

                {/* Taken */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl font-display font-semibold text-black mb-4 tracking-tight">Wat ga je doen?</h3>
                  <ul className="space-y-3">
                    {vacature.taken.map((taak: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                        <span className="text-gray-700">{taak}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Eisen */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-xl font-display font-semibold text-black mb-4 tracking-tight">Wat vragen wij?</h3>
                  <ul className="space-y-3">
                    {vacature.eisen.map((eis: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                        <span className="text-gray-700">{eis}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Aanbod */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-xl font-display font-semibold text-black mb-4 tracking-tight">Wat bieden wij?</h3>
                  <ul className="space-y-3">
                    {vacature.aanbod.map((item: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className="w-6 h-6 bg-black flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              {/* Sticky Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="sticky top-28 bg-black text-white p-6 shadow-xl"
                >
                  <h3 className="text-lg font-display font-semibold mb-4 tracking-tight">Vacature Details</h3>
                  <div className="space-y-4 mb-6 text-sm">
                    {[
                      { label: 'Bedrijf', value: vacature.bedrijf },
                      { label: 'Locatie', value: vacature.locatie },
                      { label: 'Dienstverband', value: vacature.type },
                      { label: 'Uren per week', value: vacature.uren },
                      { label: 'Salaris indicatie', value: vacature.salaris }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      >
                        <p className="text-gray-400 text-xs uppercase mb-1 font-elegant">{item.label}</p>
                        <p className="font-display font-semibold">{item.value}</p>
                      </motion.div>
                    ))}
                  </div>
                  <motion.a
                    href="#solliciteer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full px-6 py-3 bg-white text-black text-center font-elegant font-medium hover:bg-gray-200 transition-all uppercase tracking-wider text-xs"
                  >
                    Direct Solliciteren
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Sollicitatie Formulier */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        id="solliciteer" 
        className="py-12 md:py-16 bg-gray-50"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-3 tracking-tight">
                Solliciteer voor {vacature.title}
              </h2>
              <p className="text-sm text-gray-600">
                Bij {vacature.bedrijf} in {vacature.locatie}
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }} 
              action="https://formsubmit.co/tomcreemers24@icloud.com" 
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleSubmit} 
              className="bg-white p-6 md:p-8 shadow-xl border-l-4 border-black"
            >
              {/* FormSubmit Hidden Fields */}
              <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}/success?type=vacature` : ''} />
              <input type="hidden" name="_subject" value={`Sollicitatie: ${vacature.title} - ${formData.naam || 'kandidaat'}`} />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="vacature_details" value={`${vacature.title} bij ${vacature.bedrijf} in ${vacature.locatie}`} />
              
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
                  <label htmlFor="motivatie" className="block text-xs font-elegant font-medium text-black mb-1.5 uppercase tracking-wider">
                    Motivatie *
                  </label>
                  <textarea
                    id="motivatie"
                    name="motivatie"
                    required
                    rows={4}
                    value={formData.motivatie}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2.5 border focus:outline-none focus:ring-2 transition-all resize-none ${
                      touched.motivatie && errors.motivatie
                        ? 'border-red-500 ring-2 ring-red-500'
                        : 'border-gray-300 focus:border-black'
                    }`}
                    placeholder={`Waarom wil je werken als ${vacature.title} bij ${vacature.bedrijf}?`}
                  ></textarea>
                  {touched.motivatie && errors.motivatie && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-red-600 font-medium">{errors.motivatie}</p>
                    </div>
                  )}
                  {formData.motivatie && !errors.motivatie && (
                    <p className="mt-1.5 text-xs text-gray-500">
                      {formData.motivatie.length}/2000 tekens
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
                      Geselecteerd: <span className="font-elegant font-medium">{cvFile.name}</span> ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)
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

                <div className="bg-gray-100 p-4 border-l-2 border-black">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    <strong>Let op:</strong> Deze sollicitatie wordt specifiek verstuurd voor de functie {vacature.title} bij {vacature.bedrijf} in {vacature.locatie}.
                  </p>
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

                <motion.button
                  type="submit"
                  disabled={isSubmitting || Object.keys(errors).filter(key => errors[key] && errors[key].trim()).length > 0 || !!cvError}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-black text-white font-elegant font-medium hover:bg-gray-800 transition-all uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Verzenden...</span>
                    </>
                  ) : (
                    `Solliciteer voor ${vacature.title}`
                  )}
                </motion.button>

                <p className="text-xs text-gray-500 text-center">
                  Door te solliciteren ga je akkoord met ons privacybeleid.
                </p>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  )
}

