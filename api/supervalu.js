import cheerio from "cheerio";

export default async function handler(req, res) {
  const query = req.query.search || "";

  try {
    const url = `https://shop.supervalu.ie/shopping/search/allaisles?q=${encodeURIComponent(query)}`;
    const response = await fetch(url);

    const html = await response.text();
    const $ = cheerio.load(html);

    const products = [];

    $(".product-list-item").each((_, el) => {
      const name = $(el).find(".product-list-item-details-title").text().trim();
      const price = $(el).find(".product-list-item-price-per-sellable-unit").text().trim();
      const image = $(el).find("img").attr("src");

      if (name && price) {
        products.push({ name, price, image });
      }
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "SuperValu scraper failed" });
  }
}
