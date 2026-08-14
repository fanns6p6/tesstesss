async function callInternalApi(endpoint, payload) {
    const outputBox = document.getElementById('response-output');
    outputBox.textContent = `Memproses ke server...\nMohon tunggu sebentar...`;

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
        outputBox.textContent = `Terjadi Kesalahan: ${error.message}`;
    }
}

// Tombol Send: Kirim email dan simpan otomatis di memori browser (Session Storage)
document.getElementById('btn-send').addEventListener('click', () => {
    const emailValue = document.getElementById('email-input').value.trim();
    
    if (!emailValue) {
        alert("Harap masukkan email terlebih dahulu!");
        return;
    }
    
    // Simpan email secara otomatis ke memori lokal browser
    sessionStorage.setItem('saved_email', emailValue);
    
    callInternalApi('/api/send', { email: emailValue });
});

// Tombol Verify: Ambil otomatis email yang tadi disimpan, gabungkan dengan link
document.getElementById('btn-verify').addEventListener('click', () => {
    const linkValue = document.getElementById('verify-input').value.trim();
    
    // Ambil email yang otomatis tersimpan dari proses 'Send' sebelumnya
    const emailValue = sessionStorage.getItem('saved_email');
    
    if (!linkValue) {
        alert("Harap tempel link verifikasi terlebih dahulu!");
        return;
    }
    
    if (!emailValue) {
        alert("Email tidak ditemukan! Harap lakukan proses 'Request Link' (Send) terlebih dahulu dengan email yang sama.");
        return;
    }
    
    // Kirim link dan email otomatis ke backend
    callInternalApi('/api/verify', { link: linkValue, email: emailValue });
});