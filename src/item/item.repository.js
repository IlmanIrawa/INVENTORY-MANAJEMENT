const prisma = require("../db");
// Create data item 
async function insertItem (itemData) {
    const newItem = await prisma.item.create({
        data : {
            name : itemData.name,
            description : itemData.description,
            quantity : itemData.quantity,
            status_material : itemData.status_material
        }
    });
    return newItem;
}
// Menampilkan seluruh data item 
async function findItems() {
  const items = await prisma.item.findMany();
  return items;
}
// Menampilkan Berdasarkan id
async function findItemById(id) {
  const item = await prisma.item.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return item;
}

// update item
async function editItem(id, itemData){
    const updateItem = await prisma.item.update({
        where:{
            id: parseInt(id)
        },
        data:{
            name : itemData.name,
            description : itemData.description,
            status_material : itemData.status_material
        },
    });
    return updateItem;
}
// delete item
async function deleteItem(id){
    const deleteItem = await prisma.item.delete({
        where:{
            id: parseInt(id)
        }
    });
}
// update item quantity (update status transaksi)
async function updateItemQuantity(itemId, newQuantity) {
  await prisma.item.update({
      where: {
          id: parseInt(itemId),
      },
      data: {
          quantity: newQuantity,
      },
  });
}

module.exports = {
  findItems,
  findItemById,
  insertItem,
  editItem,
  deleteItem,
  updateItemQuantity, 
};

