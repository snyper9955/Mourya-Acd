import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 px-4 sm:px-6 lg:px-8 pt-12 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-6 h-6 text-emerald-400" />
              <span className="font-bold text-lg text-white tracking-tight">
                EduManage
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering students with world-class education and personalized
              guidance since 2010.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Contact Info
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +91 12345 67890
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@edumanage.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> 123 Education Hub, City
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-xs tracking-wider">
            © 2026 EduManage Coaching Hub • Built for Success
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
