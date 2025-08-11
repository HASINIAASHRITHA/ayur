# Doctor Images Directory

This directory should contain images for doctors displayed on the About page.

## Required Images for Current Doctors

Please add the following specific doctor images to this directory:

1. `doctor-basavaiah.jpg` - Image of Dr. Basavaiah (founder)
2. `doctor-priya.jpg` - Image of Dr. Priya Sharma (senior consultant)
3. `doctor-rajesh.jpg` - Image of Dr. Rajesh Kumar (consultant)

## Fallback Images (Required)

If specific doctor images aren't available, the application will use these fallbacks:

1. `male-doctor.jpg` - Default image for male doctors
2. `female-doctor.jpg` - Default image for female doctors

## Image Guidelines

- **Format**: Square aspect ratio (1:1)
- **Size**: At least 300×300 pixels (recommended 512×512)
- **Style**: Professional medical portrait with neutral background
- **File format**: JPG or PNG
- **File size**: Optimize for web (<200KB)

## How the Image System Works

The application will:
1. Try to load the specific doctor image
2. If not found, fall back to gender-specific image based on name
3. Finally fall back to default male doctor image if all else fails

To add temporary placeholder images while designing:
1. Find professional doctor images from stock photo sites
2. Rename them according to the naming convention
3. Place them in this directory
