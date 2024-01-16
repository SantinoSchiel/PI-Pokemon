const axios = require("axios");
const {Pokemon} = require('../db');

const getAllPokemons = async (req, res) => {
    const URL = 'https://pokeapi.co/api/v2/pokemon';
    const limit = 156;
    let allPokemonsData = [];

    try {
        const page = req.query.page || 1;
        const offset = (page - 1) * limit;
        const nextUrl = `${URL}?limit=${limit}&offset=${offset}`;

        const { data } = await axios.get(nextUrl);

        const pokemons = await Promise.all(data.results.map(async (pokemon) => {
            const { data: pokemonData } = await axios.get(pokemon.url);

            const formattedStats = {};
            for (const stat of pokemonData.stats) {
                const statName = stat.stat.name;
                formattedStats[statName] = stat.base_stat;
            }

            const types = pokemonData.types.map(type => type.type.name);

            return {
                id: pokemonData.id,
                name: pokemonData.name,
                image: pokemonData.sprites.other.dream_world.front_default,
                stats: formattedStats,
                height: pokemonData.height,
                weight: pokemonData.weight,
                types: types,
            };
        }));

        allPokemonsData = [...allPokemonsData, ...pokemons];
        
        const dbPokemons = await Pokemon.findAll();
        
        allPokemonsData = [...allPokemonsData, ...dbPokemons];

        return res.status(200).json(allPokemonsData);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = getAllPokemons;
