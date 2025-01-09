const path = require("path");
const express = require('express'); 
const router = express.Router();
const multer = require('multer');
const { users,login,post, getAllUsers, getUserById,deleteById,editUserById,upload,editProfileCard} = require('../controllers/authController');

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: './images', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg|gif)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
})  
router.post('/',users);
router.post('/login', login);
router.get('/getall', getAllUsers);
router.get('/post',post)
router.delete('/deleteById/:id',deleteById)
router.get("/get/user/:id",getUserById)
router.put("/edit/user/:id",editUserById)
router.post("/upload/profile/:id",imageUpload.single('image'),upload)
router.patch("/edit/profileCard/:id",editProfileCard)

module.exports = router;