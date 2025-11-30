'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { vacatures } from '@/data/vacatures'

interface VacatureClientProps {
  vacatureId: string
}

export default function VacatureClient({ vacatureId }: VacatureClientProps) {
  const [vacature, setVacature] = useState<any>(null)

  useEffect(() => {
    if (vacatureId) {
      setVacature(vacatures[vacatureId] || null)
    }
  }, [vacatureId])
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
        if (value.trim().length < 2) return 'Naam moet minimaal 2 tekens zijn'
        return ''
      case 'email':
        if (!value.trim()) return 'E-mailadres is verplicht'
        if (!validateEmail(value)) return 'Ongeldig e-mailadres'
        return ''
      case 'telefoon':
        if (!value.trim()) return 'Telefoonnummer is verplicht'
        if (!validatePhone(value)) return 'Ongeldig telefoonnummer'
        return ''
      case 'motivatie':
        if (!value.trim()) return 'Motivatie is verplicht'
        if (value.trim().length < 20) return 'Motivatie moet minimaal 20 tekens zijn'
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setCvError('Bestand is te groot. Maximaal 5MB toegestaan.')
        setCvFile(null)
        return
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setCvError('Alleen PDF of Word bestanden zijn toegestaan.')
        setCvFile(null)
        return
      }
      setCvFile(file)
      setCvError('')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {}
    Object.keys(formData).forEach(key => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error) {
        newErrors[key] = error
      }
    })

    // Validate CV
    if (!cvFile) {
      setCvError('CV upload is verplicht')
    } else {
      setCvError('')
    }

    setErrors(newErrors)

    // If there are errors, prevent submission
    if (Object.keys(newErrors).length > 0 || !cvFile) {
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
            >
              <span className="inline-block px-4 py-1 border-b-2 border-white text-white text-[10px] font-elegant font-semibold tracking-[0.25em] uppercase mb-4">
                {vacature.sector}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight">
                {vacature.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300 font-elegant">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {vacature.bedrijf}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {vacature.locatie}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {vacature.type}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vacature Details */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-black text-white p-6 border-t-4 border-white">
                <h3 className="text-xs font-elegant font-semibold tracking-wider uppercase mb-2">Salaris</h3>
                <p className="text-lg font-display font-semibold">{vacature.salaris}</p>
              </div>
              <div className="bg-black text-white p-6 border-t-4 border-white">
                <h3 className="text-xs font-elegant font-semibold tracking-wider uppercase mb-2">Uren</h3>
                <p className="text-lg font-display font-semibold">{vacature.uren}</p>
              </div>
              <div className="bg-black text-white p-6 border-t-4 border-white">
                <h3 className="text-xs font-elegant font-semibold tracking-wider uppercase mb-2">Sector</h3>
                <p className="text-lg font-display font-semibold">{vacature.sector}</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-2xl font-display font-bold text-black mb-4">Over de functie</h2>
              <p className="text-gray-700 leading-relaxed mb-8">{vacature.beschrijving}</p>

              <h2 className="text-2xl font-display font-bold text-black mb-4">Wat ga je doen?</h2>
              <ul className="list-none space-y-3 mb-8">
                {vacature.taken.map((taak: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-black mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{taak}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-display font-bold text-black mb-4">Wat vragen wij?</h2>
              <ul className="list-none space-y-3 mb-8">
                {vacature.eisen.map((eis: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-black mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{eis}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-display font-bold text-black mb-4">Wat bieden wij?</h2>
              <ul className="list-none space-y-3 mb-12">
                {vacature.aanbod.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-black mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-black mb-4 tracking-tight">
                Solliciteer nu
              </h2>
              <p className="text-gray-700">
                Vul het onderstaande formulier in om te solliciteren op deze vacature.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              action="https://formsubmit.co/info@sapersoneel.nl"
              method="POST"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="bg-white p-8 md:p-10 border-t-4 border-black"
            >
              <input type="hidden" name="_subject" value={`Nieuwe sollicitatie: ${vacature.title}`} />
              <input type="hidden" name="_next" value={`https://sa-personeel.pages.dev/success?type=vacature&vacature=${encodeURIComponent(vacature.title)}`} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="vacature" value={vacature.title} />
              <input type="hidden" name="vacature_id" value={vacatureId} />

              <div className="space-y-6">
                <div>
                  <label htmlFor="naam" className="block text-xs font-elegant font-semibold text-black uppercase tracking-wider mb-2">
                    Naam *
                  </label>
                  <input
                    type="text"
                    id="naam"
                    name="naam"
                    value={formData.naam}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 ${errors.naam && touched.naam ? 'border-red-500' : 'border-black'} bg-white text-black font-elegant focus:outline-none focus:ring-2 focus:ring-black transition-all`}
                    placeholder="Volledige naam"
                  />
                  {errors.naam && touched.naam && (
                    <p className="mt-1 text-xs text-red-500">{errors.naam}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-elegant font-semibold text-black uppercase tracking-wider mb-2">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 ${errors.email && touched.email ? 'border-red-500' : 'border-black'} bg-white text-black font-elegant focus:outline-none focus:ring-2 focus:ring-black transition-all`}
                    placeholder="jouw@email.nl"
                  />
                  {errors.email && touched.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefoon" className="block text-xs font-elegant font-semibold text-black uppercase tracking-wider mb-2">
                    Telefoonnummer *
                  </label>
                  <input
                    type="tel"
                    id="telefoon"
                    name="telefoon"
                    value={formData.telefoon}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border-2 ${errors.telefoon && touched.telefoon ? 'border-red-500' : 'border-black'} bg-white text-black font-elegant focus:outline-none focus:ring-2 focus:ring-black transition-all`}
                    placeholder="06 12345678"
                  />
                  {errors.telefoon && touched.telefoon && (
                    <p className="mt-1 text-xs text-red-500">{errors.telefoon}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="cv" className="block text-xs font-elegant font-semibold text-black uppercase tracking-wider mb-2">
                    CV Upload * (PDF of Word, max 5MB)
                  </label>
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border-2 border-black bg-white text-black font-elegant focus:outline-none focus:ring-2 focus:ring-black transition-all file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-black file:text-white file:font-elegant file:text-xs file:uppercase file:tracking-wider file:cursor-pointer"
                  />
                  {cvError && (
                    <p className="mt-1 text-xs text-red-500">{cvError}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="motivatie" className="block text-xs font-elegant font-semibold text-black uppercase tracking-wider mb-2">
                    Motivatie *
                  </label>
                  <textarea
                    id="motivatie"
                    name="motivatie"
                    value={formData.motivatie}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={6}
                    className={`w-full px-4 py-3 border-2 ${errors.motivatie && touched.motivatie ? 'border-red-500' : 'border-black'} bg-white text-black font-elegant focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none`}
                    placeholder="Vertel ons waarom jij geschikt bent voor deze functie..."
                  />
                  {errors.motivatie && touched.motivatie && (
                    <p className="mt-1 text-xs text-red-500">{errors.motivatie}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-black text-white font-elegant font-semibold uppercase tracking-wider text-xs hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Verzenden...' : 'Solliciteer nu'}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

