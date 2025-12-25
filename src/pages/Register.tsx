import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Sprout, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { karnatakaDistricts, type DistrictName } from '../data/karnataka-locations';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    whatsappNumber: '',
    email: '',
    district: '' as DistrictName | '',
    taluk: '',
    collegeName: '',
    username: '',
    password: '',
    confirmPassword: '',
    pinCode: '',
  });

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value as DistrictName;
    setFormData({ ...formData, district, taluk: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;

      // 2. Update display name
      await updateProfile(user, {
        displayName: formData.fullName
      });

      // 3. Store additional user details in Firestore
      // Using email as a secondary index or just storing it is fine, but Auth handles login.
      // We store the extra profile data in a 'users' collection with the UID as the document ID.
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: formData.fullName,
        whatsappNumber: formData.whatsappNumber,
        email: formData.email,
        district: formData.district,
        taluk: formData.taluk,
        collegeName: formData.collegeName,
        username: formData.username,
        pinCode: formData.pinCode,
        state: 'Karnataka',
        createdAt: new Date().toISOString()
      });

      // 4. Redirect to login or dashboard
      console.log('Registration successful');
      navigate('/login');
      
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already registered. Please login.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || 'Failed to register. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="absolute top-6 left-6 z-10">
        <Link to="/" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="flex justify-center w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 mt-16 sm:mt-0"
        >
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-primary-50 p-3 rounded-xl">
              <Sprout className="h-10 w-10 text-primary-600" />
            </div>
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join thousands of students learning agriculture
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Enter your full name"
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Whatsapp Number */}
            <div>
              <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Whatsapp Number
              </label>
              <Input
                id="whatsappNumber"
                name="whatsappNumber"
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                value={formData.whatsappNumber}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Gmail
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@gmail.com"
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* State (Fixed) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <Input
                type="text"
                value="Karnataka"
                readOnly
                className="h-12 bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* District */}
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                District Name
              </label>
              <select
                id="district"
                name="district"
                required
                className="flex h-12 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus:bg-white transition-colors"
                value={formData.district}
                onChange={handleDistrictChange}
              >
                <option value="">Select District</option>
                {Object.keys(karnatakaDistricts).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Taluk */}
            <div>
              <label htmlFor="taluk" className="block text-sm font-medium text-gray-700 mb-1">
                Taluk Name
              </label>
              <select
                id="taluk"
                name="taluk"
                required
                disabled={!formData.district}
                className="flex h-12 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                value={formData.taluk}
                onChange={handleChange}
              >
                <option value="">Select Taluk</option>
                {formData.district && karnatakaDistricts[formData.district]?.map((taluk) => (
                  <option key={taluk} value={taluk}>
                    {taluk}
                  </option>
                ))}
              </select>
            </div>

            {/* Pin Code */}
            <div>
              <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
                Pin Code
              </label>
              <Input
                id="pinCode"
                name="pinCode"
                type="text"
                required
                placeholder="560001"
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                value={formData.pinCode}
                onChange={handleChange}
              />
            </div>

            {/* College Name */}
            <div className="md:col-span-2">
              <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-1">
                College Name
              </label>
              <Input
                id="collegeName"
                name="collegeName"
                type="text"
                required
                placeholder="Enter your college name"
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                value={formData.collegeName}
                onChange={handleChange}
              />
            </div>

            {/* Username */}
            <div className="md:col-span-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Choose a username"
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors pr-10"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors pr-10"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the <Link to="/terms-of-service" className="text-primary-600 hover:text-primary-500">Terms of Service</Link> and <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-500">Privacy Policy</Link>
            </label>
          </div>
          <div className="mt-4">
             <Button type="submit" className="w-full h-12 text-base font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Create Account'}
            </Button>
          </div>
          <div className="text-center mt-4">
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              Sign in here
            </Link>
          </div>
        </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
