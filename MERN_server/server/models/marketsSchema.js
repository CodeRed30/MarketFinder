const mongoose = require('mongoose')

const MarketsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    website: {
        type: String,
        required: false,
    },
    formatted_address: {
        type: String,
        required: false,
    },
    lat: {
        type: String,
        required: true,
    },
    lng: {
        type: String,
        required: true,
    },
    opening_hours: {
        type: String,
        required: false,
    },
    image1: {
        type: String,
        default: "",
        required: true,
    },
    image2: {
        type: String,
        default: "",
        required: false,
    },
    image3: {
        type: String,
        default: "",
        required: false,
    },
    insta_link: {
        type: String,
        required: false,
    },
    fb_link: {
        type: String,
        required: false,
    },
    twitter_link: {
        type: String,
        required: false,
    },
    verified: {
        type: Boolean,
        default: false,
    }

})

module.exports = mongoose.model('Markets', MarketsSchema)