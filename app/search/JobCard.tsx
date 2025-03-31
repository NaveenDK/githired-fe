import Link from 'next/link';
import { Job } from '../store/types/jobs';
import Image from 'next/image';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  // For debugging purposes, you can uncomment this line
  //console.log(job.description);
  
  return (
    <Link href={`/job/${job.id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-3">
          {job.company_logo ? (
            <div className="w-10 h-10 relative mr-3">
              <Image 
                src={job.company_logo} 
                alt={`${job.company_name} logo`}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
              <span className="text-gray-500 text-xs font-bold">
                {job.company_name.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-bold text-lg">{job.title}</h3>
            <p className="text-gray-600 text-sm">{job.company_name}</p>
          </div>
        </div>
        
        <div className="mb-3">
          <span className="text-sm bg-gray-100 rounded px-2 py-1 mr-2">
            {job.job_type}
          </span>
          <span className="text-sm text-gray-600">
            {job.candidate_required_location}
          </span>
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-2">
          {job.description.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
        </p>
        
        <div className="mt-3 text-sm text-gray-500">
          Posted: {new Date(job.publication_date).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
} 