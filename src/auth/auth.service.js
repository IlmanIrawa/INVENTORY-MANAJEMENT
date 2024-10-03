// Fungsi asinkron untuk proses login, mengimpor module jsonwebtoken
const jwt = require('jsonwebtoken');
// Mengimpor modul bcrypt untuk hashing password
const bcrypt = require('bcrypt');
// Mengimpor userRepository untuk berinteraksi dengan database
const userRepository = require('./auth.repository');
//Function generateToken digunakan untuk membuat token JWT berdasarkan informasi pengguna yang diberikan
function generateToken(user) {
  return jwt.sign({ userId: user.id, username: user.username, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
//REGISTRASI
async function register(username, email, password) {
  try {
    // Mengenkripsi (hash) password yang diberikan menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // '10' adalah salt rounds untuk menentukan kekuatan hashing
    // Membuat objek pengguna baru dengan properti username, email, password yang sudah di-hash, dan peran (role)
    const user = {
      username,
      email,
      password: hashedPassword, // Password di-hash untuk keamanan
      role: "USER", // Default role adalah "USER"
    };
    // Menyimpan pengguna baru ke database melalui userRepository
    const newUser = await userRepository.createUser(user);
    // Mengembalikan data pengguna yang baru saja disimpan
    return newUser;
  } catch (error) {
    // Jika ada kesalahan, lemparkan error dengan pesan "Failed to register user"
    throw new Error('Failed to register user');
  }
}

//LOGIN
// Fungsi asinkron untuk proses login
async function login(username, password) {

// Mencari user berdasarkan username menggunakan userRepository
const user = await userRepository.findUserByUsername(username);

// Jika user tidak ditemukan, lempar error dengan pesan "Invalid username or password"
if (!user) {
  throw new Error("Invalid username or password");
}

// Membandingkan password yang diberikan dengan password yang disimpan di database (yang telah di-hash)
const isValidPassword = await bcrypt.compare(password, user.password);

// Jika password tidak valid, lempar error dengan pesan "Invalid username or password"
if (!isValidPassword) {
  throw new Error("Invalid username or password");
}

const token = generateToken(user); // Generate token untuk user yang berhasil login
// Jika login berhasil, kembalikan data user
return {user,token}; // // Return variable “token” yang berisikan token jwt
}

// Mengekspor fungsi register agar bisa digunakan di tempat lain
module.exports = { register, login };