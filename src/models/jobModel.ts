import { Schema, Document, models, model } from 'mongoose';


export interface IJob extends Document {
  title: string;
  description: string;
  location: string;
  date: Date;
  images: string[];
}

const JobSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the job'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Avoid model overwrite in Next.js hot reload
export default models.Job || model<IJob>('Job', JobSchema);
