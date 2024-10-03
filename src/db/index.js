// Mengimpor PrismaClient dari library @prisma/client
const { PrismaClient } = require("@prisma/client");

// Membuat instance PrismaClient yang akan digunakan untuk berinteraksi dengan database
const prisma = new PrismaClient();

// Mengekspor instance prisma sehingga bisa digunakan di bagian lain dari aplikasi
module.exports = prisma;




