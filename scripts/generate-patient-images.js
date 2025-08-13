/**
 * This script generates placeholder patient testimonial images
 * Run with: node scripts/generate-patient-images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Define the images we need to download
const patientImages = [
  {
    name: 'patient-aarti.jpg',
    url: 'https://placehold.co/300x300/EDE3D0/2E2A26?text=Aarti+S&font=playfair',
    dir: '../public'
  },
  {
    name: 'patient-ravi.jpg',
    url: 'https://placehold.co/300x300/EDE3D0/2E2A26?text=Ravi+K&font=playfair',
    dir: '../public'
  },
  {
    name: 'patient-meena.jpg',
    url: 'https://placehold.co/300x300/EDE3D0/2E2A26?text=Meena+P&font=playfair',
    dir: '../public'
  },
  {
    name: 'patient-suresh.jpg',
    url: 'https://placehold.co/300x300/EDE3D0/2E2A26?text=Suresh+R&font=playfair',
    dir: '../public'
  },
  {
    name: 'patient-default.jpg',
    url: 'https://placehold.co/300x300/7B8B5F/FFFFFF?text=Patient&font=playfair',
    dir: '../public'
  }
];

/**
 * Create directory if it doesn't exist
 */
function ensureDirectoryExists(dir) {
  const fullPath = path.resolve(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    console.log(`Creating directory: ${fullPath}`);
    fs.mkdirSync(fullPath, { recursive: true });
  }
}

/**
 * Download a file from URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(__dirname, filepath);
    
    // Skip if file already exists
    if (fs.existsSync(fullPath)) {
      console.log(`Image already exists: ${filepath}`);
      return resolve();
    }
    
    console.log(`Downloading: ${url} -> ${filepath}`);
    const file = fs.createWriteStream(fullPath);
    
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(fullPath, () => {}); // Delete the file if there's an error
      reject(err);
    });
  });
}

/**
 * Main function
 */
async function main() {
  try {
    // Create directories
    ensureDirectoryExists('../public');
    
    // Download all images
    for (const image of patientImages) {
      const filepath = `${image.dir}/${image.name}`;
      await downloadImage(image.url, filepath);
    }
    
    console.log('All patient images have been generated!');
  } catch (error) {
    console.error('Error generating patient images:', error);
  }
}

main();
