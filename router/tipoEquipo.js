const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const {validarTipoEquipo} = require('../helpers/validar-tipoEquipo');



const router = Router();

router.post('/', async  function (req, res){

    try{
        const validaciones = validarTipoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        let tipoEquipo = TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);


    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error al crear un tipo de equipo');

    }
  
});

router.get('/', async function(req, res){

    try{
        const tipoEquipo = await TipoEquipo.find();
        res.send(tipoEquipo);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
   
});

router.put('/:tipoEquipoId', async function(req, res){
 
    try{
        const validaciones = validarTipoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipo){
            return res.status(400).send('No existe tipo equipo');
        }

        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);


    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar un tipo de equipo');

    }
  
    
});

router.get('/:tipoEquipoId', async function(req, res ){
    try {
        const tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipo){
            return res.status(404).send('Tipo equipo no existe');
        }
        res.send(tipoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar tipo equipo');
        
    }
})

module.exports = router;