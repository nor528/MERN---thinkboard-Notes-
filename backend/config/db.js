import mongoose from 'mongoose';
import { Resolver } from 'dns';
import { promisify } from 'util';

// Force Node.js to use Cloudflare DNS directly
const resolver = new Resolver();
resolver.setServers(['1.1.1.1', '1.0.0.1']);

// Monkey-patch DNS lookup
import { setServers } from 'dns';
setServers(['1.1.1.1', '1.0.0.1']);

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            family: 4,
        });
        console.log("🚀 Connected to MongoDB Atlas Successfully!");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB Atlas:", error.message);
        process.exit(1);
    }
}