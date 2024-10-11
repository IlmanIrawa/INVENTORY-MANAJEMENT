const bcrypt = require("bcrypt");
const { insertUser, findUsers, findUserById, editUser, deleteUser } = require("./user.repository");
// create user
async function createUser(newUserData) {
  const hashedPassword = await bcrypt.hash(newUserData.password, 10);
  newUserData.password = hashedPassword;

  const newUser = await insertUser(newUserData);
  return newUser;
}

// menampilkan data semua user
async function getAllUsers() {
    const users = await findUsers();
    return users;
}

// menampilkan data user berdasarkan id
  async function getUserById(id) {
    const user = await findUserById(id);
  
    if (!user) {
      throw new Error("User not found");
    }
  
    return user;
  }

// update user
async function editUserById(id, userData) {
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
    }
  
    await getUserById(id); // Memastikan user ada sebelum mengedit
  
    const updatedUser = await editUser(id, userData);
    return updatedUser;
  }
// delete user
  async function deleteUserById(id) {
    await getUserById(id); // Memastikan user ada sebelum dihapus
    await deleteUser(id);
  }
  
  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    editUserById,  
    deleteUserById
  };
  
  
