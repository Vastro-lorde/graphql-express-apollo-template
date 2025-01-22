import mongoose from "mongoose";
import { comparePassword, hashPassword } from "./hooks.js";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        maxlength: 255,
        required: true 
    },
    email: { 
        type: String, 
        maxlength: 255,
        required: true, 
        unique: true 
    },
    age: { 
        type: Number 
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 64,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    long: {
        type: Number,
        default: 0,
        required: true
    },
    lat: {
        type: Number,
        default: 0,
        required: true
    },
}, {
    timestamps: true,
    timeseries: true
});

userSchema.pre('save', hashPassword);
  
userSchema.methods.comparePassword = comparePassword;

export default mongoose.model("User", userSchema);