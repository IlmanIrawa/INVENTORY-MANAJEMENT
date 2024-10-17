// Mengimpor modul express
const express = require('express');

// Membuat aplikasi Express
const app = express();
const adminAuthorization = require('./middleware/adminAuthorization');
// Middleware untuk mengolah data JSON
app.use(express.json());

// Mendefinisikan route untuk permintaan GET ke root ("/")
app.get("/", (req, res) => {
    // Mengirimkan respon 'Hello there!' saat route diakses
    res.send('Hello there!');
});

// inisiasi auth controller
const authController = require('./auth/auth.controller');
const itemController = require('./item/item.controller');
const userController = require("./user/user.controller");
const transactionController = require("./transaction/transaction.controller");

app.use("/api/auth", authController);
app.use("/api/items", itemController);
app.use("/api/transactions", transactionController);
app.use("/api/users", adminAuthorization, userController);

// Menjalankan server pada port 3000
app.listen(3000, () => {
    // Menampilkan pesan di konsol saat server berhasil dijalankan
    console.log(`App listening on port 3000`);
});


// untuk mengimport modul dotenv
const dotenv = require('dotenv');
const { UserRole } = require('@prisma/client');
dotenv.config();
const PORT = process.env.PORT;








