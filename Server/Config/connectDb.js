import mongoose from 'mongoose';

const dbName = 'Food-odering-app';

const connectDb = async ()=>{
    try{
        await mongoose.connect(`${process.env.DB_URL}/${dbName}`);
        console.log('mongoDb connected!!');
    }
    catch(e){
        console.log('Could not connect to mongoDb ----- path: Config/connectDb.js');
    }
}

export default connectDb;