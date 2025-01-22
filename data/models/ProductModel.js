import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    stock: {
        type: Number,
        default: 0,
        required: true
    },
    category: {
        type: String,
        default: "general",
        required: true
    },
    image: {
        type: String,
    }
}, {
    timestamps: true
});

export default mongoose.model("Product", productSchema);