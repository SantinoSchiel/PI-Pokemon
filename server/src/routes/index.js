const { Router } = require('express');
const getAllPokemons = require('../controllers/getAllPokemons');
const getPokemonById = require('../controllers/getPokemonById');
const getPokemonByName = require('../controllers/getPokemonByName');
const createPokemon = require('../controllers/createPokemon');
const getAllTypes = require('../controllers/getAllTypes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", getAllPokemons);
router.get("/pokemons/name", getPokemonByName);
router.get("/pokemons/:id", getPokemonById);
router.post("/pokemons", createPokemon);
router.get("/types", getAllTypes);

module.exports = router;
