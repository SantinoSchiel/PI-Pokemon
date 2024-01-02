const axios = require("axios");

const getAllPokemons = async (req, res) => {

    const URL = 'https://pokeapi.co/api/v2/pokemon';
    let allPokemons = [];

    try {
        let nextUrl = URL;

        while (nextUrl) {
            const { data } = await axios.get(nextUrl);

            const pokemons = data.results.map(pokemon => ({
                name: pokemon.name,
                info: pokemon.url,
            }));

            allPokemons = [...allPokemons, ...pokemons];
            nextUrl = data.next;
        }

        return res.status(200).json(allPokemons);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = getAllPokemons;