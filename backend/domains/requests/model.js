import { Schema, model } from "mongoose";

const requestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    address: { type: String, required: true },
    photos: [String],
    location: {
        lat: Number,
        lng: Number,
    },
    createdAt: { type: Date, default: Date.now },
});

export default model("Request", requestSchema);
