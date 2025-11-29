'use client'

import { useEffect, useState, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function SuccessContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'contact'
  const [countdown, setCountdown] = useState(10)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Fade in animation
    setTimeout(() => setVisible(true), 100)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = '/'
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getMessage = () => {
    switch (type) {
      case 'werkgevers':
        return {
          title: 'Bedankt voor uw aanvraag!',
          subtitle: 'We nemen zo snel mogelijk contact met u op',
          description: 'Uw aanvraag is succesvol ontvangen. Een van onze specialisten neemt binnen 24 uur contact met u op om uw personeelsbehoefte te bespreken.'
        }
      case 'talenten':
        return {
          title: 'Sollicitatie ontvangen!',
          subtitle: 'We gaan aan de slag voor jou',
          description: 'Bedankt voor je sollicitatie. Onze recruiters bekijken je CV en nemen binnen 2 werkdagen contact met je op voor de volgende stappen.'
        }
      case 'vacature':
        return {
          title: 'Sollicitatie verzonden!',
          subtitle: 'We beoordelen je profiel',
          description: 'Je sollicitatie is succesvol ontvangen. We matchen je profiel met de vacature en nemen spoedig contact met je op.'
        }
      default:
        return {
          title: 'Bericht verzonden!',
          subtitle: 'We nemen contact met je op',
          description: 'Bedankt voor je bericht. We streven ernaar om binnen 24 uur te reageren.'
        }
    }
  }

  const message = getMessage()

  return (
    <main className="min-h-screen bg-black/95 backdrop-blur-xl text-white flex items-center justify-center p-4">
      {/* Compact Success Card */}
      <div 
        className={`max-w-xl w-full bg-white text-black p-8 md:p-10 shadow-2xl border-t-4 border-black transition-all duration-500 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Success Icon - Compact */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-black flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message - Compact */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-3">
            {message.title}
          </h1>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {message.description}
          </p>
        </div>

        {/* Quick Steps - Compact */}
        <div className="bg-gray-50 p-4 mb-6 border-l-4 border-black">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black text-white flex items-center justify-center font-display font-semibold">1</div>
              <span className="text-gray-700">Ontvangen</span>
            </div>
            <div className="w-4 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black text-white flex items-center justify-center font-display font-semibold">2</div>
              <span className="text-gray-700">Beoordelen</span>
            </div>
            <div className="w-4 h-px bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black text-white flex items-center justify-center font-display font-semibold">3</div>
              <span className="text-gray-700">Contact</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons - Compact */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 px-6 py-3 bg-black text-white text-center font-elegant font-medium hover:bg-gray-800 transition-all text-xs uppercase tracking-wider"
          >
            Terug naar Home
          </Link>
          {type === 'talenten' || type === 'vacature' ? (
            <Link
              href="/vacatures"
              className="flex-1 px-6 py-3 border-2 border-black text-black text-center font-elegant font-medium hover:bg-black hover:text-white transition-all text-xs uppercase tracking-wider"
            >
              Meer Vacatures
            </Link>
          ) : null}
        </div>

        {/* Auto Redirect - Subtle */}
        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Automatisch doorsturen over <span className="font-display font-semibold text-black">{countdown}s</span>
          </p>
        </div>
      </div>
    </main>
  )
}

export default function Success() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black/95 backdrop-blur-xl text-white flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white text-black p-8 md:p-10 shadow-2xl border-t-4 border-black">
          <div className="text-center">
            <div className="w-16 h-16 bg-black mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-gray-700">Laden...</p>
          </div>
        </div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  )
}

