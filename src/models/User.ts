import mongoose, { Schema, Model } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String, // Hashed password
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

// Prevent overwrite in dev mode
const User: Model<any> =
    mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
