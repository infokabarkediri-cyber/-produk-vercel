export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const apiResponse = await fetch('https://api.ics-store.my.id/api/reseller/products', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 9f31c11bacdcc071d6d689e21f5cef36417068fe1dd60f8f',
        'Accept': 'application/json'
      }
    });

    const textData = await apiResponse.text();
    
    // Cek apakah balasan dari server berupa JSON atau HTML/Error
    try {
      const json = JSON.parse(textData);
      return res.status(200).json(json);
    } catch (e) {
      return res.status(500).json({ error: "Server supplier tidak mengembalikan format JSON", raw: textData });
    }

  } catch (err) {
    return res.status(500).json({ error: "Gagal fetch ke server supplier", details: err.message });
  }
}
