const user = require("../user.model");
const findUser = async (userId) => {
    return await user.findById(userId).lean();
};
module.exports = {
    findUser,
};
