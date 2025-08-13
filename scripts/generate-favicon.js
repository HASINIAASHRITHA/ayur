/**
 * This script generates a simple favicon.ico file for the site
 * Run with: node scripts/generate-favicon.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const faviconUrl = 'https://placehold.co/64x64/7B8B5F/FFFFFF.png?text=AH';
const faviconPath = path.resolve(__dirname, '../public/favicon.ico');

// Skip if file already exists
if (fs.existsSync(faviconPath)) {
  console.log('Favicon already exists');
  process.exit(0);
}

console.log(`Downloading favicon from ${faviconUrl}`);
const file = fs.createWriteStream(faviconPath);

https.get(faviconUrl, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Favicon created successfully!');
  });
}).on('error', (err) => {
  fs.unlink(faviconPath, () => {});
  console.error('Error generating favicon:', err);
});
