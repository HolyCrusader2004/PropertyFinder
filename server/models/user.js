const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    profileImage : {
        type: String,
        default: ''
    },
    tripList : {
        type: [
            {
            propertyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Property",
            },
            startDate: Date,
            endDate: Date,
            totalPrice: Number,
            ownerEmail: String
            }
          ],
        default: []
    },
    reservationList : {
        type: [
            {
            propertyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Property",
            },
            startDate: Date,
            endDate: Date,
            totalPrice: Number,
            customerEmail: String
            }
          ],
        default: []
    },
    wishList : {
        type: [
            {
            propertyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Property",
            }
            }
          ],
        default: []
    },
    propertyList : {
        type: [
            {
            propertyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Property",
            }
            }
          ],
        default: []
    }
},{timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User