const User = require('../models/user');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(e) {
        res.status(500).send();
    }
};

const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send(user);
    } catch(e) {
        res.status(400).send(e);
    }
};

const getUser = async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch(e) {
        res.status(500).send();
    }
};

const updateUser = async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['firstName', 'lastName', 'email'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'});
    }
    try {
        const user = await User.findById(_id);

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch(e) {
        res.status(400).send(e);
    }
};

const deleteUser = async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch(e) {
        res.status(500).send();
    }
};

module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}