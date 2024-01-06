const axios = require('axios');
const { Pokemon } = require('../db');

const getPokemonById = async (req, res) => {
    const { id } = req.params;
    const URL = 'https://pokeapi.co/api/v2/pokemon';

    try {
        const idNumber = Number(id);

        if (idNumber) {
            const { data } = await axios.get(`${URL}/${idNumber}`);
            
            const formattedStats = {};
            for (const stat of data.stats) {
                const statName = stat.stat.name;
                formattedStats[statName] = stat.base_stat;
            }

            const types = data.types.map(type => type.type.name);

            const pokemonsById = {
                    id: data.id,
                    name: data.name,
                    image: data.sprites.other.dream_world.front_default,
                    stats: formattedStats,
                    height: data.height,
                    weight: data.weight,
                    types: types
                }

            return res.status(200).json(pokemonsById);

        } else {
            const dbPokemon = await Pokemon.findOne({
                where: {
                    id: id
                }
            });

            if (dbPokemon) {
                return res.status(200).json(dbPokemon);
            }
        }


    } catch (error) {

        return res.status(500).send({ error: error.message });

    }
};

module.exports = getPokemonById;