const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Datos ficticios para los libros
let libros = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez' },
    { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes' },
    { id: 3, titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry' }
];

// GET: Obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(libros);
});

// GET: Obtener un libro por ID
app.get('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);
    if (libro) {
        res.json(libro);
    } else {
        res.status(404).send('Libro no encontrado');
    }
});

// POST: Crear un nuevo libro
app.post('/libros', (req, res) => {
    const nuevoLibro = {
        id: libros.length + 1,
        titulo: req.body.titulo,
        autor: req.body.autor
    };
    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
});

// PUT: Actualizar un libro por ID
app.put('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);
    if (libro) {
        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        res.json(libro);
    } else {
        res.status(404).send('Libro no encontrado');
    }
});

// DELETE: Eliminar un libro por ID
app.delete('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = libros.findIndex(l => l.id === id);
    if (index !== -1) {
        libros.splice(index, 1);
        res.send('Libro eliminado');
    } else {
        res.status(404).send('Libro no encontrado');
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
