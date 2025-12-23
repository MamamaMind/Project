import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },
    roomName: {type: String, required: true},
    roomType: {type: String, required: true},
    pricePerNight: {type: Number, required: true},
    amenities: {type: Array, required: true},
    images: [{type: String}],
    isAvailable: {type: Boolean, default: true},
    description: {type: String},
}, {timestamps: true});

const Room = mongoose.model("Room", roomSchema);

export default Room;