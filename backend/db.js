const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tachemanager.db');

// Création des tables si elles n'existent pas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    date TEXT,
    checklist TEXT,
    done INTEGER
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
    email TEXT PRIMARY KEY,
    password TEXT,
    role TEXT
  )`);

    // Admin par défaut
    db.get("SELECT * FROM users WHERE role = 'admin'", (err, row) => {
        if (!row) {
            db.run(`INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
                ['admin@mail.com', 'admin123', 'admin']);
        }
    });
});

module.exports = db;
