import mongoose, { Schema, Document, model, models } from 'mongoose';

// --- Interfaces ---

export interface ISlider extends Document {
    title: string;
    image: string;
    link?: string;
    order: number;
    active: boolean;
}

export interface IGallery extends Document {
    title: string;
    image: string;
    category: string;
    createdAt: Date;
}

export interface IPost extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    thumbnail: string;
    active: boolean;
    createdAt: Date;
}

export interface IPromotion extends Document {
    title: string;
    description: string;
    image: string;
    startDate: Date;
    endDate: Date;
    active: boolean;
}

// --- Schemas ---

const SliderSchema = new Schema<ISlider>({
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
}, { timestamps: true });

const GallerySchema = new Schema<IGallery>({
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, default: 'General' },
}, { timestamps: true });

const PostSchema = new Schema<IPost>({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    thumbnail: { type: String },
    active: { type: Boolean, default: true },
}, { timestamps: true });

const PromotionSchema = new Schema<IPromotion>({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    active: { type: Boolean, default: true },
}, { timestamps: true });

// --- Export Models ---
// Prevent overwriting models during hot reload
export const Slider = models.Slider || model<ISlider>('Slider', SliderSchema);
export const Gallery = models.Gallery || model<IGallery>('Gallery', GallerySchema);
export const Post = models.Post || model<IPost>('Post', PostSchema);
export const Promotion = models.Promotion || model<IPromotion>('Promotion', PromotionSchema);
