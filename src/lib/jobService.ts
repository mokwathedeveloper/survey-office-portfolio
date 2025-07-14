// src/lib/jobService.ts

import dbConnect from "./db";
import Job from "@/models/jobModel";
import { JobType } from "@/types/job";
import mongoose from "mongoose";

interface LeanJobDocument {
  _id: mongoose.Types.ObjectId; // Mongoose ObjectId
  title: string;
  description?: string;
  location?: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export async function getAllJobs(): Promise<JobType[]> {
  await dbConnect();
  const jobs = await Job.find({}).sort({ createdAt: -1 }).lean<LeanJobDocument[]>();
  return jobs.map(job => ({
    _id: job._id.toString(),
    title: job.title,
    description: job.description,
    location: job.location,
    images: job.images,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  }));
}

export async function getJobById(id: string): Promise<JobType | null> {
  await dbConnect();
  const job = await Job.findById(id).lean<LeanJobDocument>();
  if (!job) return null;
  return {
    _id: job._id.toString(),
    title: job.title,
    description: job.description,
    location: job.location,
    images: job.images,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  };
}
