import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Job from "@/models/jobModel";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  await dbConnect();

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const images = formData.getAll("images") as File[];

  const imageUrls: string[] = [];

  for (const file of images) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await cloudinary.v2.uploader.upload_stream(
      { folder: "survey-jobs" },
      (error, result) => {
        if (error) throw error;
        if (result?.secure_url) {
          imageUrls.push(result.secure_url);
        }
      }
    );

    uploadResult.end(buffer);
  }

  const newJob = await Job.create({
    title,
    description,
    location,
    images: imageUrls,
  });

  return NextResponse.json(newJob);
}
