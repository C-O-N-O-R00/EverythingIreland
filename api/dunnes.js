export default async function handler(req, res) {
  const query = req.query.search || "";

  try {
    const url = `https://www.dunnesstoresgrocery.com/api/search?search_term=${encodeURIComponent(
      query
    )}&page=1`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results?.map((item) => ({
      name: item?.product?.name,
      price: item?.product?.price,
      image: item?.product?.image_uri
        ? `https://www.dunnesstoresgrocery.com${item.product.image_uri}`
        : null
    })) || [];

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Dunnes scraper failed" });
  }
}
