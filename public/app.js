// Tombol 2: Verify Link
document.getElementById('btn-verify').addEventListener('click', () => {
    const linkValue = document.getElementById('verify-input').value.trim(); // hapus spasi berlebih
    const emailValue = document.getElementById('email-input').value.trim(); // ambil email otomatis & hapus spasi
    
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