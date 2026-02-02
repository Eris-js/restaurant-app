import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  images: string[];
  category: string;
}

const GallerySchema: Schema = new Schema({
  title: { type: String, required: true },
  images: { type: [String], required: true },
  category: { type: String, required: true },
});

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
