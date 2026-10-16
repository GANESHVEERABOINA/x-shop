import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("DB Connected");
    })

    // Permanent fix: URL lo database peru marichina, eppudu 'xshop' ke connect avuthundi
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "xshop"
    })

}

export default connectDB;
