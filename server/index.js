const express = require('express');
const cors = require('cors'); 
const mongoose = require("mongoose")
const path = require('path');

require('dotenv').config();

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/event-managment-system')
.then(()=>console.log("mogodb is connected"))
.catch((error)=>{
  console.log("mongos error",error)

})

const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());
app.use('/api',require("./routes/index")); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
