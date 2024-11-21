
const express = require('express');
const router = express.Router();
// REGISTER
const authService = require('./auth.service');
router.post('/register', async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await authService.register(username, email, password);
    res.status(201).json({
      data: {
        username: newUser.username,
        email: newUser.email
      },
      message: "Registration Success!"
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }

});

//LOGIN
// Route POST untuk login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const {user,token} = await authService.login(username, password);
    res.status(200).json({ 
      data: { 
        username: user.username, // Username pengguna
        token,                   // tambahkan properti token untuk jwt
        role: user.role          // Role pengguna
      }, 
      message: "Login Success!"  // Pesan sukses
    });
  
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

});

module.exports = router;
