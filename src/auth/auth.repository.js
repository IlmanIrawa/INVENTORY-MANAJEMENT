// Mengimpor prisma client yang terhubung dengan database
const prisma = require("../db");

//REGISTRASI
// Fungsi untuk membuat pengguna baru di database
async function createUser(userData) {
  try {
    // Menggunakan prisma untuk membuat pengguna baru di tabel 'user'
    const newUser = await prisma.user.create({
      data: userData, // userData berisi objek pengguna (username, email, password, role)
    });

    // Mengembalikan pengguna baru yang berhasil dibuat
    return newUser;

  } catch (error) {
    // Jika terjadi kesalahan, lemparkan error dengan pesan "Failed to create user in repository"
    throw new Error('Failed to create user in repository');
  }
}

// Mengekspor fungsi createUser agar bisa digunakan di tempat lain
module.exports = { createUser };

//LOGIN
async function findUserByUsername(username) {

  return prisma.user.findUnique({ where: { username } });
  
}
module.exports = { createUser, findUserByUsername };

