'use client';

import { useParams } from 'next/navigation';
import { useGetJobByIdQuery } from '@/app/store/reducers/jobsApi';
import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';

export default function JobDetailsPage() {
  const { id } = useParams();
  const { data: job, isLoading, isError, error } = useGetJobByIdQuery(id as string);

  // Debug logging to help identify issues
  useEffect(() => {
    console.log('Job ID:', id);
    console.log('Job data:', job);
    console.log('Loading:', isLoading);
    console.log('Error:', isError, error);
  }, [id, job, isLoading, isError, error]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-xl font-bold text-red-500">Error loading job</h1>
          <p className="mb-4">{error?.toString() || 'Failed to load job details'}</p>
          <p className="mb-4">Job ID: {id}</p>
          <Link href="/search" className="text-blue-500 hover:underline">
            Back to job search
          </Link>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-xl font-bold text-amber-500">Job Not Found</h1>
          <p className="mb-4">We couldn&apos;t find the job with ID: {id}</p>
          <Link href="/search" className="text-blue-500 hover:underline">
            Back to job search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/search" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to job search
      </Link>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          {job.company_logo && (
            <div className="w-16 h-16 relative mr-4">
              <Image 
                src={job.company_logo} 
                alt={`${job.company_name} logo`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-600">{job.company_name}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded">
            <span className="font-semibold">Location:</span> {job.candidate_required_location}
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <span className="font-semibold">Job Type:</span> {job.job_type}
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <span className="font-semibold">Category:</span> {job.category}
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <span className="font-semibold">Posted:</span> {new Date(job.publication_date).toLocaleDateString()}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Salary</h2>
          <p>{job.salary || "Not specified"}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <div 
            dangerouslySetInnerHTML={{ __html: job.description }} 
            className="prose max-w-none"
          />
        </div>
        
        <div className="mt-8">
          <a 
            href={job.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Apply for this position
          </a>
        </div>
      </div>
    </div>
  );
} 