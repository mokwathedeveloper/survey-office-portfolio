// src/app/jobs/page.tsx

import { getAllJobs } from "@/lib/jobService";
import JobsPage from "./JobsPage";

export default async function JobsPageContainer() {
  const jobs = await getAllJobs();
  const plainJobs = jobs.map(job => ({
    _id: job._id.toString(),
    title: job.title,
    description: job.description,
    location: job.location,
    images: job.images,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
  }));
  return <JobsPage jobs={plainJobs} />;
}
