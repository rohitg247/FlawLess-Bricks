import mongoose from "mongoose";
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    price: {
        type: Number,
        required: true,
    },
    rentFrequency: {
        type: String,
        required: true,
    },
    rooms: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    baths: {
        type: Number,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    agency: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    furnishingStatus: {
        type: String,
        required: true,
    },
    amenities: [
        {
            type: String,
        },
    ],
    photos: [
        {
            type: String,
        },
    ],
});

export default mongoose?.models?.Property || mongoose.model("Property", propertySchema);