// Fungsi mengirim request dengan payload JSON ke internal API
async function callInternalApi(endpoint, payload) {
    const outputBox = document.getElementById('response-output');
    outputBox.textContent = `Memproses ${endpoint}...\nMohon tunggu...`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const contentType = response.headers.get("content-type") || "";
        
        let data;
        if (contentType.includes("application/json")) {
            data = await response.json();
            outputBox.textContent = JSON.stringify(data, null, 2);
        } else {
            data = await response.text();
            outputBox.textContent = data;
        }

    } catch (error) {
        outputBox.textContent = `Error: ${error.message}`;
    }
}

// Event Listeners untuk Tombol
document.getElementById('btn-send').addEventListener('click', () => {
    const emailValue = document.getElementById('email-input').value;
    
    if (!emailValue) {
        alert("Harap masukkan email terlebih dahulu!");
        return;
    }
    
    // Kirim email ke /api/send
    callInternalApi('/api/send', { email: emailValue });
});

document.getElementById('btn-verify').addEventListener('click', () => {
    const linkValue = document.getElementById('verify-input').value;
    
    if (!linkValue) {
        alert("Harap tempel link verifikasi terlebih dahulu!");
        return;
    }
    
    // Kirim link ke /api/verify
    callInternalApi('/api/verify', { link: linkValue });
});