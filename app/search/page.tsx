'use client';

import { useGetJobsQuery } from '../store/reducers/jobsApi';
import JobCard from './JobCard';
import SearchOptions from './SearchOptions';
import Pagination from '../components/Pagination';
import { useState, useEffect } from 'react';

const JOBS_PER_PAGE = 10;

export default function SearchPage() {
  const { data, isLoading, isError } = useGetJobsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filter jobs based on search term and category
  useEffect(() => {
    if (data?.jobs) {
      const filtered = data.jobs.filter(job => {
        const matchesSearch = searchTerm === '' || 
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
          
        const matchesCategory = selectedCategory === '' || job.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
      });
      
      setFilteredJobs(filtered);
      setTotalPages(Math.ceil(filtered.length / JOBS_PER_PAGE));
      setCurrentPage(1); // Reset to first page when filters change
    }
  }, [data, searchTerm, selectedCategory]);
  
  // Get current jobs for the page
  const getCurrentJobs = () => {
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    const endIndex = startIndex + JOBS_PER_PAGE;
    return filteredJobs.slice(startIndex, endIndex);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (isLoading) {
    return <div className="container mx-auto p-4">Loading jobs...</div>;
  }
  
  if (isError) {
    return <div className="container mx-auto p-4">Error loading jobs</div>;
  }
  
  // Get unique categories for filter
  const categories = [...new Set(data?.jobs.map(job => job.category))];
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Find Your Next Remote Job</h1>
      
      <SearchOptions 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      
      <div className="mt-6">
        <p className="mb-4">
          Found {filteredJobs.length} jobs
          {filteredJobs.length > 0 && ` (showing ${(currentPage - 1) * JOBS_PER_PAGE + 1} - ${Math.min(currentPage * JOBS_PER_PAGE, filteredJobs.length)})`}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getCurrentJobs().map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
