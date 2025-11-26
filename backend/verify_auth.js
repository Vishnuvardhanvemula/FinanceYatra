import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

async function testAuth() {
    const timestamp = Date.now();
    const email = `authtest_${timestamp}@example.com`;
    const password = 'password123';
    const name = 'Auth Test User';

    console.log('🚀 Starting Authentication System Verification...');
    console.log(`📧 Testing with email: ${email}`);

    try {
        // 1. Register
        console.log('\n1️⃣  Testing Registration...');
        const registerRes = await axios.post(`${API_URL}/register`, {
            email,
            password,
            name
        });

        if (registerRes.data.success) {
            console.log('✅ Registration successful!');
        } else {
            console.error('❌ Registration failed:', registerRes.data);
            process.exit(1);
        }

        // 2. Login
        console.log('\n2️⃣  Testing Login...');
        const loginRes = await axios.post(`${API_URL}/login`, {
            email,
            password
        });

        if (loginRes.data.success) {
            console.log('✅ Login successful!');
            const token = loginRes.data.data.token;
            console.log('🔑 Token received');

            // 3. Access Protected Route
            console.log('\n3️⃣  Testing Protected Route (Profile)...');
            const profileRes = await axios.get(`${API_URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (profileRes.data.success) {
                console.log('✅ Profile access successful!');
                console.log(`👤 User: ${profileRes.data.data.name} (${profileRes.data.data.email})`);
            } else {
                console.error('❌ Profile access failed:', profileRes.data);
                process.exit(1);
            }

            // 4. Logout (Client-side mainly, but hitting endpoint)
            console.log('\n4️⃣  Testing Logout...');
            const logoutRes = await axios.post(`${API_URL}/logout`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (logoutRes.data.success) {
                console.log('✅ Logout successful!');
            }

        } else {
            console.error('❌ Login failed:', loginRes.data);
            process.exit(1);
        }

        console.log('\n✨ Authentication System Verified: ALL SYSTEMS GO');

    } catch (error) {
        console.error('\n❌ Verification Failed:', error.response ? error.response.data : error.message);
        process.exit(1);
    }
}

testAuth();
