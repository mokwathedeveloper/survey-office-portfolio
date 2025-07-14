'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { JobType } from '@/types/job';

interface JobsPageProps {
  jobs: JobType[];
}

const JobsPage: React.FC<JobsPageProps> = ({ jobs }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Survey Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <Link href={`/jobs/${job._id}`} key={job._id} className="block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="relative h-48">
              <Image
                src={job.images && job.images.length > 0 ? job.images[0] : 'https://via.placeholder.com/300'}
                alt={job.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-700">{job.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
