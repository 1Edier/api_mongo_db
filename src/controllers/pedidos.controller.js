const pedidoModel = require('../models/pedidos.model');

const index = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;

        const pedidos = await pedidoModel.find().skip(skip).limit(limit);

        let response = {
            message: "Se obtuvieron los pedidos correctamente",
            data: pedidos
        };

        if (page && limit) {
            const totalPedidos = await pedidoModel.countDocuments();
            const totalPages = Math.ceil(totalPedidos / limit);
            const currentPage = parseInt(page);

            response = {
                ...response,
                total: totalPedidos,
                totalPages,
                currentPage,
            };
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al obtener los pedidos",
            error: error.message
        });
    }
};

const getById = async (req, res) => {
    try {
        const pedidoId = req.params.pedidoId;
        const pedido = await pedidoModel.findById(pedidoId);

        if (!pedido) {
            return res.status(404).json({
                message: "Pedido no encontrado"
            });
        }

        return res.status(200).json({
            message: "Pedido obtenido exitosamente",
            pedido
        });

    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al obtener el pedido",
            error: error.message
        });
    }
};

const create = async (req, res) => {
    try {
        const { pedidoId, fecha, hora, estado } = req.body;

        let pedido = new pedidoModel({
            pedidoId,
            fecha,
            hora,
            estado
        });

        await pedido.save();

        return res.status(201).json({
            message: "Pedido creado exitosamente!"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Falló al crear el pedido",
            error: error.message
        });
    }
};

const deleteLogico = async (req, res) => {
    try {
        const pedidoId = req.params.pedidoId;
        const pedidoEliminado = await pedidoModel.findByIdAndUpdate(pedidoId, {
            deleted: true,
            deleted_at: new Date()
        });

        if (!pedidoEliminado) {
            return res.status(404).json({
                message: "Pedido no encontrado"
            });
        }

        return res.status(200).json({
            message: "Pedido eliminado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al eliminar el pedido",
            error: error.message
        });
    }
};

const updateParcial = async (req, res) => {
    try {
        const pedidoId = req.params.pedidoId;
        const datosActualizar = {
            ...req.body
        };

        const pedidoActualizado = await pedidoModel.findByIdAndUpdate(pedidoId, datosActualizar);

        if (!pedidoActualizado) {
            return res.status(404).json({
                message: "Pedido no encontrado"
            });
        }

        return res.status(200).json({
            message: "Pedido actualizado exitosamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al editar el pedido",
            error: error.message
        });
    }
};

const updateCompleto = async (req, res) => {
    try {
        const pedidoId = req.params.pedidoId;
        const datosActualizar = {
            pedidoId: req.body.pedidoId || null,
            fecha: req.body.fecha || null,
            hora: req.body.hora || null,
            estado: req.body.estado || null
        };

        const pedidoActualizado = await pedidoModel.findByIdAndUpdate(pedidoId, datosActualizar);

        if (!pedidoActualizado) {
            return res.status(404).json({
                message: "Pedido no encontrado"
            });
        }

        return res.status(200).json({
            message: "Pedido actualizado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al editar el pedido",
            error: error.message
        });
    }
};

module.exports = {
    index,
    getById,
    create,
    delete: deleteLogico,
    updateParcial,
    updateCompleto
};
