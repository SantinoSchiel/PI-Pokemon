const axios = require('axios');
const {Pokemon} = require('../db');

const getPokemonById = async (req, res) => {
    const { id } = req.params;
    const URL = 'https://pokeapi.co/api/v2/pokemon';

    try {
        const dbPokemon = await Pokemon.findOne({
            where: {
                id: parseInt(id)
            }
        });

        if (dbPokemon) {
            return res.status(200).json(dbPokemon);
        }

        const {data} = await axios.get(`${URL}/${id}`);
        return res.status(200).json(data);

    } catch (error) {

        return res.status(500).send({ error: error.message });
        
    }
};

module.exports = getPokemonById;