// backend/index.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//  Connexion à la base SQLite
const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) console.error('Erreur de connexion à SQLite', err.message);
    else console.log(' Connecté à SQLite');
});

// 🛠️ Création de la table si elle n’existe pas
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titre TEXT NOT NULL,
        description TEXT,
        date TEXT,
        faite INTEGER DEFAULT 0
    )
`);

//  Routes de l’API

// ➕ Ajouter une tâche
app.post('/api/tasks', (req, res) => {
    const { titre, description, date } = req.body;
    db.run(`INSERT INTO tasks (titre, description, date, faite) VALUES (?, ?, ?, 0)`,
        [titre, description, date],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        });
});

//  Récupérer toutes les tâches
app.get('/api/tasks', (req, res) => {
    db.all(`SELECT * FROM tasks`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

//  Supprimer une tâche
app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

//  Modifier une tâche
app.put('/api/tasks/:id', (req, res) => {
    const { titre, description, date, faite } = req.body;
    const id = req.params.id;
    db.run(
        `UPDATE tasks SET titre = ?, description = ?, date = ?, faite = ? WHERE id = ?`,
        [titre, description, date, faite ? 1 : 0, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        });
});

//  Démarrage du serveur
app.listen(PORT, () => {
    console.log(` Backend API en ligne sur http://localhost:${PORT}`);
});
