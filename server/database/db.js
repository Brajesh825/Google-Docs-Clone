import mongoose from "mongoose";

const Connection = async(url) =>{
    try {
        await mongoose.connect(url);
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }

}

export default Connection;