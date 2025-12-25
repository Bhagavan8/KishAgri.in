import { motion } from 'framer-motion';
import { Clock, Star, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'K-CET Agriculture Crash Course',
    description: 'Intensive preparation for Karnataka Common Entrance Test for Agriculture seats. Covers Physics, Chemistry, Mathematics, and Biology as per latest syllabus.',
    duration: '3 Months',
    rating: 4.9,
    students: 1200,
    image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'Entrance Exam'
  },
  {
    id: 2,
    title: 'ICAR AIEEA UG Complete Guide',
    description: 'Comprehensive coaching for Indian Council of Agricultural Research All India Entrance Examination for Admission. Includes mock tests and study material.',
    duration: '6 Months',
    rating: 4.8,
    students: 850,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'National Level'
  },
  {
    id: 3,
    title: 'B.Sc Agriculture Fundamentals',
    description: 'Foundation course for first-year B.Sc Agriculture students. Covers basic concepts of Agronomy, Soil Science, and Plant Pathology.',
    duration: '4 Months',
    rating: 4.7,
    students: 500,
    image: 'https://images.unsplash.com/photo-1625246333195-58197bd47d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'Academic'
  },
  {
    id: 4,
    title: 'Agri-Business Management',
    description: 'Learn the business side of agriculture. Topics include supply chain management, farm economics, and agricultural marketing.',
    duration: '5 Months',
    rating: 4.8,
    students: 300,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'Professional'
  },
  {
    id: 5,
    title: 'Practical Organic Farming',
    description: 'Hands-on guide to organic farming techniques, certification processes, and market opportunities for organic produce.',
    duration: '2 Months',
    rating: 4.9,
    students: 600,
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'Skill Development'
  },
  {
    id: 6,
    title: 'Horticulture Specialization',
    description: 'Detailed study of fruit and vegetable crops, floriculture, and landscaping. Ideal for those interested in garden crops.',
    duration: '3 Months',
    rating: 4.6,
    students: 450,
    image: 'https://images.unsplash.com/photo-1558909612-e29f42f81147?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    category: 'Specialization'
  }
];

const Courses = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Explore Our Courses
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Enhance your agricultural knowledge with our expert-led courses designed for success.
          </motion.p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-green-700">
                  {course.category}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    {course.rating}
                  </div>
                </div>
                
                <Link to={`/register`}>
                  <Button className="w-full group">
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
