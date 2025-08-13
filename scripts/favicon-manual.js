/**
 * This script creates a basic favicon for the application
 * Run with: node scripts/favicon-manual.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Destination path for the favicon
const faviconPath = path.resolve(__dirname, '../public/favicon.ico');
const faviconDir = path.dirname(faviconPath);

// Create the directory if it doesn't exist
if (!fs.existsSync(faviconDir)) {
  fs.mkdirSync(faviconDir, { recursive: true });
}

// Function to download a file
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
        console.log(`File downloaded to ${dest}`);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

// Create a placeholder favicon that resembles the provided logo
async function createPlaceholderFavicon() {
  console.log('Creating a placeholder favicon that resembles the provided logo...');
  
  // URL for a placeholder favicon with colors matching the logo
  const faviconUrl = 'https://img.icons8.com/color/96/000000/lotus.png';
  
  try {
    await downloadFile(faviconUrl, faviconPath);
    console.log('Placeholder favicon created successfully!');
  } catch (error) {
    console.error('Error creating placeholder favicon:', error);
    console.log('Please manually add a favicon.ico file to the public directory.');
  }
}

createPlaceholderFavicon();
