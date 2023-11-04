const mongoose = require('mongoose');

const pedidoSchema = mongoose.Schema({
    pedidoId: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    hora: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    // Otros campos si es necesario
});

module.exports = mongoose.model('Pedido', pedidoSchema);
