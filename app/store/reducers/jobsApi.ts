import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Job } from '../types/jobs';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://remotive.com/api/',  
  }),
  endpoints: (builder) => ({
    getJobs: builder.query<{jobs: Job[]}, void>({
      query: () => 'remote-jobs', 
    }),
    
    // Enhanced endpoint to get a single job by ID
    getJobById: builder.query<Job, string>({
      query: () => 'remote-jobs',
      // Since the API doesn't have a direct endpoint for a single job,
      // we'll fetch all jobs and filter for the one we want
      transformResponse: (response: {jobs: Job[]}, _, id) => {
        console.log('Searching for job with ID:', id);
        console.log('Number of jobs:', response.jobs.length);
        
        // Make sure we're comparing the same type (string vs number)
        const jobId = typeof id === 'string' ? id : id.toString();
        
        const job = response.jobs.find(job => {
          const currentJobId = typeof job.id === 'string' ? job.id : job.id.toString();
          return currentJobId === jobId;
        });
        
        if (!job) {
          console.error('Job not found with ID:', id);
          throw new Error(`Job not found with ID: ${id}`);
        }
        
        console.log('Found job:', job.title);
        return job;
      },
    }),
  }),
});

export const { useGetJobsQuery, useGetJobByIdQuery } = jobsApi; 