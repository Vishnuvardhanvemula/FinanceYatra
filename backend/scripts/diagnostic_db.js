
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env from backend root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const mongoUri = process.env.MONGODB_URI;

console.log('\n🔍 --- MongoDB Connection Diagnostic ---');

if (!mongoUri) {
    console.error('❌ Error: MONGODB_URI is undefined in .env file');
    process.exit(1);
}

// Mask password for display
const maskedUri = mongoUri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/, '$1****$3');
console.log(`📡 Attempting to connect to: ${maskedUri}`);

async function testConnection() {
    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000 // Fail fast (5s)
        });
        console.log('✅ Connection Sucessful!');
        console.log('ℹ️  Database is accessible and credentials are correct.');
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Connection Failed!');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);

        if (error.message.includes('bad auth')) {
            console.log('\n💡 Tip: Check your username and password in .env');
        } else if (error.message.includes('queryTxt ETIMEOUT')) {
            console.log('\n💡 Tip: This is often a DNS or Network issue. Check your internet connection.');
        } else if (error.message.includes('Cluster is not reachable') || error.name === 'MongooseServerSelectionError') {
            console.log('\n💡 Tip: IP Whitelist issue? If using Atlas, ensure your current IP is whitelisted (or 0.0.0.0/0).');
        }

        process.exit(1);
    }
}

testConnection();
