const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../auth.middleware');

// GET toutes les tâches de l'utilisateur connecté
router.get('/', verifyToken, (req, res) => {
    db.all("SELECT * FROM tasks WHERE user_id=?", [req.user.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        res.json(rows);
    });
});

// POST nouvelle tâche liée à l'utilisateur
router.post('/', verifyToken, (req, res) => {
    const { title, description, date, checklist, done } = req.body;
    db.run(
        "INSERT INTO tasks (title, description, date, checklist, done, user_id) VALUES (?, ?, ?, ?, ?, ?)",
        [title, description, date, JSON.stringify(checklist), done ? 1 : 0, req.user.id],
        function (err) {
            if (err) return res.status(500).json({ error: err });
            res.json({ id: this.lastID });
        }
    );
});

// PUT tâche (protéger et vérifier user_id)
router.put('/:id', verifyToken, (req, res) => {
    const { title, description, date, checklist, done } = req.body;
    db.run(
        "UPDATE tasks SET title=?, description=?, date=?, checklist=?, done=? WHERE id=? AND user_id=?",
        [title, description, date, JSON.stringify(checklist), done ? 1 : 0, req.params.id, req.user.id],
        function (err) {
            if (err) return res.status(500).json({ error: err });
            res.json({ updated: this.changes });
        }
    );
});

// DELETE tâche (protéger et vérifier user_id)
router.delete('/:id', verifyToken, (req, res) => {
    db.run("DELETE FROM tasks WHERE id=? AND user_id=?", [req.params.id, req.user.id], function (err) {
        if (err) return res.status(500).json({ error: err });
        res.json({ deleted: this.changes });
    });
});

// GET tâche par ID (protéger et vérifier user_id)
router.get('/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM tasks WHERE id=? AND user_id=?", [id, req.user.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Task not found' });
        res.json(row);
    });
});

module.exports = router;
