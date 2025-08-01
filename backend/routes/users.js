const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'ma-cle-secrete'; // à mettre dans un .env pour plus tard
const SALT_ROUNDS = 10;

// Liste des utilisateurs (protégée)
router.get('/', (req, res) => {
    db.all("SELECT email, role FROM users", (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        res.json(rows);
    });
});

// Enregistrement
router.post('/register', (req, res) => {
    const { email, password, role } = req.body;

    // Hash du mot de passe
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
        if (err) return res.status(500).json({ error: "Erreur serveur" });

        db.run(
            "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
            [email, hash, role || 'user'],
            function (err) {
                if (err) return res.status(400).json({ error: "Email déjà utilisé" });
                res.status(201).json({ message: "Utilisateur enregistré" });
            }
        );
    });
});

// Connexion
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, user) => {
            if (err || !user) return res.status(401).json({ error: "Identifiants invalides" });

            console.log("Utilisateur trouvé :", user); // 👈 DEBUG

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err || !isMatch) return res.status(401).json({ error: "Identifiants invalides" });

                const token = jwt.sign(
                    { id: user.id, email: user.email, role: user.role },
                    SECRET_KEY,
                    { expiresIn: '2h' }
                );

                console.log("Payload du token :", { id: user.id, email: user.email, role: user.role }); // 👈 DEBUG
                console.log("Token généré :", token); // 👈 DEBUG

                res.json({
                    message: "Connexion réussie",
                    token,
                    email: user.email,
                    role: user.role
                });
            });
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
