//uploading required modules
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

//middle-wares
app.use(express.static(path.join(__dirname,'public')))

//define storage path and name
const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null,'uploads/') // path
  },
  filename: (req,file,cb)=>{
    cb(null,Date.now()+'-'+file.originalname) //making unique name
  }
})

// upload validation
const upload = multer({storage:storage,
  limits:{
    fileSize: 5 * 1024 * 1024 // max size 5MB
  },
  fileFilter:(req,file,cb)=>{

    const allowedTypes = ['image/png','image/jpeg','image/gif','image/tiff','image/svg']; // ALLOWED TYPES

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('file type not supported')) //throwing error
    }
    cb(null,true); //accept to continue
  }

})

app.post('/api/upload',upload.single('file'),(req,res)=>{ //api for requested uploads
  if (!req.file) {
    res.status(400).json({msg:'no file uploaded'}) // if no file uploaded
  }
  res.status(200).json({msg:'uploaded successfully'})
})

//middle-ware for error handling

app.use((err,req,res,next)=>{
  res.static(400).json({msg:'there is error'+ err})
})

app.listen(3000, () => console.log('Server running on port 3000'));//port to listen on
