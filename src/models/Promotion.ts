import mongoose, { Schema, Document } from 'mongoose';

export interface IPromotion extends Document {
  title: string;
  description: string;
  thumbnail: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

const PromotionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

export default mongoose.models.Promotion || mongoose.model<IPromotion>('Promotion', PromotionSchema);
