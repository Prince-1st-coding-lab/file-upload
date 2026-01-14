const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname,'public')))

const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null,'uploads/')
  },
  filename: (req,file,cb)=>{
    cb(null,Date.now()+'-'+file.originalname)
  }
})

const upload = multer({storage:storage})

app.post('/api/upload',upload.single('file'),(req,res)=>{
  res.json({mesg:'uploaded bitch !!!'})
})

app.listen(3000, () => console.log('Server running on port 3000'));
