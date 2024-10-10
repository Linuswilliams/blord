import mongoose from "mongoose";

const connection = {
    isConnected: false,
};

const connectToDb = async () => {
    if (connection.isConnected) {
        console.log('Using existing connection');
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);

        connection.isConnected = db.connections[0].readyState === 1;

        console.log('DB connected successfully');
    } catch (err) {
        console.error('Error connecting to DB', err);
        throw new Error('Failed to connect to the database');
    }
};

export { connectToDb }
//clientPromise