import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI

export const connect = () => {

    if(mongoose.connection.readyState){
    //    return console('already connected')
    }else{
       return mongoose.connect(MONGODB_URI);
        // return console.log("done")
    }
};
