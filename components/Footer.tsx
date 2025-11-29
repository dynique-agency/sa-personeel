'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-pure-black border-t border-white/10 py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="relative w-32 h-16 mb-6">
                <Image
                  src="/logo.webp"
                  alt="SA Personeel"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                SA Personeel Talent Solutions verbindt gekwalificeerde vakmensen met toonaangevende bedrijven.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-display font-semibold text-sm uppercase tracking-wider mb-4">Navigatie</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/werkgevers" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                    Voor Werkgevers
                  </Link>
                </li>
                <li>
                  <Link href="/talenten" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                    Voor Talenten
                  </Link>
                </li>
                <li>
                  <Link href="/vacatures" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                    Vacatures
                  </Link>
                </li>
                <li>
                  <Link href="/overons" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                    Over Ons
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-display font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>Email: info@sapersoneel.nl</li>
                <li>Tel: +31 (0)XX XXX XXXX</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} SA Personeel. Alle rechten voorbehouden.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors duration-300">
                Privacy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors duration-300">
                Voorwaarden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

