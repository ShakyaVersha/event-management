const User = require("../Model/userSchema");
const bcrypt = require("bcryptjs");


const createUser = async (req, res) => {
  try {
    const { username, email, password ,role} = req.body;
    
    const hashedPassword = await bcrypt.hash(password,10);

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = new User({ username,role,email,password:hashedPassword});
    await newUser.save();

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createUser };