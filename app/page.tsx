"use client";

import { useGetJobsQuery } from './store/reducers/jobsApi';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import TopLoader from 'nextjs-toploader'; // Import TopLoader for the loader bar
import Image from 'next/image';

export default function Home() {
  const { data: jobs, isLoading } = useGetJobsQuery(undefined);
  const [visibleJobs, setVisibleJobs] = useState<any[]>([]); 
  const [loading, setLoading] = useState(false); 
  const [page, setPage] = useState(1); 

  
  const loadMoreJobs = () => {
    setLoading(true);
    setTimeout(() => {
      const nextJobs = jobs?.jobs.slice(page * 6, (page + 1) * 6) || [];
      setVisibleJobs((prev) => [...prev, ...nextJobs]); 
      setPage((prev) => prev + 1); 
      setLoading(false);
    }, 1000); 
  };

 
  useEffect(() => {
    if (jobs) {
      setVisibleJobs(jobs.jobs.slice(0, 6)); 
    }
  }, [jobs]);

  if (isLoading) return <p>Loading...</p>;
 

  return (
    <main className="flex min-h-screen flex-col">
      {/* Top Loader */}
      <TopLoader show={isLoading || loading} /> {/* Show loader when data is being fetched */}

      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Find Your Next
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                {' '}
                Developer Job
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with top tech companies and startups looking for talent like you.
              Your next opportunity is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <input
                type="text"
                placeholder="Search jobs, skills, or companies"
                className="px-6 py-3 rounded-lg border border-gray-300 w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Link href="/search">
                <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Search Jobs
                </button>
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              Popular: React, Python, JavaScript, Full Stack, Remote
            </p>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Loading and error handling */}
            {isLoading && <p className="text-center">Loading jobs...</p>}

            {/* Dynamically render job cards */}
            {visibleJobs?.map((job) => (
              <Link 
                href={`/job/${job.id}`} 
                key={job.id}
                className="block bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Company Info and Logo */}
                <div className="flex items-center justify-between mb-4">
                  {job.company_logo ? (
                    <Image
                      src={job.company_logo}
                      alt={job.company_name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 text-sm font-bold">
                        {job.company_name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-sm text-purple-600 font-medium">New</span>
                </div>

                {/* Job Title and Company Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-4">{job.company_name}</p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium border border-purple-300">
                    {job.category}
                  </span>
                </div>

                {/* Job Location, Type, and Salary */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{job.candidate_required_location}</span>
                  <span className="font-semibold">{job.job_type}</span>
                  <span className="font-semibold">{job.salary}</span>
                </div>

                {/* View Details Button */}
                <div className="text-purple-600 hover:text-purple-700 font-medium">
                  View Job Details
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {jobs && jobs.jobs.length > visibleJobs.length && (
            <div className="text-center mt-8">
              <button
                onClick={loadMoreJobs}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More Jobs'}
              </button>
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              href="/search"
              className="text-purple-600 font-medium hover:text-purple-700"
            >
              View all jobs →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How GitHired Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              {
                title: 'Create Profile',
                description: 'Sign up and create your developer profile with your skills and experience.',
              },
              {
                title: 'Find Jobs',
                description: 'Search and filter through thousands of tech jobs that match your criteria.',
              },
              {
                title: 'Apply & Connect',
                description: 'Apply to jobs with one click and connect directly with companies.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">{i + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to find your next opportunity?
          </h2>
          <p className="text-purple-100 mb-8">
            Join thousands of developers who have found their dream jobs through GitHired
          </p>
          <Link href="/search">
            <button className="px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
