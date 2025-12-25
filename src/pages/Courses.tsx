import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, ArrowRight, CheckCircle, Loader } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { courses } from '../data/courses';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const Courses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<number[]>([]);
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user) {
        setEnrolledCourseIds([]);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setEnrolledCourseIds(userData.enrolledCourses || []);
        }
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    };

    fetchEnrollments();
  }, [user]);

  const handleCourseAction = async (courseId: number) => {
    if (!user) {
      navigate('/register');
      return;
    }

    // If already enrolled, navigate to My Courses
    if (enrolledCourseIds.includes(courseId)) {
      navigate('/my-courses');
      return;
    }

    // Enroll logic
    setProcessingId(courseId);

    try {
      const userRef = doc(db, 'users', user.uid);
      
      // Update Firestore
      await updateDoc(userRef, {
        enrolledCourses: arrayUnion(courseId)
      });

      // Update local state
      setEnrolledCourseIds(prev => [...prev, courseId]);
      
      toast.success('Successfully enrolled!');
      navigate('/my-courses');
    } catch (error) {
      console.error('Error enrolling:', error);
      toast.error('Failed to enroll. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

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
          {courses.map((course, index) => {
            const isEnrolled = enrolledCourseIds.includes(course.id);
            const isProcessing = processingId === course.id;

            return (
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
                  
                  <Button 
                    className={`w-full group ${isEnrolled ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    onClick={() => handleCourseAction(course.id)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : isEnrolled ? (
                      <>
                        Continue Learning
                        <CheckCircle className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Enroll Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Courses;
