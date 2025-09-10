function validateNewUser(req, res, next) {
    const user = req.body;
    if (user.username && user.password) {
        next();
    } else {
        res.status(400).json({ message: "invalid username or password", data: user });
    }
}

module.exports = { validateNewUser };