const userModel = require("../model/user.model.js");

module.exports = async function populate(users) {
  users.forEach(async (user) => {
    const user1 = new userModel(user);
    await user1.save();
  });
};
