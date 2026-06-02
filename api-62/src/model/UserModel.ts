import mongoose from "mongoose";

// _id, -v, createdAt, updatedAt
const UserSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    maidenName : {
        type: String,
        required: false,
        default: null,
    },
    lastName : {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    // birthdate:{
    //     type: Date,
    // //  optional
    //   //  required: false,
    //   // default: null,
    // },
    birthDate: Date,
    email: {
        type: String,
        required:true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum:["male", "female", "other"],
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        originalName: String,
        filename: String,
        size: Number,
        destination: String
    },
    address: {
            address: String,
            city: String,
            state: String,
            stateCode: String,
            postalCode: String,
            coordinates: {
            lat: mongoose.Types.Double,
            lng: mongoose.Types.Double,
            },
            country: String,
            },
    role: {
        type: String,
        enum: ["admin", "user", "viewer"],
        default: "user",
    }

},
{
    autoCreate: true,
    autoIndex: true,
    timestamps: true,   // createdAt, updatedAt
})

// .model("modelName") => modelNames
// .model("User") => table(Collection) => users
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;