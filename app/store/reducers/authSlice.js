
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://remotive.com/api/',  
  }),
  endpoints: (builder) => ({
   
    getJobs: builder.query({
      query: () => 'remote-jobs', 
    }),
  }),
});

export const { useGetJobsQuery } = authApi;
