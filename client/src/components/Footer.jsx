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
      <div className="px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Grid Layout - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
            
            {/* Brand Column */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                <div className="bg-emerald-500/20 p-2 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="font-bold text-xl text-white tracking-tight">
                  EduManage
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Empowering students with world-class education and personalized guidance since 2010.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-8 h-8 bg-gray-800 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-emerald-500 rounded-full hidden sm:block"></span>
              </h4>
              <ul className="space-y-2.5 text-sm">
                {['About Us', 'Courses', 'Contact', 'Blog'].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/${item.toLowerCase().replace(' ', '')}`}
                      className="group flex items-center justify-center sm:justify-start gap-1 hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-emerald-500 rounded-full hidden sm:block"></span>
              </h4>
              <ul className="space-y-2.5 text-sm">
                {['FAQ', 'Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/${item.toLowerCase().replace(/ /g, '')}`}
                      className="group flex items-center justify-center sm:justify-start gap-1 hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter Column */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4 relative inline-block">
                Get In Touch
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-emerald-500 rounded-full hidden sm:block"></span>
              </h4>
              <ul className="space-y-3 text-sm mb-5">
                <li className="flex items-center justify-center sm:justify-start gap-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-gray-300">+91 12345 67890</span>
                </li>
                <li className="flex items-center justify-center sm:justify-start gap-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-gray-300 text-sm break-all">support@edumanage.com</span>
                </li>
                <li className="flex items-center justify-center sm:justify-start gap-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-gray-300">123 Education Hub, City</span>
                </li>
                <li className="flex items-center justify-center sm:justify-start gap-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-gray-300">Mon-Fri: 9AM - 6PM</span>
                </li>
              </ul>

              {/* Newsletter Subscription */}
              <div className="mt-4">
                <p className="text-xs text-gray-400 mb-2">Subscribe to our newsletter</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 group">
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-center">
              <p className="text-xs text-gray-500 tracking-wider">
                © {currentYear} EduManage Coaching Hub • Built for Success
              </p>
              <div className="flex gap-4 text-xs">
                <Link to="/sitemap" className="text-gray-500 hover:text-gray-300 transition-colors">
                  Sitemap
                </Link>
                <span className="text-gray-700">|</span>
                <Link to="/accessibility" className="text-gray-500 hover:text-gray-300 transition-colors">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>
    </footer>
  );
};

export default Footer;