const { insertItem,findItems, findItemById ,editItem, deleteItem} = require("./item.repository");
// create item
async function createItem(newItemData){
    const newItem = await insertItem(newItemData);
    return newItem;
}
// Fungsi asinkron untuk mendapatkan semua item
async function getAllItems() {
  const items = await findItems();
  return items;
}
// menampilkan item berdasarkan id
async function getItemById(id) {
  const item = await findItemById(id);

  if (!item) {
    throw new Error("Item not found");
  }

  return item;
}
// update Item
async function editItemById(id, itemData){
    await getItemById(id);
    const updateItem = await editItem(id, itemData);
    return updateItem;
}
// delete item
async function deleteItemById(id, itemData){
    await getItemById(id);
    await deleteItem(id);
    return "Item deleted successfully";
}
module.exports = {
  createItem,
  getAllItems,
  getItemById,
  editItemById,
  deleteItemById,
};
