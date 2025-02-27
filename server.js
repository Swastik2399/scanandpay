let scannedData = '';

function onScanSuccess(decodedText) {
    scannedData = decodedText;
    document.getElementById('result').innerText = `Scanned: ${decodedText}`;
}

function onScanFailure(error) {
    console.warn(`QR scan error: ${error}`);
}

const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanFailure);

async function payNow() {
    const amount = document.getElementById('amount').value;

    if (!scannedData) {
        alert('Please scan a QR code first!');
        return;
    }

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount!');
        return;
    }

    const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scannedData, amount })
    });

    const result = await response.json();
    alert(result.message);
}
