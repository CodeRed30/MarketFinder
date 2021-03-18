const mongoose = require('mongoose')

const MarketsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('Markets', MarketsSchema)