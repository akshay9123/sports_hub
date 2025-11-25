import mongoose from "mongoose";

const connectDb = async() =>{
    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log("Issue in database connection", error)
    
    }
}

export default connectDb