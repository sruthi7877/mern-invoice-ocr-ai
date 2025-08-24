import { Router } from 'express';
import multer from 'multer';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadAndExtract, updateAndConfirm, summarize } from '../controllers/invoice.controller.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const ok = ['application/pdf', 'image/jpeg', 'image/png'];
    if (ok.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only PDF/JPG/PNG allowed'));
  }
});

router.post('/upload', upload.single('file'), asyncHandler(uploadAndExtract));
router.put('/:id', asyncHandler(updateAndConfirm));
router.post('/:id/summary', asyncHandler(summarize));

export default router;