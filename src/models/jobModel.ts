import { Schema, Document, models, model } from 'mongoose';

export interface JobDocument extends Document {
  title: string;
  description: string;
  location: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<JobDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default models.Job<JobDocument> || model<JobDocument>('Job', jobSchema);
