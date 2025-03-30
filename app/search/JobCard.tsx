import Link from 'next/link';
import { Job } from '../store/types/jobs';

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
          {job.company_logo && (
            <img 
              src={job.company_logo} 
              alt={`${job.company_name} logo`} 
              className="w-10 h-10 object-contain mr-3"
            />
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