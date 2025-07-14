// src/app/jobs/page.tsx

import Image from 'next/image';

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  images: string[];
  createdAt: string;
}

export default async function JobsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/jobs`, {
    cache: 'no-store',
  });
  const jobs: Job[] = await res.json();

  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Survey Jobs Portfolio</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border rounded p-4 shadow-sm hover:shadow-md transition"
          >
            {job.images[0] && (
              <div className="relative w-full h-48 mb-2">
                <Image
                  src={job.images[0]}
                  alt={job.title}
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            )}
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-600">{job.location}</p>
            <p className="text-gray-700 mt-1">{job.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
