import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Parse json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from project directory
app.use(express.static(__dirname));

// Fallback to index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Treehouse Cafe server running at http://0.0.0.0:${PORT}`);
});
