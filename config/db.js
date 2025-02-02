const mongoose= require('mongoose');

const config= require('config');
const db=config.get('mongoURI');

const connectDB= async()=>{
    try{
        await mongoose.connect(db,
            // useNewUrlParser: true,
            // useCreateIndex: true
            //these things are not longer needed from mongoose 6
            //by default they are true
        );
        console.log("mongoDB connecting..")
    } catch(err){
        console.log(err.message);
        //Exit process with failure
        process.exit(1);
    }
};
module.exports= connectDB;
