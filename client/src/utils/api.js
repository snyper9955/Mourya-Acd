/**
 * Centralized API configuration utility.
 * Handles API base URL and image URL formatting consistently across the app.
 */

// Get the API base URL from environment variables
// In production, if VITE_API_URL is not set, it defaults to an empty string (relative paths)
export const getApiBaseUrl = () => {
    const url = import.meta.env.VITE_API_URL || '';
    return url.replace(/\/+$/, '');
};

/**
 * Formats an image path into a full URL.
 * @param {string} imagePath - The path or URL of the image.
 * @returns {string|null} - The full URL of the image or null if path is invalid.
 */
export const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL, return it
    if (imagePath.startsWith('http')) return imagePath;
    
    // Prefix with the API base URL
    const baseUrl = getApiBaseUrl();
    
    // If baseUrl is empty, it will be a relative path which might work if served from same domain
    // but in production (Vercel/Render), VITE_API_URL should be set.
    return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};
