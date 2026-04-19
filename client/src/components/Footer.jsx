import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Send,
  ChevronRight,
  Clock
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-300">
      {/* Main Footer Content */}
      <div className="px-4 sm:px-8 lg:px-12 pt-10 sm:pt-16 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Grid Layout - Responsive */}
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
            
            {/* Brand Column */}
            <div className="flex flex-col text-left lg:col-span-1">
              <div className="flex items-center justify-start gap-2 mb-3 sm:mb-4">
                <div className="bg-emerald-500/20 p-2 sm:p-2.5 rounded-xl">
                <img src="/logo.jpeg" alt="" className='w-10 h-10 rounded-full' />
                </div>
                <span className="font-bold text-xl sm:text-2xl text-white tracking-tight">
                  Mourya Accadmy
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 sm:mb-6 max-w-sm">
                 teaching , guidence, and give best result from 2017.
              </p>
              <div className="flex items-center justify-start gap-2 sm:gap-3">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-800/80 border border-gray-700 hover:bg-emerald-500 hover:border-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links & Support Container for Mobile 2-cols */}
            <div className="grid grid-cols-2 gap-6 lg:col-span-2 lg:grid-cols-2">
              {/* Quick Links Column */}
              <div className="text-left">
                <h4 className="font-semibold text-white text-xs sm:text-sm uppercase tracking-wider mb-4 relative inline-block">
                  Quick Links
                  <span className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-6 sm:w-8 h-0.5 bg-emerald-500 rounded-full"></span>
                </h4>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  {['About Us', 'Contact', 'Blog'].map((item, idx) => (
                    <li key={idx}>
                      <Link
                        to={`/${item.toLowerCase().replace(' ', '')}`}
                        className="group flex items-center justify-start gap-1 sm:gap-2 hover:text-emerald-400 transition-colors text-gray-400"
                      >
                        <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 sm:-translate-x-2 group-hover:translate-x-0" />
                        <span>{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Column */}
              <div className="text-left">
                <h4 className="font-semibold text-white text-xs sm:text-sm uppercase tracking-wider mb-4 relative inline-block">
                  Support
                  <span className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-6 sm:w-8 h-0.5 bg-emerald-500 rounded-full"></span>
                </h4>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  {['FAQ', 'Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item, idx) => (
                    <li key={idx}>
                      <Link
                        to={`/${item.toLowerCase().replace(/ /g, '')}`}
                        className="group flex items-center justify-start gap-1 sm:gap-2 hover:text-emerald-400 transition-colors text-gray-400"
                      >
                        <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 sm:-translate-x-2 group-hover:translate-x-0" />
                        <span>{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact & Newsletter Column */}
            <div className="text-left lg:col-span-1">
              <h4 className="font-semibold text-white text-xs sm:text-sm uppercase tracking-wider mb-4 relative inline-block">
                Get In Touch
                <span className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-6 sm:w-8 h-0.5 bg-emerald-500 rounded-full"></span>
              </h4>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm mb-6">
                <li className="flex items-start justify-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800/80 border border-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  </div>
                  <span className="text-gray-300 sm:mt-1">+91 8809193796</span>
                </li>
                <li className="flex items-start justify-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800/80 border border-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  </div>
                  <span className="text-gray-300 break-all sm:mt-1">MouryAcc@gmail.com</span>
                </li>
                <li className="flex items-start justify-start gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800/80 border border-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  </div>
                  <span className="text-gray-300 leading-relaxed max-w-[200px]">Mourya Accadmy,Darbhanga, Bihar 846001</span>
                </li>
              </ul>


            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 sm:pt-8 border-t border-gray-800/80 flex flex-col items-center">
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center md:text-left">
              <p className="text-[10px] sm:text-xs text-gray-500 tracking-wider">
                © {currentYear} Mourya Accadmy Darbhanga • Built for Success
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs">
                <Link to="/sitemap" className="text-gray-500 hover:text-emerald-400 transition-colors">
                  Sitemap
                </Link>
                <span className="text-gray-700 hidden sm:inline">|</span>
                <Link to="/accessibility" className="text-gray-500 hover:text-emerald-400 transition-colors">
                  Accessibility
                </Link>
                <span className="text-gray-700 hidden sm:inline">|</span>
                <Link to="/terms" className="text-gray-500 hover:text-emerald-400 transition-colors">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Top Border */}
      <div className="w-full h-1 sm:h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>
    </footer>
  );
};

export default Footer;