const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const dbPath = path.resolve(__dirname, 'inventario.db');
const dbExists = fs.existsSync(dbPath);
const db = new sqlite3.Database(dbPath);

// Crear la tabla 'products' si no existe
db.serialize(() => {
    if (!dbExists) {
        db.run(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                quantity INTEGER NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Error creando la tabla:', err.message);
            } else {
                console.log('Tabla de productos creada o ya existe.');
            }
        });
    }
});

// Mostrar todos los productos
app.get('/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error obteniendo productos');
            return;
        }
        res.json(rows);
    });
});

// Agregar un nuevo producto
app.post('/products', express.json(), (req, res) => {
    const { name, quantity } = req.body;
    db.run('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity], function(err) {
        if (err) {
            res.status(500).send('Error agregando producto');
            return;
        }
        res.sendStatus(200);
    });
});

// Eliminar un producto
app.delete('/products', express.json(), (req, res) => {
    const { name } = req.body;
    db.run('DELETE FROM products WHERE name = ?', [name], function(err) {
        if (err) {
            res.status(500).send('Error eliminando producto');
            return;
        }
        res.sendStatus(200);
    });
});

// Servir el archivo index.html cuando se accede a la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
