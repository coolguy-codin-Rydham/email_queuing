import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, "./public/uploads")
    },
    filename: (req, file, cb)=>{
        const uniqueName = `${Date.now()}-${file.originalname}`;
        return cb(null, uniqueName)
    }
})

const fileFilter = (req, file, cb)=>{
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if(!allowedTypes.includes(file.mimetype)){
        return cb(new Error('Invalid file type'), false)
    }
    cb(null, true)
}

const upload = multer({
    storage,
    limits:{fileSize: 2*1024*1024},
    fileFilter,
})

export default upload