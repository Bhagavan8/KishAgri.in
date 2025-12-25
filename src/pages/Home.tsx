import * as React from 'react';
import { BookOpen, Users, CheckCircle2, Microscope, GraduationCap, Map } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CourseCurriculum from '../components/CourseCurriculum';

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
  >
    <div className="bg-gray-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-50 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const StatCard = ({ number, label }: { number: string, label: string }) => (
  <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
    <p className="text-3xl lg:text-4xl font-bold text-white mb-2">{number}</p>
    <p className="text-primary-200 font-medium">{label}</p>
  </div>
);

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/40 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-50/40 via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6 border border-primary-100">
                  🌱 K-CET Agriculture Quota Exam 2026-27
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-[1.1]">
                  Complete Guidance to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Excel in Practical Exams</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Join KisanAgri for comprehensive coaching, hands-on practice with 500+ live specimens, and expert mentorship for your agriculture journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/courses">
                    <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14 rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all">
                      View Syllabus
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 h-14 rounded-xl border-gray-200 hover:bg-gray-50 hover:text-gray-900">
                      Enroll Now
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 w-full max-w-lg lg:max-w-none relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop" 
                  alt="Modern Agriculture" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3"
              >
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kisan Achievers</p>
                  <p className="text-lg font-bold text-gray-900">500+</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3"
              >
                <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Live Specimens</p>
                  <p className="text-lg font-bold text-gray-900">500+</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose KisanAgri?</h2>
            <p className="text-lg text-gray-600">
              We provide a holistic learning environment that blends theoretical knowledge with practical skills for comprehensive development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Microscope className="h-8 w-8 text-primary-600" />}
              title="500+ Live Specimens"
              description="Hands-on practice with over 500 live exam specimens to ensure you are fully prepared for practical identification."
              delay={0.1}
            />
            <FeatureCard 
              icon={<GraduationCap className="h-8 w-8 text-blue-600" />}
              title="Expert Faculty"
              description="Lectures from experienced faculty and agriculture graduates tailored for competitive exams."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Map className="h-8 w-8 text-orange-600" />}
              title="Field Visits"
              description="Regular field visits to nurseries and agriculture-related departments for real-world exposure."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What You Will Learn</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our curriculum covers every aspect of the K-CET Agriculture Practical Exam, ensuring no topic is left behind.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-700">Well-prepared study materials</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-700">Regular Mock Tests</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-700">Personal Mentorship</span>
                </div>
              </div>
              <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100">
                <h4 className="font-bold text-primary-900 mb-2">Course Fee</h4>
                <p className="text-3xl font-bold text-primary-600">₹3,000 <span className="text-sm font-normal text-gray-500">/ only</span></p>
                <p className="text-sm text-primary-700 mt-2">Complete guidance till K-CET Counselling</p>
              </div>
            </div>
            <div className="lg:w-2/3">
              <CourseCurriculum />
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Vision Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Aligned with the Vision of a Developed Nation</h2>
              <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                Our mission is to nurture educated and skilled youths who will contribute to the nation's growth journey. At KisanAgri, you don't just prepare for exams – you prepare for a brighter future.
              </p>
              <ul className="space-y-4">
                {[
                  "Offline / Online Coaching Support",
                  "Hands-on practice with specimens",
                  "Complete Career Guidance"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-lg text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="mt-8 bg-white text-gray-900 hover:bg-gray-100">
                Contact Us for Admission
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <StatCard number="10+" label="Mock Tests" />
              <StatCard number="500+" label="Specimens" />
              <StatCard number="100%" label="Practical Focus" />
              <StatCard number="2026" label="Target Exam" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl shadow-primary-600/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Agricultural Journey?</h2>
              <p className="text-primary-100 mb-8 text-lg max-w-2xl mx-auto">
                Join thousands of students who are shaping the future of agriculture with KisanAgri. Admission open for 2026-27 batch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto px-8 bg-white text-primary-600 hover:bg-gray-100 border-none">
                    Register Now
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 border-primary-400 text-white hover:bg-primary-700 hover:text-white bg-transparent">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;