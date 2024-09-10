import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log('connected to DB');
        
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDb;