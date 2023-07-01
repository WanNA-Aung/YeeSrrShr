const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    profilePath: {
        type: String
    },
    images: {
        type: [String]
    },
    address: {
        state: {
            type: String
        },
        city: {
            type: String
        }
    },
    height: {
        type: Number
    },
    gender: {
        type: String
    },
    birthday: {
        type: Date
    },
    work: {
        type: String
    },
    relationship: {
        type: String
    },
    education: {
        type: String
    },
    intrerests: {
        type: [String]
    },
    smoke: {
        type: Boolean
    },
    drink: {
        type: Boolean
    },
    bodyType: {
        type: String
    }
}
, {
    timestamps: true
})

module.exports = mongoose.model("User", UserSchema)