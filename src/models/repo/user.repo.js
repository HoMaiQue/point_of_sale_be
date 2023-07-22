const user = require("../user.model");

const findUser = async (userId) => {
    return await user.findById(userId).lean();
};
const findByEmail = async ({
    email,
    select = {
        email: 1,
        password: 1,
        name: 1,
        status: 1,
        roles: 1,
    },
}) => {
    return user.findOne({ email }).select(select).lean();
};
module.exports = {
    findUser,
    findByEmail
};
