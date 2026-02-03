import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    slug: string;
    thumbnail: string;
    description: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const ArticleSchema: Schema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String },
    description: { type: String },
    content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);
