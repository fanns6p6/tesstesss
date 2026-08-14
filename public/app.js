// Fungsi mengirim request dengan payload JSON ke internal API
async function callInternalApi(endpoint, payload) {
    const outputBox = document.getElementById('response-output');
    outputBox.textContent = `Memproses request ke ${endpoint}...\nMohon tunggu...`;

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

// Tombol 1: Send Email
document.getElementById('btn-send').addEventListener('click', () => {
    const emailValue = document.getElementById('email-input').value;
    
    if (!emailValue) {
        alert("Harap masukkan email terlebih dahulu!");
        return;
    }
    
    // Kirim email ke Vercel backend (/api/send)
    callInternalApi('/api/send', { email: emailValue });
});

// Tombol 2: Verify Link
document.getElementById('btn-verify').addEventListener('click', () => {
    const linkValue = document.getElementById('verify-input').value;
    const emailValue = document.getElementById('email-input').value; // Mengambil email otomatis
    
    if (!linkValue) {
        alert("Harap tempel link verifikasi terlebih dahulu!");
        return;
    }
    
    if (!emailValue) {
        alert("Email kosong! Pastikan kolom email di atas terisi agar verifikasi berhasil.");
        return;
    }
    
    // Kirim link DAN email ke Vercel backend (/api/verify)
    callInternalApi('/api/verify', { link: linkValue, email: emailValue });
});