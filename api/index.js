
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const File = require('./models/File');

const multer = require('multer');

// Configure multer with memory storage
const storage = multer.memoryStorage(); // Memory storage for storing file buffers
const upload = multer({ storage });


const app = express()
const port = 4000
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({  limit: '10mb', extended: true  }))
app.use(bodyParser.json({ limit: '10mb' }))


const jwt = require('jsonwebtoken')
const { hasteMapCacheDirectory } = require('../metro.config')
const formidable = require('formidable')
const User = require('./models/user')
const { useState } = require('react')
mongoose.connect("mongodb+srv://shayazz:shayaz@cluster0.su8vu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  console.log("connected to database")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

async function mailer(reciveremail, code) {

  let transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "shayazath21@gmail.com",
      pass: "ermkmqadvkbsiwqy"
    }

  })
 

  let info = transporter.sendMail({

    from: "Your Myone",
    to: reciveremail,
    subject: "Verification Code",
    text: `Your verification code is : ${code}`,
    html: `<b>Your verification code is ${code}</b>`

  })

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}
const storedotp ={}
app.post('/otp',async (req,res)=>{
  const {email} = req.body;
  let verificationcode = Math.round(1000 + Math.random() * 9000)
  console.log(verificationcode)
  await mailer(email, verificationcode)

  if(verificationcode){
    res.status(200).json({verificationcode: verificationcode})
  }
  storedotp[email] = { code: verificationcode, expires: Date.now() + 300000 };

})
app.post('/otpverify',async (req,res)=>{
  const { email,otp } = req.body;

  if(storedotp[email].code === parseInt(otp)){
    res.status(200).json({ message: 'OTP verified successfully' })
  }

})



app.post('/register',upload.single('profile_pic'), async (req, res) => {

  const { email, name, password  } = req.body;
  const profilePic = req.file

  const newUser = new User({ email : email, name : name, password : password , profilePic : profilePic.buffer });

  newUser
    .save()
    .then(() => {
      const secretKey = crypto.randomBytes(32).toString('hex')

      const token = jwt.sign({ userId: newUser._id }, secretKey)

      res.status(200).json({ token });
    })
    .catch(error => {
      console.log('Error creating a user', error);
      res.status(500).json({ message: 'Error registering the user' });
    });

})
// ermk mqad vkbs iwqy
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' })
    }

    if (user.password !== password) {
      return res.status(402).json({ message: 'Invalid password' })
    }
    
    const secretKey = crypto.randomBytes(32).toString('hex')

    const token = jwt.sign({ userId: user._id }, secretKey)
    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id,
      username: user.name,
      email : user.email
    });
  } catch (error) {
    console.log('error loggin in', error);
    res.status(500).json({ message: 'Error loggin In' });
  }
});
app.post('/upload', upload.fields([{name:'file'},{name:'thumbnail'},{name:'profilepic'}]), async (req, res) => {
  try {
    const { originalname, mimetype, buffer  } = req.files['file'][0]
    const thumbnail = req.files['thumbnail'][0];
    const profilepic = req.files['profilepic'][0];
    const { userId,username,filesize } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    console.log('Uploaded file:', req.file);


    const file = new File({
      name: originalname,
      type: mimetype,
      data: buffer,
      userId: userId,
      username: username,
      thumbnail: thumbnail.buffer,
      profilepic : profilepic.buffer,
      size : filesize

    });



    await file.save();
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ message: 'Error uploading file', err });
  }
});

app.get('/files', async (req, res) => {
  try {
    const files = await File.find().sort({uploadDate:-1})
    const responseData = files.map(file => ({
      _id: file._id,
      username: file.username,
      data: file.data ? `data:application/pdf;base64,${file.data.toString("base64")}` : null, // ✅ Convert PDF Buffer properly
      thumbnail: file.thumbnail ? `data:image/jpeg;base64,${file.thumbnail.toString("base64")}` : null,
      profilepic: file.profilepic ? `data:image/jpeg;base64,${file.profilepic.toString("base64")}` : null, // ✅ Handle null case
      filename: file.name,
      filesize : file.size
    }));


    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Error retrieving files' });
  }
});

app.get('/profilepic',async (req, res) =>{
  try{
    const {profile_pic,username} = req.body

    const People = await User.findOneAndUpdate(
      { username },
      { $set: { profilePic: profile_pic } },
      { new: true }
    )
    if (!People) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile picture updated successfully!", user });
  }catch(error){
    console.error('Error updating profile picture:', error);
    res.status(500).json({ message: 'Error updating profile picture' });
  }
})
app.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
      const results = await File.find({
          name: { $regex: query, $options: 'i' },
      }).sort({uploadDate:-1});
      const responseData = results.map(file => ({
        _id: file._id,
        username: file.username,
        data: file.data ? `data:application/pdf;base64,${file.data.toString("base64")}` : null, // ✅ Convert PDF Buffer properly
        thumbnail: file.thumbnail ? `data:image/jpeg;base64,${file.thumbnail.toString("base64")}` : null,
        profilepic: file.profilepic ? `data:image/jpeg;base64,${file.profilepic.toString("base64")}` : null, // ✅ Handle null case
        filename: file.name,
        filesize : file.size
      }));
      res.status(200).json(responseData);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
})


app.get('/searchuploads', async (req, res) => {
  const { username } = req.query;

  try {
      const results = await File.find({
        username: username,
      }).sort({uploadDate:-1});
      const responseData = results.map(file => ({
        _id: file._id,
        username: file.username,
        data: file.data ? `data:application/pdf;base64,${file.data.toString("base64")}` : null, // ✅ Convert PDF Buffer properly
        thumbnail: file.thumbnail ? `data:image/jpeg;base64,${file.thumbnail.toString("base64")}` : null,
        profilepic: file.profilepic ? `data:image/jpeg;base64,${file.profilepic.toString("base64")}` : null, // ✅ Handle null case
        filename: file.name,
        filesize : file.size
      }));
      res.status(200).json(responseData);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
})

app.get('/countpdfs',async (req,res)=>{
  const {username} = req.query

  try{
    const count = await File.countDocuments({username})
    res.json({count})
  }catch(error){
    res.status(500).json({error : 'Failed to count PDFS'})
  }

})