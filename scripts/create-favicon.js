/**
 * Script to create a favicon from the hospital logo
 * Run with: node scripts/create-favicon.js
 */

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const sharp = require('sharp');

// Paths
const logoPath = path.resolve(__dirname, '../src/assets/hospital-logo.jpg'); // Source hospital logo
const faviconPath = path.resolve(__dirname, '../public/favicon.ico');
const faviconPngPath = path.resolve(__dirname, '../public/favicon.png');

// Sizes for favicon
const sizes = [16, 32, 48, 64, 128, 256];

async function createFavicon() {
  try {
    console.log('Creating favicon from hospital logo...');
    
    // Check if the source image exists
    if (!fs.existsSync(logoPath)) {
      console.log('Hospital logo not found, please ensure the logo is at:', logoPath);
      // Create a directory to save the logo
      const logoDir = path.dirname(logoPath);
      if (!fs.existsSync(logoDir)) {
        fs.mkdirSync(logoDir, { recursive: true });
      }
      console.log('Please copy the hospital logo to the path above and run this script again.');
      return;
    }

    // Create a circular favicon from the logo
    const image = await loadImage(logoPath);
    const size = Math.min(image.width, image.height);
    
    // Create a canvas with the largest size
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Draw a circular clipping path
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    
    // Draw the image
    ctx.drawImage(image, 0, 0, size, size);
    
    // Save as PNG first (temp file)
    const pngBuffer = canvas.toBuffer('image/png');
    fs.writeFileSync(faviconPngPath, pngBuffer);
    console.log('Created temporary PNG favicon');
    
    // Convert to ICO with multiple sizes
    const promises = sizes.map(size => {
      return sharp(pngBuffer)
        .resize(size, size, { fit: 'contain' })
        .toBuffer();
    });
    
    const resizedBuffers = await Promise.all(promises);
    
    // Convert to ICO format
    const icoBuffer = await sharp(resizedBuffers[3]) // Use 64x64 for ICO
      .toFormat('ico')
      .toBuffer();
      
    fs.writeFileSync(faviconPath, icoBuffer);
    console.log('Created favicon.ico successfully at:', faviconPath);
    
    // Create directory for multiple favicon sizes
    const faviconDir = path.resolve(__dirname, '../public/favicon');
    if (!fs.existsSync(faviconDir)) {
      fs.mkdirSync(faviconDir, { recursive: true });
    }
    
    // Save multiple sizes
    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i];
      fs.writeFileSync(
        path.resolve(faviconDir, `favicon-${size}x${size}.png`),
        resizedBuffers[i]
      );
    }
    
    console.log('Created multiple favicon sizes in public/favicon directory');
    console.log('Favicon creation complete!');
    
  } catch (error) {
    console.error('Error creating favicon:', error);
    
    // Fallback method if canvas/sharp are not available
    console.log('Attempting fallback method...');
    
    // Create a simple, colored favicon
    const simpleCanvas = createCanvas(64, 64);
    const ctx = simpleCanvas.getContext('2d');
    
    // Fill with a green color similar to the website theme
    ctx.fillStyle = '#7B8B5F'; // Herbal green
    ctx.fillRect(0, 0, 64, 64);
    
    // Add text
    ctx.fillStyle = '#FFFFFF'; // White text
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Dr.B', 32, 38);
    
    // Save the simple favicon
    const simpleBuffer = simpleCanvas.toBuffer('image/png');
    fs.writeFileSync(faviconPath, simpleBuffer);
    console.log('Created a simple fallback favicon.');
  }
}

createFavicon();
