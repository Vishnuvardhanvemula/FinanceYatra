import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const adminEmail = 'admin@gmail.com';
        const adminPassword = 'admin'; // Simple password for demo
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin user already exists.');
            // Update to ensure isAdmin is true
            existingAdmin.isAdmin = true;
            existingAdmin.password = hashedPassword; // Reset password just in case
            await existingAdmin.save();
            console.log('Admin privileges and password updated.');
        } else {
            const newAdmin = new User({
                name: 'System Admin',
                email: adminEmail,
                password: hashedPassword,
                isAdmin: true,
                rank: 'Legendary', // Give admin some flair
                xp: 99999,
                streak: 100
            });

            await newAdmin.save();
            console.log('Admin user created successfully.');
        }

        console.log('-----------------------------------');
        console.log('Admin Credentials:');
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        console.log('-----------------------------------');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
