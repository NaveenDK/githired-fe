'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [userType, setUserType] = useState<'jobSeeker' | 'employer'>('jobSeeker');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation and submission logic would go here
    console.log('Form submitted:', { userType, ...formData });
  };

  return (
    <main className="pt-24 pb-12 flex flex-col items-center">
      <div className="w-full max-w-md px-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Join <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">GitHired</span>
        </h1>
        
        {/* User Type Toggle */}
        <div className="bg-gray-100 rounded-lg p-1 flex mb-8">
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              userType === 'jobSeeker' 
                ? 'bg-white text-purple-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setUserType('jobSeeker')}
          >
            Looking for Opportunities
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              userType === 'employer' 
                ? 'bg-white text-purple-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setUserType('employer')}
          >
            Hiring Talent
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              required
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
              I agree to the <Link href="/terms" className="text-purple-600 hover:text-purple-700">Terms of Service</Link> and <Link href="/privacy" className="text-purple-600 hover:text-purple-700">Privacy Policy</Link>
            </label>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            {userType === 'jobSeeker' ? 'Create Developer Account' : 'Create Employer Account'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
            Sign in
          </Link>
        </p>
        
        {userType === 'jobSeeker' ? (
          <div className="mt-6 bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800">Looking for opportunities?</h3>
            <p className="text-sm text-purple-700 mt-1">
              Create your developer profile to showcase your skills and get discovered by top companies.
            </p>
          </div>
        ) : (
          <div className="mt-6 bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800">Hiring developers?</h3>
            <p className="text-sm text-purple-700 mt-1">
              Post jobs and connect with qualified developers ready for their next challenge.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}