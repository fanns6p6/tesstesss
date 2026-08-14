export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { link, email } = req.body; 
  const { ZNN_ACCESS_TOKEN, AM_TOKEN } = process.env;

  try {
    // Memastikan link valid
    const targetUrl = new URL(link);
    
    // Otomatis suntikkan parameter email ke link verifikasi
    if (email) {
      targetUrl.searchParams.set('email', email.trim());
    }

    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        'X-ZNN-Access': ZNN_ACCESS_TOKEN || '',
        'X-AM-Token': AM_TOKEN || '',
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