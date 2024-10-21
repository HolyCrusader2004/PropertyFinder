const mongoose = require('mongoose')
const propertySchema = new mongoose.Schema({
    userEmail : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true,
    },
    streetAddress : {
        type: String,
        required: true
    },
    typeOfPlace : {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    province : {
        type: String,
        required: true
    },
    country : {
        type: String,
        required: true
    },
    rooms : {
        type: Number,
        required: true
    },
    guests : {
        type: Number,
        required: true
    },
    bathrooms : {
        type: Number,
        required: true
    },
    beds : {
        type: Number,
        required: true
    },
    amenities : {
        type: Array,
        default: [{}]
    },
    imagePaths : {
        type: Array,
        default: [{}]
    },
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    highlightDesc : {
        type: String,
        required: true
    },
    highlight : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
},{timestamps: true})

const Property = mongoose.model('Property', propertySchema)
module.exports = Property