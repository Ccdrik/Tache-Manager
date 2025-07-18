const express = require('express');
const router = express.Router();
const db = require('../db');

// Liste des utilisateurs
router.get('/', (req, res) => {
    db.all("SELECT email, role FROM users", (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        res.json(rows);
    });
});

// Enregistrement
router.post('/register', (req, res) => {
    const { email, password, role } = req.body;
    db.run(
        "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
        [email, password, role || 'user'],
        function (err) {
            if (err) return res.status(400).json({ error: "Email déjà utilisé" });
            res.status(201).json({ message: "Utilisateur enregistré" });
        }
    );
});

// Connexion
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get(
        "SELECT * FROM users WHERE email=? AND password=?",
        [email, password],
        (err, user) => {
            if (err || !user) return res.status(401).json({ error: "Identifiants invalides" });
            res.json({ email: user.email, role: user.role });
        }
    );
});

// Promotion d’un utilisateur
router.put('/promote/:email', (req, res) => {
    const email = req.params.email;
    db.run("UPDATE users SET role='admin' WHERE email=?", [email], function (err) {
        if (err) return res.status(500).json({ error: err });
        res.json({ promoted: this.changes });
    });
});

module.exports = router;
