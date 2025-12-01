import cheerio from "cheerio";

export default async function handler(req, res) {
  const query = req.query.search || "";

  try {
    // Proxy to bypass blocking
    const proxy = "https://api.allorigins.win/raw?url=";

    // Dunnes search URL
    const url =
      "https://www.dunnesstoresgrocery.com/sm/delivery/rs?q=" +
      encodeURIComponent(query);

    // Fetch through proxy
    const response = await fetch(proxy + encodeURIComponent(url));
    const html = await response.text();

    const $ = cheerio.load(html);
    const products = [];

    $(".product-list-item").each((_, el) => {
      const name = $(el)
        .find(".product-list-item-details-title")
        .text()
        .trim();

      const price = $(el)
        .find(".product-list-item-price-per-sellable-unit")
        .text()
        .trim();

      const image = $(el).find("img").attr("src");

      if (name && price) {
        products.push({
          name,
          price,
          image: image
            ? "https://www.dunnesstoresgrocery.com" + image
            : null,
        });
      }
    });

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dunnes scraper failed" });
  }
}
