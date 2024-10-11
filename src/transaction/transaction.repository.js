const prisma = require("../db");

async function createTransaction(userId, itemId, quantityBorrowed) {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        userId,
        itemId,
        quantityBorrowed,
        status_order: "done",
      },
    });
    return newTransaction;
  } catch (error) {
    throw new Error("Failed to create transaction");
  }
}
// menampilkan data transaksi
async function findTransactions() {
    try {
        const transactions = await prisma.transaction.findMany({
            include: {
                item: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return transactions;
    } catch (error) {
        throw new Error('Failed to fetch transactions');
    }
}
// menampilkan data transaksi berdasarkan id
async function findTransactionsByUserId(userId) {
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: parseInt(userId),
            },
            include: {
                item: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return transactions;
    } catch (error) {
        throw new Error('Failed to fetch transactions by user ID');
    }
}

async function findTransactionById(id) {
    try {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        return transaction;
    } catch (error) {
        throw new Error('Failed to fetch transaction by ID');
    }
}
// update transaksi status
async function updateTransactionStatus(transactionId, status, timestampField) {
    try {
        const updateData = {
            status_order : status,
        };

        if (timestampField) {
            updateData[timestampField] = new Date();
        }

        await prisma.transaction.update({
            where: {
                id: parseInt(transactionId),
            },
            data: updateData,
        });
    } catch (error) {
        throw new Error('Failed to update transaction status');
    }
}
module.exports = {
    createTransaction,
    findTransactions,
    findTransactionsByUserId,
    findTransactionById,
    updateTransactionStatus, 
};


