import mongoose from 'mongoose';
import { config } from 'dotenv';
config();


async function connect(){
    try{
    await mongoose.connect(process.env.mongodb);
    console.log("Database connected");
    }catch(err){
        console.log("database connection error: ",err);
    }
}

export default connect;