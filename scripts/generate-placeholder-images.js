/**
 * This script generates placeholder images for development purposes
 * Run with: node scripts/generate-placeholder-images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Define the images we need to download
const placeholderImages = [
  {
    name: 'hospital-logo.jpg',
    url: 'https://placehold.co/400x400/7B8B5F/FFFFFF?text=Dr.+Basavaiah+Ayurveda+Hospital&font=playfair',
    dir: '../src/assets'
  },
  {
    name: 'ayurvedic-herbs.jpg',
    url: 'https://placehold.co/800x500/EDE3D0/2E2A26?text=Ayurvedic+Herbs&font=playfair',
    dir: '../src/assets'
  },
  {
    name: 'treatment-room.jpg',
    url: 'https://placehold.co/800x600/EDE3D0/2E2A26?text=Treatment+Room&font=playfair',
    dir: '../src/assets'
  },
  {
    name: 'panchakarma.jpg',
    url: 'https://placehold.co/800x500/EDE3D0/2E2A26?text=Panchakarma+Treatment&font=playfair',
    dir: '../src/assets'
  },
  {
    name: 'herbal-medicine.jpg',
    url: 'https://placehold.co/800x500/EDE3D0/2E2A26?text=Herbal+Medicine&font=playfair',
    dir: '../src/assets'
  },
  {
    name: 'hospital-front.jpg',
    url: 'https://placehold.co/800x500/7B8B5F/FFFFFF?text=Hospital+Front+View&font=playfair',
    dir: '../public/service-images'
  },
  {
    name: 'yoga-therapy.jpg',
    url: 'https://placehold.co/800x500/EDE3D0/2E2A26?text=Yoga+Therapy&font=playfair',
    dir: '../public/service-images'
  },
  {
    name: 'ayurvedic-massage.jpg',
    url: 'https://placehold.co/800x500/EDE3D0/2E2A26?text=Ayurvedic+Massage&font=playfair',
    dir: '../public/service-images'
  },
  {
    name: 'consultation.jpg',
    url: 'https://placehold.co/800x500/EDE3D0/2E2A26?text=Doctor+Consultation&font=playfair',
    dir: '../public/service-images'
  },
  {
    name: 'neurological.jpg',
    url: 'https://placehold.co/800x500/EDE3D0/2E2A26?text=Neurological+Treatment&font=playfair',
    dir: '../public/service-images'
  },
  {
    name: 'skin-treatment.jpg',
    url: 'https://placehold.co/800x500/EDE3D0/2E2A26?text=Skin+Treatment&font=playfair',
    dir: '../public/service-images'
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
    ensureDirectoryExists('../src/assets');
    ensureDirectoryExists('../public/service-images');
    
    // Download all images
    for (const image of placeholderImages) {
      const filepath = `${image.dir}/${image.name}`;
      await downloadImage(image.url, filepath);
    }
    
    console.log('All placeholder images have been generated!');
  } catch (error) {
    console.error('Error generating placeholder images:', error);
  }
}

main();
