import mongoose, { Schema, Document } from 'mongoose';

export interface ISlider extends Document {
  title: string;
  image: string;
  link?: string;
  active: boolean;
  order: number;
}

const SliderSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String },
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

export default mongoose.models.Slider || mongoose.model<ISlider>('Slider', SliderSchema);
