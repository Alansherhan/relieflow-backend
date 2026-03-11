import multer from 'multer';
import path from 'path';

// Use memory storage - files will be uploaded to Cloudinary from buffer
const storage = multer.memoryStorage();

// File Filter (Images Only)
const fileFilter = (req, file, cb) => {
  // Check MIME type
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
    return;
  }

  // Fallback: Check file extension for common image formats
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.heic', '.heif'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
    return;
  }

  console.log('[Upload] Rejected file:', {
    originalname: file.originalname,
    mimetype: file.mimetype,
    fieldname: file.fieldname
  });

  cb(new Error('Only images are allowed!'), false);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

export default upload;