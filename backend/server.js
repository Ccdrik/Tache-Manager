const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

app.use(cors());
app.use(express.json());

app.use('/tasks', require('./routes/tasks'));
app.use('/users', require('./routes/users'));

app.listen(3000, () => {
    console.log('✅ Backend lancé sur http://localhost:3000');

    app.get('/', (req, res) => {
        res.send(' API TâcheManager opérationnelle !');
    });

});
