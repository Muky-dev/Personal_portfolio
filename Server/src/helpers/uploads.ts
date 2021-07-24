import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/covers');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploads = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
            cb(null, true)
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg, .jpeg allowed'));
        }
    },
    limits: {
        files: 1
    }
});

export default uploads