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
    const emailInput = document.getElementById('email-input');
    const emailValue = emailInput.value.trim();
    
    if (!emailValue) {
        alert("Harap masukkan email terlebih dahulu!");
        return;
    }
    
    // OTOMATIS SIMPAN: Simpan email ke memory browser (sessionStorage) saat tombol Send diklik
    sessionStorage.setItem('last_sent_email', emailValue);
    
    // Kirim email ke Vercel backend (/api/send)
    callInternalApi('/api/send', { email: emailValue });
});

// Tombol 2: Verify Link
document.getElementById('btn-verify').addEventListener('click', () => {
    const linkValue = document.getElementById('verify-input').value.trim();
    
    // AMBIL OTOMATIS: Utamakan mengambil email dari penyimpanan otomatis, atau dari kotak input jika masih ada
    let emailValue = sessionStorage.getItem('last_sent_email');
    
    if (!emailValue) {
        const emailInput = document.getElementById('email-input');
        if (emailInput) emailValue = emailInput.value.trim();
    }
    
    if (!linkValue) {
        alert("Harap tempel link verifikasi terlebih dahulu!");
        return;
    }
    
    if (!emailValue) {
        alert("Email tidak ditemukan! Harap masukkan dan kirim email terlebih dahulu di bagian atas.");
        return;
    }
    
    // Opsional: Otomatis isi juga teks di input email supaya user bisa lihat
    const emailInput = document.getElementById('email-input');
    if (emailInput && !emailInput.value) {
        emailInput.value = emailValue;
    }
    
    // Kirim link DAN email otomatis ke Vercel backend (/api/verify)
    callInternalApi('/api/verify', { link: linkValue, email: emailValue });
});