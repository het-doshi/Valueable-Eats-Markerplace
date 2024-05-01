import mongoose from "mongoose";

const connectdb = (uri) =>{
     return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } )
} 

export default connectdb