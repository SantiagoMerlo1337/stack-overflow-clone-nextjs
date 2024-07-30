import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URL) {
        console.error("MISSING MONGODB_URL");
        throw new Error("MONGODB_URL is not defined in environment variables");
    }

    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "devoverflow",
        });
        isConnected = true;
        console.log("MongoDB is connected");
    } catch (error) {
        console.error("MongoDB connection failed", error);
        throw error;
    }
};
