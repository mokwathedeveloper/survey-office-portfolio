// src/types/job.ts

export interface JobType {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

