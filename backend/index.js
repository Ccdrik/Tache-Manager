// backend/index.js
const express = require('express');
const cors = require('cors');              //  importer une seule fois
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(cors());                           //  configurer une seule fois
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
        faite INTEGER DEFAULT 0,
        checklist TEXT
    )
`);

//  Routes de l’API

// ➕ Ajouter une tâche
app.post('/api/tasks', (req, res) => {
    const { titre, description, date, checklist } = req.body;
    db.run(
        `INSERT INTO tasks (titre, description, date, faite, checklist) VALUES (?, ?, ?, 0, ?)`,
        [titre, description, date, JSON.stringify(checklist || [])],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        });
});

//  Récupérer toutes les tâches
app.get('/api/tasks', (req, res) => {
    db.all(`SELECT * FROM tasks`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        rows = rows.map(row => ({
            ...row,
            checklist: row.checklist ? JSON.parse(row.checklist) : []
        }));

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
    const { titre, description, date, faite, checklist } = req.body;
    const id = req.params.id;
    db.run(
        `UPDATE tasks SET titre = ?, description = ?, date = ?, faite = ?, checklist = ? WHERE id = ?`,
        [titre, description, date, faite ? 1 : 0, JSON.stringify(checklist || []), id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        });
});

//  Démarrage du serveur
app.listen(PORT, () => {
    console.log(` Backend API en ligne sur http://localhost:${PORT}`);
});

app.get('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Tâche non trouvée' });

        row.checklist = row.checklist ? JSON.parse(row.checklist) : [];

        res.json(row);
    });
});

// Nombre total de tâches
app.get('/api/stats/tasks/count', (req, res) => {
    db.get(`SELECT COUNT(*) as total FROM tasks`, [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ total: row.total });
    });
});

// Nombre de tâches terminées
app.get('/api/stats/tasks/done', (req, res) => {
    db.get(`SELECT COUNT(*) as done FROM tasks WHERE faite = 1`, [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ done: row.done });
    });
});

// Nombre d'utilisateurs
app.get('/api/stats/users/count', (req, res) => {
    db.get(`SELECT COUNT(*) as total FROM users`, [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ total: row.total });
    });
});
