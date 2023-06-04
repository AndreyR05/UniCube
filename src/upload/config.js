const multer = require('multer');

const diretorio = 'Public/assets/site';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, diretorio) 
  },
  
  filename: (req, file, cb) => {
    const extfile = file.originalname.split('.')[1];

    const nameFile = require('crypto')
      .randomBytes(64)
      .toString('hex');

    cb(null, `${nameFile}.${extfile}`)
  }
});

module.exports = multer({ storage });