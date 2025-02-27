const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Server is working! 🚀');
});

// Full2SMS API route
app.post('/api/pay', async (req, res) => {
    const { amount, mobile } = req.body;
    const guid = Math.random().toString(36).substring(2, 15);

    const FULL2SMS_API = 'https://full2sms.in/api/v2/payout';
    const MID = 'YOUR_MERCHANT_ID';
    const MKEY = 'YOUR_API_KEY';

    const url = `${FULL2SMS_API}?mid=${MID}&mkey=${MKEY}&guid=${guid}&type=wallet&amount=${amount}&mobile=${mobile}&info=Payment`;

    try {
        const response = await fetch(url, { method: 'POST' });
        const data = await response.json();
        res.json({ status: data.status, message: data.message });
    } catch (error) {
        console.error('Payment failed:', error);
        res.status(500).json({ status: 'error', message: 'Payment failed' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
