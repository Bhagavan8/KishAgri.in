import { motion } from 'framer-motion';
import { Users, Target, Award, Sprout } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Empowering Agriculture Education
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl max-w-3xl mx-auto text-green-100"
          >
            We are dedicated to shaping the future of agriculture by providing top-tier education and resources to aspiring students and professionals.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To bridge the gap between traditional agricultural knowledge and modern competitive exam requirements. We strive to make high-quality agricultural education accessible, affordable, and effective for every student across India, specifically focusing on Karnataka's agricultural landscape.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <Sprout className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the premier platform for agricultural excellence, fostering a community of knowledgeable, skilled, and passionate individuals who will lead the next Green Revolution. We aim to empower rural youth through education and technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose KisanAgri?</h2>
            <p className="mt-4 text-gray-600">We provide comprehensive support for your agricultural career journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-6 w-6 text-green-600" />,
                title: "Expert Faculty",
                description: "Learn from experienced professionals and top rankers in the field of agriculture."
              },
              {
                icon: <Award className="h-6 w-6 text-green-600" />,
                title: "Proven Track Record",
                description: "Our students consistently secure top ranks in K-CET, ICAR, and other competitive exams."
              },
              {
                icon: <Sprout className="h-6 w-6 text-green-600" />,
                title: "Comprehensive Material",
                description: "Access curated study materials, mock tests, and interactive sessions designed for success."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors"
              >
                <div className="h-12 w-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5000+", label: "Students" },
              { number: "100+", label: "Courses" },
              { number: "50+", label: "Expert Mentors" },
              { number: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2 text-green-400">{stat.number}</div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
