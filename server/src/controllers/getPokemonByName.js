const axios = require('axios');
const { Op } = require('sequelize');
const { Pokemon } = require('../db');

const getPokemonByName = async (req, res) => {
    const { name } = req.query;
    const lowerCaseName = name.toLowerCase();
    const URL = 'https://pokeapi.co/api/v2/pokemon';

    if (!name) {
        return res.status(400).json({ message: 'name not provided' });
    }

    try {
        const dbPokemon = await Pokemon.findAll({
            where: {
                name: {
                    [Op.iLike]: lowerCaseName
                }
            }
        });

        if (dbPokemon.length > 0) {
            const formattedDbPokemons = dbPokemon.map(dbPokemon => ({
                id: dbPokemon.id,
                name: dbPokemon.name,
                image: dbPokemon.image,
                stats: dbPokemon.stats,
                height: dbPokemon.height,
                weight: dbPokemon.weight,
                types: dbPokemon.types
            }));
            return res.status(200).json(formattedDbPokemons);
        }

        // Si no existe en la base de datos, hacer la solicitud a la API externa
        const { data } = await axios.get(`${URL}/${lowerCaseName}`);

        // Formatear la respuesta según el modelo de los otros endpoints
        const formattedStats = {};
        for (const stat of data.stats) {
            const statName = stat.stat.name;
            formattedStats[statName] = stat.base_stat;
        }

        const types = data.types.map(type => type.type.name);

        const pokemon = {
            id: data.id,
            name: data.name,
            image: data.sprites.other.dream_world.front_default,
            stats: formattedStats,
            height: data.height,
            weight: data.weight,
            types: types
        };

        return res.status(200).json(pokemon);
    } catch (error) {
        console.error("Error en getPokemonByName:", error.stack);
        return res.status(500).send({ error: error.message });
    }
};

module.exports = getPokemonByName;
