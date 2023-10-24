import mongoose from "mongoose";

const connectDB = async () => {
    try {
         await mongoose.connect(process.env.MongoKey)
        console.log("CONNECT DATABASE")
    } catch (error) {
        console.log(error)
    }
}
export default connectDB;