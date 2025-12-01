export default async function handler(req, res) {
  const query = req.query.search || "";

  try {
    const response = await fetch(
      `https://dev.tescolabs.com/grocery/products/?query=${encodeURIComponent(query)}`,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": "demo"
        }
      }
    );

    const data = await response.json();

    const results =
      data.uk?.ghs?.products?.results?.map((item) => ({
        name: item.name,
        price: item.price,
        image: item.image
      })) || [];

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Tesco API failed" });
  }
}

