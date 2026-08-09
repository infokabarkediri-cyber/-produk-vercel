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

    const result = await apiResponse.json();
    const listArray = Array.isArray(result.data) ? result.data : (Array.isArray(result) ? result : []);

    const products = listArray.map(item => ({
      code: item.code || item.product_code || "-",
      name: item.name || item.product_name || "Produk",
      type: item.category || item.type || "Regular",
      quota: item.description || item.note || "-",
      stock: item.stock !== undefined ? Number(item.stock) : 0,
      price: item.price || 0,
      area: "Semua Area"
    }));

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: "Gagal mengambil data dari supplier", details: err.message });
  }
}
