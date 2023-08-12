const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
    console.log(req.body)
    const {username, password } = req.body;
    if (username && password){
        res.json({message: `Logged in as ${username}`});
    } else {
        res.status(400).json({error: "Username and password required."});
    }
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username: username,
            password: encryptedPassword
        });

        res.json({ message: "User registered." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;