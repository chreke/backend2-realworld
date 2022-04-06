const { User } = require("../models/userSchema");


async function createUser(userOpts) {
    if(!userOpts.username) {
        throw new Error("Did not provide username");
    }
    if(!userOpts.email) {
        throw new Error("Did not provide email");
    }
    if(!userOpts.password) {
        throw new Error("Did not provide password");
    }

    
    const user = await User.create({
        userOpts,
    })
    
    if(!user) throw new Error("Could not create user")
    
    return user;
}

module.exports = {
    createUser
}
