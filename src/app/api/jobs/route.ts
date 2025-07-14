import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Job from '@/models/jobModel';

// Create a new Job (POST)
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const job = await Job.create(body);
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    const err = error as Error;
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to create job', details: err.message },
      { status: 500 }
    );
  }
}

// Get all Jobs (GET)
export async function GET() {
  await dbConnect();

  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return NextResponse.json(jobs);
  } catch (error) {
    const err = error as Error;
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch jobs', details: err.message },
      { status: 500 }
    );
  }
}
