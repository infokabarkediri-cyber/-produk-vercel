export default async function handler(req, res) {
  // Hanya izinkan method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', keterangan: 'Method not allowed' });
  }

  const { nomer } = req.body;

  if (!nomer) {
    return res.status(400).json({ status: 'error', keterangan: 'Nomor wajib diisi' });
  }

  const MAYUGORO_CONFIG = {
    baseUrl: "https://api.mayugoro.com",
    apiKey: "mayu_262794d5d80f0d65359b3d0834bae55c73cb55ed793dae58ed8f46493027b5c5",
    xClient: "9951786330457fbb6300783a",
    xPak: "3e8d4a7c1f9b2d6e5a8c3f7b1d4e9a2c6f8d3e1b5a7c9d2e4f6a8b1c3d5e7f9"
  };

  try {
    const response = await fetch(`${MAYUGORO_CONFIG.baseUrl}/api/v1/sidompul/cek`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + MAYUGORO_CONFIG.apiKey,
        'X-Client': MAYUGORO_CONFIG.xClient,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        nomer: nomer,
        "x-pak": MAYUGORO_CONFIG.xPak
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ 
      status: 'error', 
      keterangan: 'Gagal menghubungi server Mayugoro: ' + error.message 
    });
  }
}
