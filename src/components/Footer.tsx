import { Sprout, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-primary-500/20 p-2 rounded-lg group-hover:bg-primary-500/30 transition-colors">
                  <Sprout className="h-6 w-6 text-primary-400" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">KisanAgri</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering the next generation of agricultural experts with practical skills and comprehensive exam preparation.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="bg-gray-800 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-primary-600 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Courses', path: '/courses' },
                  { name: 'Syllabus', path: '/syllabus' },
                  { name: 'Contact', path: '/contact' },
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-primary-400 transition-colors flex items-center group"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-2">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Courses */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Our Courses</h3>
              <ul className="space-y-3">
                {[
                  "K-CET Agriculture Quota",
                  "ICAR Preparation",
                  "CUET Agriculture",
                  "Practical Training",
                  "Mock Tests Series"
                ].map((item) => (
                  <li key={item}>
                    <Link 
                      to="/courses" 
                      className="text-gray-400 hover:text-primary-400 transition-colors flex items-center group"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-2">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400 group">
                  <MapPin className="h-5 w-5 text-primary-500 mt-0.5 group-hover:text-primary-400 transition-colors" />
                  <span className="group-hover:text-gray-300 transition-colors">Near Agriculture University,<br />GKVK, Bangalore - 560065</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400 group">
                  <Phone className="h-5 w-5 text-primary-500 group-hover:text-primary-400 transition-colors" />
                  <span className="group-hover:text-gray-300 transition-colors">+91 98456 12345</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400 group">
                  <Mail className="h-5 w-5 text-primary-500 group-hover:text-primary-400 transition-colors" />
                  <span className="group-hover:text-gray-300 transition-colors">admissions@kisanagri.in</span>
                </li>
              </ul>
            </div>
          </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} KisanAgri. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
