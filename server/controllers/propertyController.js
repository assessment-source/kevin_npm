const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "../data/properties.json");

function readProperties() {
  return JSON.parse(fs.readFileSync(dataFile, "utf8"));
}

function fundedPercent(property) {
  return parseInt(property.metrics.funded, 10);
}

function applyFilters(properties, query) {
  let items = properties.slice();
  const { type, location, minRoi, maxRoi, funding, sort } = query;

  if (type && type !== "all") {
    items = items.filter((property) => property.type === type);
  }
  if (location) {
    const needle = String(location).toLowerCase();
    items = items.filter((property) => property.location.toLowerCase().includes(needle));
  }
  if (minRoi) {
    items = items.filter((property) => parseFloat(property.roi) >= parseFloat(minRoi));
  }
  if (maxRoi) {
    items = items.filter((property) => parseFloat(property.roi) <= parseFloat(maxRoi));
  }
  if (funding === "new") {
    items = items.filter((property) => fundedPercent(property) <= 30);
  }
  if (funding === "active") {
    items = items.filter((property) => {
      const funded = fundedPercent(property);
      return funded >= 30 && funded < 90;
    });
  }
  if (funding === "almostFunded") {
    items = items.filter((property) => fundedPercent(property) >= 90);
  }

  if (sort === "priceAsc") items.sort((a, b) => a.price.usd - b.price.usd);
  if (sort === "priceDesc") items.sort((a, b) => b.price.usd - a.price.usd);
  if (sort === "roiDesc") items.sort((a, b) => parseFloat(b.roi) - parseFloat(a.roi));
  if (sort === "fundingDesc") items.sort((a, b) => fundedPercent(b) - fundedPercent(a));

  return items;
}

exports.listProperties = (req, res) => {
  const data = applyFilters(readProperties(), req.query);
  res.json({ data, meta: { count: data.length } });
};

exports.getProperty = (req, res) => {
  const property = readProperties().find((item) => String(item.id) === String(req.params.id));
  if (!property) {
    return res.status(404).json({ error: { message: "Property not found" } });
  }
  res.json({ data: property });
};
