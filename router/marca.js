const { Router } = require('express');
const Marca = require('../models/Marca');
const {validarMarca} = require('../helpers/validar-marca')

const router = Router();

router.post('/', async  function (req, res){
   
    try {
        const validaciones = validarMarca(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        let marca =  Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();;

        marca = await marca.save();
        res.send(marca);
        console.log(marca);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear la marca ');
    }
  
});

router.get('/', async function(req, res){
  try {

    const marcas = await Marca.find();
    res.send(marcas);
    
  } catch (error) {
      console.log(error);
      res.status(500).send('Ocurrio un error')
  }
});

router.put('/:marcaId', async function(req, res){

    try {

        const validaciones = validarMarca(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones)
        }
        
        let marca = await Marca.findById(req.params.marcaId);
        if(!marca) {
            return res.status(400).send('Marca no existe');
        }    

        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();

        marca= await marca.save();
        res.send(marca);

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear la marca ');
    }
});

router.get('/:marcaId', async function(req, res ){
    try {
        const marca = await Marca.findById(req.params.marcaId);
        if(!marca){
            return res.status(404).send('Marca no existe');
        }
        res.send(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar marca');
        
    }
})

module.exports = router;