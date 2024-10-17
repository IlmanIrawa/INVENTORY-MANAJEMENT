const transactionRepository = require("./transaction.repository");
const itemRepository = require('../item/item.repository');

// create transaction
async function borrowItem( userId,itemId, quantityBorrowed) {
    const newTransaction = await transactionRepository.createTransaction(userId, itemId, quantityBorrowed);
    return newTransaction;
}
// menampilkan semua data transaksi
async function getAllTransactions() {
    const transactions = await transactionRepository.findTransactions();
    return transactions;
}
// menampilkan data transaksi berdasarkan id user
async function getTransactionsByUserId(userId) {
    const transactions = await transactionRepository.findTransactionsByUserId(userId);
    return transactions;
}

async function getTransactionById(transactionId) {
    const transaction = await transactionRepository.findTransactionById(transactionId);
    return transaction;
}
// verifikasi transaksi
async function verifyTransaction(transactionId, status) {
    const transaction = await transactionRepository.findTransactionById(transactionId);

    if (!transaction) {
        throw new Error("Transaction not found.");
    }

    // Update status transaksi
    await transactionRepository.updateTransactionStatus(transactionId, status);

    // Jika statusnya "done", kurangi quantity pada model Item
    if (status === "done") {
        const item = await itemRepository.findItemById(transaction.itemId);

        if (!item) {
            throw new Error("Item not found.");
        }

        const newQuantity = item.quantity - transaction.quantityBorrowed;

        if (newQuantity < 0) {
            throw new Error("Insufficient quantity.");
        }

        await itemRepository.updateItemQuantity(item.id, newQuantity);
    }
}
// return item
async function returnItem(transactionId) {
    // Cari transaksi berdasarkan ID
    const transaction = await transactionRepository.findTransactionById(transactionId);

    if (!transaction) {
        throw new Error("Transaction not found");
    }

    // Pastikan status transaksi adalah "done"
    if (transaction.status_order !== "done") {
        throw new Error("Cannot return item. Transaction status is not done");
    }

    // Update status transaksi menjadi "RETURNED"
    await transactionRepository.updateTransactionStatus(transactionId, "returned");

    // Update quantity pada item
    const item = await itemRepository.findItemById(transaction.itemId);
    const newQuantity = item.quantity + transaction.quantityBorrowed;

    await itemRepository.updateItemQuantity(item.id, newQuantity);
}

module.exports = {
    borrowItem,
    getAllTransactions,
    getTransactionsByUserId,
    getTransactionById,
    verifyTransaction,
    returnItem, 
};


