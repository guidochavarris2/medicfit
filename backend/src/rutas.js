const express = require('express');
const pool = require('./db');
const router = express.Router();

// Crear una nueva tarea
router.post('/', async (req, res) => {
    const { descripcion } = req.body;
    try {
        const nuevaTarea = await pool.query(
            'INSERT INTO tareas (descripcion) VALUES ($1) RETURNING *',
            [descripcion]
        );
        const tarea = nuevaTarea.rows[0];
        const io = req.app.get('socketio');
        io.emit('tarea-agregada', tarea);
        res.json(tarea);
    } catch (err) {
        console.error(err.message);
    }
});

// Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const todasTareas = await pool.query('SELECT * FROM tareas');
        res.json(todasTareas.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Actualizar una tarea
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { descripcion, completada } = req.body;
    try {
        const actualizarTarea = await pool.query(
            'UPDATE tareas SET descripcion = $1, completada = $2 WHERE id = $3 RETURNING *',
            [descripcion, completada, id]
        );
        const tarea = actualizarTarea.rows[0];
        const io = req.app.get('socketio');
        io.emit('tarea-actualizada', tarea);
        res.json(tarea);
    } catch (err) {
        console.error(err.message);
    }
});

// Eliminar una tarea
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM tareas WHERE id = $1', [id]);
        const io = req.app.get('socketio');
        io.emit('tarea-eliminada', id);  // Emitimos el evento de eliminación con el id de la tarea eliminada
        res.json({ mensaje: 'Tarea eliminada' });
    } catch (err) {
        console.error(err.message);
    }
}); 

module.exports = router;
