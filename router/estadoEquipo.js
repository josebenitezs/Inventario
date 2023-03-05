const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const {validarEstadoEquipo} = require('../helpers/validar-estadoEquipo');

const router = Router();

router.post('/', async function (req, res){
    try{
        const validaciones = validarEstadoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        let estadoEquipo = EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);


    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error al crear un estado de equipo');

    }
  
});

router.get('/', async function(req, res){
    try{
        const estadoEquipo = await EstadoEquipo.find();
        res.send(estadoEquipo);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:estadoEquipoId', async function(req, res){
    try{
        const validaciones = validarEstadoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if(!estadoEquipo){
            return res.status(400).send('No existe estado equipo');
        }

        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);


    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar un estado de equipo');

    }
});

module.exports = router;