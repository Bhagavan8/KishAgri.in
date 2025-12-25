import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Building, Lock, Save, Camera, Loader } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { karnatakaDistricts, type DistrictName } from '../data/karnataka-locations';

const Profile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'security'>('details');
  
  // Form states
  const [profileData, setProfileData] = useState({
    fullName: '',
    whatsappNumber: '',
    email: '',
    district: '' as DistrictName | '',
    taluk: '',
    collegeName: '',
    username: '',
    pinCode: '',
    photoURL: ''
  });

  // Password change states
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfileData({
            fullName: data.fullName || user.displayName || '',
            whatsappNumber: data.whatsappNumber || '',
            email: user.email || '',
            district: data.district || '',
            taluk: data.taluk || '',
            collegeName: data.collegeName || '',
            username: data.username || '',
            pinCode: data.pinCode || '',
            photoURL: user.photoURL || ''
          });
        } else {
            // Fallback if no firestore doc exists
            setProfileData(prev => ({
                ...prev,
                fullName: user.displayName || '',
                email: user.email || '',
                photoURL: user.photoURL || ''
            }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value as DistrictName;
    setProfileData({ ...profileData, district, taluk: '' });
  };

  const updateProfileDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);

    try {
      // 1. Update Auth Profile (Display Name & Photo URL)
      if (user.displayName !== profileData.fullName || user.photoURL !== profileData.photoURL) {
          await updateProfile(user, {
            displayName: profileData.fullName,
            photoURL: profileData.photoURL
          });
      }

      // 2. Update Firestore Document
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        fullName: profileData.fullName,
        whatsappNumber: profileData.whatsappNumber,
        district: profileData.district,
        taluk: profileData.taluk,
        collegeName: profileData.collegeName,
        username: profileData.username,
        pinCode: profileData.pinCode,
        photoURL: profileData.photoURL, // Store URL in firestore too for easy access if needed
        updatedAt: new Date().toISOString()
      });

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const updateUserPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsSaving(true);

    try {
      // Re-authenticate user first
      const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, passwordData.newPassword);
      
      toast.success('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      console.error('Error updating password:', error);
      if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect current password');
      } else {
        toast.error('Failed to update password. Please try again.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <Loader className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header / Banner */}
          <div className="bg-gradient-to-r from-primary-600 to-green-500 h-32 md:h-48 relative">
            <div className="absolute -bottom-16 left-8 md:left-12 flex items-end">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                  {profileData.photoURL ? (
                    <img 
                      src={profileData.photoURL} 
                      alt={profileData.fullName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-600">
                      <User className="w-16 h-16" />
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 ml-4 hidden md:block">
                <h1 className="text-2xl font-bold text-gray-900 mt-2">{profileData.fullName}</h1>
                <p className="text-gray-500 text-sm">{profileData.email}</p>
              </div>
            </div>
          </div>

          <div className="pt-20 px-8 md:px-12 pb-8">
             <div className="md:hidden mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{profileData.fullName}</h1>
                <p className="text-gray-500 text-sm">{profileData.email}</p>
             </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-4 px-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === 'details' 
                    ? 'text-primary-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Personal Details
                {activeTab === 'details' && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" 
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`pb-4 px-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === 'security' 
                    ? 'text-primary-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Security & Password
                {activeTab === 'security' && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" 
                  />
                )}
              </button>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
              {activeTab === 'details' ? (
                <form onSubmit={updateProfileDetails} className="space-y-6 max-w-2xl">
                   {/* Profile Image URL Input (Temporary solution for image upload) */}
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Image URL
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Camera className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            type="url"
                            name="photoURL"
                            value={profileData.photoURL}
                            onChange={handleProfileChange}
                            className="pl-10"
                            placeholder="https://example.com/my-photo.jpg"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Paste a direct link to your photo (e.g., from Google Photos, Unsplash, etc.)</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          name="fullName"
                          value={profileData.fullName}
                          onChange={handleProfileChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          name="username"
                          value={profileData.username}
                          onChange={handleProfileChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          name="email"
                          value={profileData.email}
                          disabled
                          className="pl-10 bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          name="whatsappNumber"
                          value={profileData.whatsappNumber}
                          onChange={handleProfileChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          name="collegeName"
                          value={profileData.collegeName}
                          onChange={handleProfileChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          name="district"
                          value={profileData.district}
                          onChange={handleDistrictChange}
                          className="w-full h-10 pl-10 pr-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                        >
                          <option value="">Select District</option>
                          {Object.keys(karnatakaDistricts).map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {profileData.district && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Taluk</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                              name="taluk"
                              value={profileData.taluk}
                              onChange={handleProfileChange}
                              className="w-full h-10 pl-10 pr-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                            >
                              <option value="">Select Taluk</option>
                              {karnatakaDistricts[profileData.district as DistrictName].map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pin Code</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          name="pinCode"
                          value={profileData.pinCode}
                          onChange={handleProfileChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isSaving} className="min-w-[120px]">
                      {isSaving ? (
                        <>
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={updateUserPassword} className="space-y-6 max-w-xl">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type="password"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type="password"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="pl-10"
                          required
                          placeholder="Min 6 characters"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type="password"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isSaving} variant="outline" className="min-w-[140px]">
                      {isSaving ? (
                        <>
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Update Password'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
