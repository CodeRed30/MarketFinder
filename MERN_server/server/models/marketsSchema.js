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
    weekday_text: {
        type: Array,
        required: false,
    },
    image: {
        type: String,
        default: '',
        required: true
    }


})

module.exports = mongoose.model('Markets', MarketsSchema)