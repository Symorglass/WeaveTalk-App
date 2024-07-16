 import mongoose from 'mongoose';

 let isConnected = false; // variable to check if mongoose is connected

 export const connectToDB = async () => {
    mongoose.set('strictQuery', true);  // prevent unknow field queries
    
    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL not found'); // check .env.local if there is mongoDB url to connect to 
    if(isConnected) return console.log('Already connected to MongoDB');

    try {
        await mongoose.connect(process.env.MONGODB_URL); // MONGODB_URL is in .env.local
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
 }