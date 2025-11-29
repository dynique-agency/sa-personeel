'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Alle vacatures
const alleVacatures = [
  {
    id: 'monteur-werktuigbouw-vekoma',
    title: 'Monteur Werktuigbouw',
    bedrijf: 'Vekoma',
    locatie: 'Vlopdrop',
    type: 'Fulltime',
    uren: '40 uur',
    salaris: '€2.800 - €3.500',
    sector: 'Techniek',
    beschrijving: 'Ervaren monteur gezocht voor assemblage en onderhoud van attracties. MBO niveau 3-4 vereist.',
    datum: '2025-11-28'
  },
  {
    id: 'lasser-mig-mag-vekoma',
    title: 'Lasser MIG/MAG',
    bedrijf: 'Vekoma',
    locatie: 'Vlopdrop',
    type: 'Fulltime',
    uren: '40 uur',
    salaris: '€2.600 - €3.400',
    sector: 'Bouw & Techniek',
    beschrijving: 'Gecertificeerd lasser voor staalkonstrukties. Werkervaring in productieomgeving gewenst.',
    datum: '2025-11-27'
  },
  {
    id: 'productiemedewerker-vekoma',
    title: 'Productiemedewerker',
    bedrijf: 'Vekoma',
    locatie: 'Vlopdrop',
    type: 'Fulltime',
    uren: '40 uur',
    salaris: '€2.400 - €2.800',
    sector: 'Productie',
    beschrijving: 'Assemblagewerkzaamheden voor wereldwijde attractieprojecten. Technische affiniteit vereist.',
    datum: '2025-11-26'
  }
]

export default function Vacatures() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState('Alle')
  const [selectedType, setSelectedType] = useState('Alle')

  // Filter vacatures
  const filteredVacatures = alleVacatures.filter((vacature) => {
    const matchesSearch = 
      vacature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacature.bedrijf.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacature.locatie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacature.beschrijving.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSector = selectedSector === 'Alle' || vacature.sector === selectedSector
    const matchesType = selectedType === 'Alle' || vacature.type === selectedType

    return matchesSearch && matchesSector && matchesType
  })

  const sectoren = ['Alle', ...Array.from(new Set(alleVacatures.map(v => v.sector)))]
  const types = ['Alle', 'Fulltime', 'Parttime', 'Tijdelijk']

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 bg-black text-white overflow-hidden">
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
                    Vacatures
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
                <span className="text-gray-400">Volgende Stap</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto"
              >
                Ontdek actuele vacatures in Limburg en omstreken. Filter op sector, locatie of functie.
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

      {/* Filters & Search */}
      <section className="py-8 md:py-10 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label htmlFor="search" className="block text-xs font-elegant font-medium text-black mb-1.5 uppercase tracking-wider">
                  Zoeken {searchTerm && <span className="text-gray-500 normal-case">({searchTerm})</span>}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Functie, bedrijf, locatie..."
                    className={`w-full px-4 py-2.5 pl-10 border-2 focus:outline-none transition-colors text-black bg-white ${
                      searchTerm 
                        ? 'border-black' 
                        : 'border-gray-300 focus:border-black'
                    }`}
                  />
                  <svg className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    searchTerm ? 'text-black' : 'text-gray-400'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                      aria-label="Wis zoekterm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Sector Filter */}
              <div>
                <label htmlFor="sector" className="block text-xs font-elegant font-medium text-black mb-1.5 uppercase tracking-wider">
                  Sector {selectedSector !== 'Alle' && <span className="text-gray-500 normal-case">({selectedSector})</span>}
                </label>
                <select
                  id="sector"
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className={`w-full px-4 py-2.5 border-2 focus:outline-none transition-colors bg-white text-black ${
                    selectedSector !== 'Alle'
                      ? 'border-black font-medium'
                      : 'border-gray-300 focus:border-black'
                  }`}
                >
                  <option value="Alle">Alle Sectoren</option>
                  <option value="Techniek">Techniek</option>
                  <option value="Productie">Productie</option>
                  <option value="Bouw & Techniek">Bouw & Techniek</option>
                  <option value="Transport">Transport</option>
                  <option value="Logistiek">Logistiek</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label htmlFor="type" className="block text-xs font-elegant font-medium text-black mb-1.5 uppercase tracking-wider">
                  Type {selectedType !== 'Alle' && <span className="text-gray-500 normal-case">({selectedType})</span>}
                </label>
                <select
                  id="type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={`w-full px-4 py-2.5 border-2 focus:outline-none transition-colors bg-white text-black ${
                    selectedType !== 'Alle'
                      ? 'border-black font-medium'
                      : 'border-gray-300 focus:border-black'
                  }`}
                >
                  <option value="Alle">Alle Types</option>
                  <option value="Fulltime">Fulltime</option>
                  <option value="Parttime">Parttime</option>
                  <option value="Tijdelijk">Tijdelijk</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedSector !== 'Alle' || selectedType !== 'Alle') && (
              <div className="mt-6 pt-4 border-t border-gray-300">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-elegant font-medium text-gray-600 uppercase tracking-wider">
                    Actieve filters:
                  </span>
                  {searchTerm && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-white text-xs font-elegant font-medium uppercase tracking-wider group"
                    >
                      <span>Zoek: "{searchTerm}"</span>
                      <button
                        onClick={() => setSearchTerm('')}
                        className="hover:text-gray-300 transition-colors"
                        aria-label="Verwijder zoekterm"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  )}
                  {selectedSector !== 'Alle' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-white text-xs font-elegant font-medium uppercase tracking-wider group"
                    >
                      <span>Sector: {selectedSector}</span>
                      <button
                        onClick={() => setSelectedSector('Alle')}
                        className="hover:text-gray-300 transition-colors"
                        aria-label="Verwijder sector filter"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  )}
                  {selectedType !== 'Alle' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-white text-xs font-elegant font-medium uppercase tracking-wider group"
                    >
                      <span>Type: {selectedType}</span>
                      <button
                        onClick={() => setSelectedType('Alle')}
                        className="hover:text-gray-300 transition-colors"
                        aria-label="Verwijder type filter"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  )}
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedSector('Alle')
                      setSelectedType('Alle')
                    }}
                    className="ml-auto text-xs font-elegant font-medium text-gray-600 hover:text-black transition-colors uppercase tracking-wider underline"
                  >
                    Wis alle filters
                  </button>
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <span className="font-display font-semibold text-black">{filteredVacatures.length}</span> {filteredVacatures.length === 1 ? 'vacature' : 'vacatures'} gevonden
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vacatures List */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            {filteredVacatures.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVacatures.map((vacature) => (
                  <Link
                    key={vacature.id}
                    href={`/vacature/${vacature.id}`}
                    className="block bg-black text-white p-6 hover:shadow-2xl transition-all duration-300 group border-t-4 border-white hover:-translate-y-1"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <span className="text-xs uppercase tracking-wider text-gray-400 block mb-1 font-elegant">
                          {vacature.bedrijf}
                        </span>
                        <h3 className="text-lg font-display font-semibold tracking-tight group-hover:text-gray-300 transition-colors">
                          {vacature.title}
                        </h3>
                      </div>
                      <div className="w-8 h-8 border border-white flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-black transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="text-gray-300">{vacature.locatie}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-300">{vacature.type} • {vacature.uren}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-300">{vacature.salaris}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                      {vacature.beschrijving}
                    </p>

                    {/* Sector Badge */}
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-white/10 text-white text-[10px] font-elegant font-medium uppercase tracking-wide">
                        {vacature.sector}
                      </span>
                      <span className="text-xs font-elegant font-medium uppercase tracking-wider group-hover:text-gray-300 transition-colors">
                        Bekijk →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold text-black mb-2">Geen vacatures gevonden</h3>
                <p className="text-gray-600 mb-6">Probeer andere zoektermen of filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedSector('Alle')
                    setSelectedType('Alle')
                  }}
                  className="px-6 py-2 bg-black text-white font-elegant font-medium hover:bg-gray-800 transition-all uppercase tracking-wider text-xs"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-black text-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 tracking-tight">
              Niet gevonden wat je zoekt?
            </h2>
            <p className="text-base text-gray-300 mb-6">
              Laat je gegevens achter en we helpen je verder met het vinden van jouw perfecte baan.
            </p>
            <Link
              href="/talenten#contact"
              className="inline-block px-8 py-3 bg-white text-black font-elegant font-medium hover:bg-gray-200 transition-all uppercase tracking-wider text-xs"
            >
              Open Sollicitatie
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
