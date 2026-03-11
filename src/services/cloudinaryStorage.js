import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a single file buffer to Cloudinary
 * @param {object} file - multer file object (from memoryStorage)
 * @param {string} folder - Folder in Cloudinary (e.g. 'profile_images')
 * @returns {Promise<string>} Public URL
 */
export const uploadFileToCloudinary = (file, folder = 'uploads') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(file.buffer);
  });
};

/**
 * Upload multiple files to Cloudinary
 * @param {Array} files - Array of multer file objects
 * @param {string} folder - Folder in Cloudinary
 * @returns {Promise<string[]>} Array of public URLs
 */
export const uploadFilesToCloudinary = async (files, folder = 'uploads') => {
  if (!files || files.length === 0) return [];
  return Promise.all(files.map((file) => uploadFileToCloudinary(file, folder)));
};
