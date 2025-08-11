# Service Images Directory

This directory should contain images for specific Ayurvedic services displayed on the website. If these images are missing, the application will use fallbacks.

## Required Service Images

For optimal display, please add the following image files to this directory:

1. `panchakarma.jpg` - Image showing Panchakarma treatment
2. `herbal-medicine.jpg` - Image showing herbal medicine preparations
3. `yoga-therapy.jpg` - Image showing yoga therapy
4. `ayurvedic-massage.jpg` - Image showing Ayurvedic massage treatment
5. `consultation.jpg` - Image showing doctor consultation
6. `neurological.jpg` - Image for neurological treatments
7. `skin-treatment.jpg` - Image for skin treatments
8. `hospital-front.jpg` - Front view of the hospital (used for SEO)

## Image Guidelines

- **Size**: Recommended 800×500 pixels (16:10 aspect ratio)
- **Format**: JPG format for better compression
- **File Size**: Optimize for web (< 200KB per image recommended)
- **Content**: Should clearly represent the specific treatment type
- **Style**: Use warm, natural lighting consistent with Ayurvedic themes

## Note About Missing Images

If any of these images are missing, the application will:
1. First try to load from the public path
2. If not found, try to load from Cloudinary backup URL
3. If still not available, fall back to the default ayurvedic herbs image

To disable remote fallbacks, you can modify `src/assets/service-images.js`.
