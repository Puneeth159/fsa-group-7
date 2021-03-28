const mongoose = require("mongoose")

const LocationSchema = new mongoose.Schema({
    locationName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    latitude: {
        type: String,
        required: true,
        trim: true
    },
    longitude: {
        type: String,
        required: true,
        trim: true
    },
    radius: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model("Location", LocationSchema)