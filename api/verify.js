export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { link, email } = req.body; 
  const { ZNN_ACCESS_TOKEN, AM_TOKEN } = process.env;

  try {
    // 1. Ambil link utuh yang ditempel oleh user dari kotak input
    const url = new URL(link);
    
    // 2. Otomatis sisipkan parameter email ke dalam link tersebut
    if (email) {
      url.searchParams.set('email', email.trim()); 
    }

    // 3. Eksekusi URL yang sudah digabung dengan email tersebut
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