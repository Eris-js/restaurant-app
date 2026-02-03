import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPopup extends Document {
    title: string;
    image?: string;
    link?: string;
    isActive: boolean;
}

const PopupSchema: Schema = new Schema({
    title: { type: String, required: true },
    image: { type: String },
    link: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Prevent overwrite in dev mode
const Popup: Model<IPopup> =
    mongoose.models.Popup || mongoose.model<IPopup>('Popup', PopupSchema);

export default Popup;
