import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        // required: [true, 'Name is Required']
    },
    title: {
        type: String,
        // required: [true, 'Name is Required']
    },
    disc: {
        type: String,
        // required: [true, 'Type is Required']
    },
    price: {
        type: Number,
        // required: [true, 'Type is Required']
    },
    status: {
        type: String,
        // required: [true, 'Type is Required']
    },
       
}, { timestamps: true })


export default mongoose.model('products', productSchema)