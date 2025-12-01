export default async function handler(req, res) {
  const query = req.query.search || "";

  try {
    const response = await fetch(
      `https://api.tesco.com/product/?query=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    const results = data.products.map(item => ({
      name: item.name,
      price: item.price,
      image: item.image
    }));

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Tesco API failed" });
  }
}
