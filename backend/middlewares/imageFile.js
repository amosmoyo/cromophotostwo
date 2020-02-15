const multer = require('multer')

// working with images

const mimetypemap = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
}

const storage = multer.diskStorage({
  destination: function(req, file, callback){
    const isValid = mimetypemap[file.mimetype];
    let err = new Error('Invalid mimetype');

    if (isValid) {
      err = null;
    }
    callback(err, 'backend/images');
  },
  filename: function(req, file, callback) {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = mimetypemap[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + ext);
  }
})

module.exports = multer({storage: storage}).single('image');
