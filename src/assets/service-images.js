// Helper module for managing service images

// Import only the image we know exists
import ayurvedicHerbs from './ayurvedic-herbs.jpg';

// Define service image mapping with fallbacks
const serviceImages = {
  // Default/fallback image
  default: ayurvedicHerbs,
  
  // Service-specific images from public folder (these don't require imports)
  panchakarma: '/service-images/panchakarma.jpg',
  herbal: '/service-images/herbal-medicine.jpg',
  yoga: '/service-images/yoga-therapy.jpg',
  massage: '/service-images/ayurvedic-massage.jpg',
  consultation: '/service-images/consultation.jpg',
  neurological: '/service-images/neurological.jpg',
  skincare: '/service-images/skin-treatment.jpg',
};

// Cloudinary backup URLs if local images aren't available
const cloudinaryBackups = {
  panchakarma: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1715968400/ayurveda/panchakarma.jpg',
  herbal: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1715968400/ayurveda/herbal-medicine.jpg',
  yoga: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1715968400/ayurveda/yoga-therapy.jpg',
  massage: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1715968400/ayurveda/ayurvedic-massage.jpg',
  consultation: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1715968400/ayurveda/consultation.jpg',
};

/**
 * Get the appropriate image for a service based on its title/description
 * @param {string} serviceTitle - The title of the service
 * @returns {string} - URL to the appropriate image
 */
export const getServiceImage = (serviceTitle = '') => {
  const title = serviceTitle.toLowerCase();
  
  // Try to match the service title with our image categories
  if (title.includes('panchakarma')) return serviceImages.panchakarma;
  if (title.includes('herb') || title.includes('medicine')) return serviceImages.herbal;
  if (title.includes('yoga')) return serviceImages.yoga;
  if (title.includes('massage')) return serviceImages.massage;
  if (title.includes('consult')) return serviceImages.consultation;
  if (title.includes('neuro')) return serviceImages.neurological;
  if (title.includes('skin')) return serviceImages.skincare;
  
  // Default fallback
  return serviceImages.default;
};

/**
 * Try loading an image with fallbacks
 * @param {string} imageKey - Key for the image to load
 * @returns {Promise<string>} - URL to the successfully loaded image
 */
export const tryLoadImage = async (imageKey) => {
  // First try the local path
  const localPath = serviceImages[imageKey] || serviceImages.default;
  
  try {
    // Check if the image exists
    const response = await fetch(localPath, { method: 'HEAD' });
    if (response.ok) {
      return localPath;
    }
    
    // If local fails, try cloudinary backup
    if (cloudinaryBackups[imageKey]) {
      return cloudinaryBackups[imageKey];
    }
  } catch (e) {
    console.warn(`Failed to load image for ${imageKey}, using default`);
  }
  
  // Ultimate fallback
  return serviceImages.default;
};

export default serviceImages;
