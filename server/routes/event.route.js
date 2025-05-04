const express = require('express');
const router = express.Router();
const multer = require("multer")
const eventController = require("../controller/events.controller.js")
const crypto = require('crypto')
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
    console.log("file is :",file)
  },
  filename: function (req, file, cb) {
     crypto.randomBytes(12,(error,bytes)=>{
      const fn = bytes.toString("hex")+path.extname(file.originalname)
      console.log("Generated filename:", fn)
      
      cb(null,fn )

    })
    
  }
})

const upload = multer({ storage: storage })



router.post('/', (req, res, next) => {
  console.log("Multer should run next...");
  next();
}, upload.single('photo'), eventController.createEvent);
router.get("/", eventController.fetchEvents)
router.get("/:id", eventController.fetchEventswithid)
router.put('/:id', upload.single('photo'), eventController.updateEvent)
router.delete('/:id', eventController.deleteEvent)


module.exports = router;