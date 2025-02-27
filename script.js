let scannedData = '';

function onScanSuccess(decodedText) {
    scannedData = decodedText;
    document.getElementById('result').innerText = `Scanned: ${decodedText}`;
}

function onScanFailure(error) {
    console.warn(`QR code scan error: ${error}`);
}

const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanFailure);

async function processPayment() {
    if (!scannedData) {
        alert("Please scan a QR code first!");
        return;
    }

    const paymentData = {
        receiver: scannedData, // Assuming the QR contains payment address/UPI
        amount: "100", // You can ask for user input here
        currency: "INR"
    };

    try {
        const response = await fetch('https://api.full2sms.in/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_FULL2SMS_API_KEY'
            },
            body: JSON.stringify(paymentData)
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert('Payment successful!');
        } else {
            alert(`Payment failed: ${result.message}`);
        }
    } catch (error) {
        console.error('Payment error:', error);
        alert('An error occurred while processing the payment.');
    }
}
