const bcrypt = require('bcrypt');

async function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password required." });
    }

    try {
        // Search in db for user
        const [user] = await req.db.query("SELECT * FROM users WHERE username = ?", [username]);

        // Check if username exists and password is right
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        // If all OK send response. Soon do more stuff
        res.json({ message: `Logged in as ${username}` });

    } catch (error) {
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
}

async function register(req, res) {
    const { username, password, email } = req.body;

    try {
        // Check if the username exists
        const [existingUser] = await req.db.query('SELECT * FROM users WHERE username = ?', [username]);
        const [existingEmail] = await req.db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser) {
            return res.status(400).json({ error: "Username is not available." });
        } else 
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already in use." });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await req.db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, encryptedPassword, email]);
        
        res.json({ message: "User registered sucesffully." });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    login,
    register
}
