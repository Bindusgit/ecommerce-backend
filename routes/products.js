import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Read products from JSON file
function getProducts() {
  try {
    const productsPath = path.join(__dirname, '../backend/products.json');
    const data = fs.readFileSync(productsPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading products:', err);
    return [];
  }
}

router.get('/', (req, res) => {
  try {
    const search = req.query.search;
    let products = getProducts();

    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      products = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(lowerCaseSearch);
        const keywordsMatch = product.keywords && product.keywords.some(keyword => 
          keyword.toLowerCase().includes(lowerCaseSearch)
        );
        return nameMatch || keywordsMatch;
      });
    }

    res.json(products);
  } catch (err) {
    console.error('Error in products route:', err);
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

export default router;