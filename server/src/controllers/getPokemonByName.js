const axios = require('axios');
const { Op } = require('sequelize');
const {Pokemon} = require('../db');

const getPokemonByName = async (req, res) => {
    const { name } = req.query;
    const lowerCaseName = name.toLowerCase();
    const URL = 'https://pokeapi.co/api/v2/pokemon';

    if (!lowerCaseName) {
        return res.status(400).json({ message: 'name not provided' });
    }

    try {
        const dbPokemon = await Pokemon.findOne({
            where: {
                name: {
                    [Op.iLike]: lowerCaseName
                }
            }
        });

        if (dbPokemon) {
            return res.status(200).json(dbPokemon);
        }

        const { data } = await axios.get(`${URL}/${lowerCaseName}`);

        return res.status(200).json(data);

    } catch (error) {

        return res.status(500).send({ error: error.message });

    }
};

module.exports = getPokemonByName;