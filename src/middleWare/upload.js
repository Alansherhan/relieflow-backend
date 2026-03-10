import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save files to 'uploads' folder
  },
  filename: function (req, file, cb) {
    // Naming: FieldName-Date.Extension (e.g., profile_image-123456789.jpg)
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

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