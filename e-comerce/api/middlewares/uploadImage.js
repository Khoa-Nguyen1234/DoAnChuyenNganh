const multer = require('multer');
const fs = require('fs');


//to upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = "./upload/"
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +  file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb( new Error('This is not a file'), false);
    }
}
const upload = multer({
    storage: storage,
});

module.exports = upload;