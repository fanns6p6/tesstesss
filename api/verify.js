export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { link } = req.body; // Menangkap link verifikasi dari frontend
  const { ZNN_ACCESS_TOKEN, AM_TOKEN, AM_API_BASE } = process.env;

  try {
    // Memasukkan link sebagai parameter GET (contoh: ?url=https://...)
    // Sesuaikan nama parameter 'url' dengan kebutuhan API api.znn.my.id jika berbeda
    const url = new URL(`${AM_API_BASE}/verify`);
    if (link) url.searchParams.append('url', link); 

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-ZNN-Access': ZNN_ACCESS_TOKEN,
        'X-AM-Token': AM_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.text();
    
    try {
      res.status(response.status).json(JSON.parse(data));
    } catch {
      res.status(response.status).send(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}