// Mengimpor modul 'express' untuk membuat aplikasi server
const express = require('express');
// Membuat router untuk mengelola rute HTTP
const router = express.Router();
// REGISTER
// Mengimpor authService untuk menggunakan fungsi register
const authService = require('./auth.service');
// Rute untuk melakukan registrasi pengguna baru dengan metode POST
router.post('/register', async (req, res, next) => {
  // Mengambil data username, email, dan password dari body request
  const { username, email, password } = req.body;
  try {
    // Mendaftarkan pengguna baru dengan data yang diberikan
    const newUser = await authService.register(username, email, password);

    // Jika berhasil, mengirimkan respons status 201 (Created) beserta data pengguna baru
    res.status(201).json({
      data: {
        username: newUser.username,
        email: newUser.email
      },
      message: "Registration Success!"
    });

  } catch (error) {
    // Jika terjadi kesalahan, mengirimkan respons status 400 (Bad Request) dengan pesan error
    res.status(400).json({ error: error.message });
  }

});

//LOGIN
// Route POST untuk login
router.post('/login', async (req, res, next) => {

  // Mengambil 'username' dan 'password' dari body request
  const { username, password } = req.body;

  try {
    // Memanggil fungsi login dari authService dan menunggu hasilnya (asynchronous)
    const {user,token} = await authService.login(username, password); // menambahkan variabel token untuk jwt
    
    // Jika login berhasil, mengirimkan respons dengan status 200 (OK)
    // Mengirimkan data user (username dan role) dalam bentuk JSON
    res.status(200).json({ 
      data: { 
        username: user.username, // Username pengguna
        token,                   // tambahkan properti token untuk jwt
        role: user.role          // Role pengguna
      }, 
      message: "Login Success!"  // Pesan sukses
    });
  
  } catch (error) {
    // Jika terjadi kesalahan, mengirimkan respons dengan status 400 (Bad Request)
    // Mengirimkan pesan kesalahan yang ditangkap
    res.status(400).json({ error: error.message });
  }

});

// Mengekspor router agar dapat digunakan di tempat lain
module.exports = router;
