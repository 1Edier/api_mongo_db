require('dotenv').config();
require('../configs/db.config');

const Pedido = require('../models/pedidos.model');
const mongoose = require('mongoose');

const pedidos = [
    {
        pedidoId: "pedido1",
        fecha: new Date('2023-11-01'),
        hora: "08:00 AM",
        estado: "Pendiente",
    },
    {
        pedidoId: "pedido2",
        fecha: new Date('2023-11-02'),
        hora: "10:30 AM",
        estado: "En Proceso",
    },
    {
        pedidoId: "pedido3",
        fecha: new Date('2023-11-03'),
        hora: "12:45 PM",
        estado: "Entregado",
    },
   
];

Pedido.deleteMany({})
    .then(() => {
        return Pedido.insertMany(pedidos);
    })
    .then(() => {
        console.log("Pedidos creados");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
        mongoose.connection.close();
    });
