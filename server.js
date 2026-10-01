import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Parse json with large payload limit for base64 images
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Endpoint to upload or replace header image directly from the browser
app.post('/api/upload-header', (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    const targets = [
      path.join(__dirname, 'images', 'header image.jpg'),
      path.join(__dirname, 'images', 'header.jpg'),
      path.join(__dirname, 'images', 'header-image.jpg'),
      path.join(__dirname, 'treehouse-cafe-site', 'images', 'header image.jpg'),
      path.join(__dirname, 'treehouse-cafe-site', 'images', 'header.jpg')
    ];

    targets.forEach(target => {
      try {
        fs.writeFileSync(target, buffer);
      } catch (err) {
        console.error(`Failed to write to ${target}:`, err);
      }
    });

    res.json({ success: true, message: 'Header image updated successfully!' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Serve static assets from project directory
app.use(express.static(__dirname));

// Fallback to index.html for any unhandled routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Treehouse Cafe server running at http://0.0.0.0:${PORT}`);
});
