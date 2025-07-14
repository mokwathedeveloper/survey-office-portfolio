// src/app/jobs/[id]/page.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getJobById } from '@/lib/jobService';
import Image from 'next/image';

export default async function JobDetailPage(props: any) {
  const { params } = props;
  const job = await getJobById(params.id);

  if (!job) {
    return (
      <main className="min-h-screen p-4 flex items-center justify-center">
        <p className="text-center text-red-500">Job not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-4">{job.location}</p>
      {job.images && job.images.length > 0 && (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={job.images[0]}
            alt={job.title}
            fill
            className="object-cover rounded"
            priority
          />
        </div>
      )}
      <p className="text-gray-800">{job.description}</p>
    </main>
  );
}