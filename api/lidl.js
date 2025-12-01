import cheerio from "cheerio";

export default async function handler(req, res) {
  const query = req.query.search || "";

  try {
    const url = `https://www.lidl.ie/search?query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const products = [];

    $(".product-grid__item").each((_, el) => {
      const name = $(el).find(".product__name").text().trim();
      const price = $(el).find(".pricebox__price").text().trim();
      const image = $(el).find("img").attr("src");

      if (name && price) {
        products.push({ name, price, image });
      }
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Lidl scraper failed" });
  }
}
