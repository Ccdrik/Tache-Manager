const express = require('express');
const router = express.Router();
const db = require('../db');

// GET toutes les tâches
router.get('/', (req, res) => {
    db.all("SELECT * FROM tasks", (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        res.json(rows);
    });
});

// POST nouvelle tâche
router.post('/', (req, res) => {
    const { title, description, date, checklist, done } = req.body;
    db.run(
        "INSERT INTO tasks (title, description, date, checklist, done) VALUES (?, ?, ?, ?, ?)",
        [title, description, date, JSON.stringify(checklist), done ? 1 : 0],
        function (err) {
            if (err) return res.status(500).json({ error: err });
            res.json({ id: this.lastID });
        }
    );
});

// PUT tâche
router.put('/:id', (req, res) => {
    const { title, description, date, checklist, done } = req.body;
    db.run(
        "UPDATE tasks SET title=?, description=?, date=?, checklist=?, done=? WHERE id=?",
        [title, description, date, JSON.stringify(checklist), done ? 1 : 0, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err });
            res.json({ updated: this.changes });
        }
    );
});

// DELETE tâche
router.delete('/:id', (req, res) => {
    db.run("DELETE FROM tasks WHERE id=?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err });
        res.json({ deleted: this.changes });
    });
});

module.exports = router;
